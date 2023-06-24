# IMPORTACIÓN LIBRERIAS FLASK PARA GENERACIÓN DE API
from flask import Flask, request, jsonify
# IMPORTACIÓN DE LIBRERIA FLASK PARA DEFINIR 
# POLITICAS DE ACCESO Y COMPARTICIÓN DE RECURSO 
# REMOTOS AL SERVICIO
from flask_cors import CORS
# IMPORT MYSQL LIB CONNECTION
from flask_mysqldb import MySQL
import requests

app = Flask(__name__)
CORS(app)
# SE HABILITA ACCESO PARA API DESDE EL ORIGEN *
cors = CORS(app, resource={
    # RUTA O RUTAS HABILITADAS PARA EL ORIGEN *
    r"/api/v1/*":{
        "origins":"*"
    }
})
# CREANDO CONFIGURACIÓN PARA LA CONEXIÓN HACIA LA BASE DE DATOS.
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = 3307
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'musicpro'
mysql = MySQL(app)

productos = []

#MÉTODO PARA BUSCAR TODOS LOS PRODUCTOS QUE TENGA LA TABLA PRODUCTO
@app.route('/api/v1/producto', methods=['GET'])
def buscar_todos():
    #print('buscar_todos')
    cursor = None
    try:
        array = []
        # CREAR UNA CONEXIÓN A LA BASE DE DATOS
        cursor = mysql.connection.cursor()
        # EJECUTAR CONSULTA O TRANSACCIÓN
        cursor.execute("SELECT * FROM producto", ())
        # OBTENER TODAS LAS FILAS DE LA CONSULTA EJECUTADA
        rows = cursor.fetchall()
        # RECORRIENDO DATOS ENCONTRADOS POR FILA
        for row in rows:
            producto = {
                'id_producto' : row[0],
                'nombre': row[1],
                'descripcion' : row[2],
                'neto' : row[3]
            }
            array.append(producto)
        # CLOSE CURSOR
        cursor.close()
        return jsonify(array)
    except Exception as e:
        print(e)
        if cursor is not None: 
            # CLOSE CURSOR
            cursor.close()
        return (str(e), 500)
    
#MÉTODO PARA CREAR UN PRODUCTO
@app.route('/api/v1/producto', methods=['POST'])
def crear_producto():
    payload = request.get_json()
    print('payload: ', payload)
    cursor = None
    try:
        # CREAR UNA CONEXIÓN A LA BASE DE DATOS
        cursor = mysql.connection.cursor()
        # EJECUTAR CONSULTA O TRANSACCIÓN
        cursor.execute("INSERT INTO producto (nombre, descripcion, neto) VALUES( %s, %s, %s)", (payload['nombre'], payload['descripcion'], payload['neto']))
        id = cursor.lastrowid
        producto = {
            'id_producto': id,
            'nombre': payload['nombre'],
            'descripcion': payload['descripcion'],
            'neto': payload['neto'],
        }
        # COMMIT TRANSACTION
        mysql.connection.commit()
        # CLOSE CURSOR
        cursor.close()   
        return (jsonify(producto), 201)
    except Exception as e:
        print(e)
        if cursor is not None: 
            # CLOSE CURSOR
            cursor.close()
        return (str(e), 500)
    
#MÉTODO PARA BUSCAR UN PRODUCTO DE LA TABLA PRODUCTO POR SU ID
@app.route('/api/v1/producto/<int:id>', methods=['GET'])
def buscar_id(id):
    #print('find_by_id: ', id)
    try:
        # CREAR UNA CONEXIÓN A LA BASE DE DATOS
        cursor = mysql.connection.cursor()
        # EJECUTAR CONSULTA O TRANSACCIÓN
        cursor.execute("SELECT * FROM producto WHERE id_producto = %s", (id,))
        # OBTENER RESULTADO ÚNICO POR BUSQUEDA DE PK
        row = cursor.fetchone()
        print('row: ', row)
        # VERIFICACIÓN SI SE ENCONTRO INFORMACIÓN
        if row is not None:
            producto = {
                'id_producto' : row[0],
                'nombre': row[1],
                'descripcion' : row[2],
                'neto' : row[3]
            }
            return (jsonify(producto), 200)
        else:
            return ('', 404)
    except Exception as e:
        print(e)
        return (e, 500)
    
#MÉTODO PARA ACTUALIZAR UN PRODUCTO DE LA TABLA PRODUCTO
@app.route('/api/v1/producto', methods = ['PUT'])
def actualizar():
    payload = request.get_json()
    print('payload: ', payload)
    cursor = None
    try:
        # CREAR UNA CONEXIÓN A LA BASE DE DATOS
        cursor = mysql.connection.cursor()
        # EJECUTAR CONSULTA O TRANSACCIÓN
        cursor.execute("UPDATE producto SET nombre = %s, descripcion = %s, neto = %s WHERE id_producto = %s", (payload['nombre'], payload['descripcion'],payload['neto'], payload['id_producto']))
        producto = {
            'id_producto': payload['id_producto'],
            'nombre': payload['nombre'],
            'descripcion': payload['descripcion'],
            'neto': payload['neto'],
        }
        # COMMIT TRANSACTION
        mysql.connection.commit()
        # CLOSE CURSOR
        cursor.close()   
        return (jsonify(producto), 200)
    except Exception as e:
        print(e)
        if cursor is not None: 
            # CLOSE CURSOR
            cursor.close()
        return (str(e), 500)
    
#MÉTODO PARA ELIMINAR UN PRODUCTO DE LA TABLA PRODUCTO POR ID
@app.route('/api/v1/producto/<int:id>', methods = ['DELETE'])
def borrar_id(id):
    cursor = None
    try:
        # CREAR UNA CONEXIÓN A LA BASE DE DATOS
        cursor = mysql.connection.cursor()
        # EJECUTAR CONSULTA O TRANSACCIÓN
        cursor.execute("SELECT * FROM producto WHERE id_producto = %s", (id,))
        # OBTENER RESULTADO ÚNICO POR BUSQUEDA DE PK
        row = cursor.fetchone()
        print('row: ', row)
        # VERIFICACIÓN SI SE ENCONTRO INFORMACIÓN
        if row is not None:
            cursor.execute("DELETE FROM producto WHERE id_producto = %s", (id,))
            # COMMIT TRANSACTION
            mysql.connection.commit()
            # CLOSE CURSOR
            cursor.close() 
            return ('', 200)
        else:
            cursor.close()
            return ('', 404)
    except Exception as e:
        print(e)
        if cursor is not None:
            cursor.close() 
        return (e, 500)

#SE COMFIGURA LA API DE TRANSBANK PARA SER LLAMADA DESDE NUESTRA API
def header_request_transbank():    
    headers = {# DEFINICIÓN TIPO AUTORIZACIÓN Y AUTENTICACIÓN
               "Authorization" : "Token",
               # LLAVE QUE DEBE SER MODIFICADA PORQUE ES SOLO DEL AMBIENTE DE INTEGRACIÓN
               "Tbk-Api-Key-Id" : "597055555532",
               # LLAVE QUE DEBE SER MODIFICADA PORQUE ES SOLO DEL AMBIENTE DE INTEGRACIÓN               
               "Tbk-Api-Key-Secret" : "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
               # DEFINICION DE TIPO DE INFORMACIÓN ENVIADA
               "Content-Type" : "application/json",
               # DEFINICIÓN DE RECURSOS COMPARTIDOS ENTRE DISTINTOS SERVIDORES PARA CUALQUIER MÁQUINA
               "Acces-Control-Allow-Origin": "*",              
               "Referrer-policy": "origin-when-cross-origin"
                }
    return headers

@app.route('/api/v1/transbank/transaccion/crear', methods= ['POST'])
def transbank_create():
    data = request.json
    #  LECTURA DE PAYLOAD (BODY) CON INFORMACIÓN DE TIPO JSON
    print('data: ', data)    
    # DEFINICIÓN DE RUTA API REST TRANSBANK CREAR TRANSACCIÓN
    url = 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions'
    headers = header_request_transbank()
    response = requests.post(url, json=data, headers=headers)
    print('response: ', response.json())
    return response.json()    

@app.route('/api/v1/transbank/transaccion/commit/<string:tokenws>', methods= ['PUT'])
def transbank_commit(tokenws):
    print('tokenws: ', tokenws)
    # DEFINICIÓN DE RUTA API REST TRANSBANK CREAR TRANSACCIÓN
    url = 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/{token}'.format(token=tokenws)
    headers = header_request_transbank()
    response = requests.put(url, headers=headers)
    print('response: ', response.json())
    return response.json() 
    
# DESPLIEGUE SERVICIO PROPIO DE FLASK (SOLO PARA PRUEBAS). 
# EN DONDE AL DEFINI 0.0.0.0 SE 
# HABILITA EL USO DE LA IP LOCAL, IP DE RED, ETC. 
# PARA EL PUERTO 8900
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8900, debug=True)
