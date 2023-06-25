/*CONFIGURACIÓN DE CARRITO */
/*variables*/
const btnCarro = document.querySelector('.contenedor-carro-icon')
const contenedorCarroProducto = document.querySelector('.contenedor-carro-productos')

btnCarro.addEventListener('click', () => {
    contenedorCarroProducto.classList.toggle('hidden-cart')
})

const carroinfo = document.querySelector('.carro-producto')
const filaProducto = document.querySelector('.fila-producto')

/*lista de todos los componentes */
const listaProducto = document.querySelector('.contendedor-items')

/**variable de arreglos de productos */
let todosProductos =[]

const valorTotal = document.querySelector('.total-pagar')

const contarProductos = document.querySelector('#contador-productos')

const carroEmpty = document.querySelector('.carro-empty')
const carroTotal = document.querySelector('.carro-total')

listaProducto.addEventListener('click', e => {
    if(e.target.classList.contains('btn-agregar-carro')){
        const producto =e.target.parentElement

       const infoProducto = {
        cantidad: 1,
        titulo: producto.querySelector('h2').textContent,
        precio: producto.querySelector('p').textContent,
       }

       const existe= todosProductos.some(producto => producto.titulo == infoProducto.titulo)

       if(existe){
        const productos = todosProductos.map(producto => {
            if(producto.titulo == infoProducto.titulo){
                producto.cantidad++;
                return producto
            } else{
                return producto
            }
        })
        todosProductos= [...productos]
       }else{
        todosProductos = [...todosProductos, infoProducto]
       }

       showHTML();
    }
})

filaProducto.addEventListener('click', e => {
    if (e.target.classList.contains('icon-cerrar'))
    {
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('p').textContent;

        todosProductos = todosProductos.filter(
            producto => producto.titulo !== titulo
        );

        console.log(todosProductos)

        showHTML();
    }
})

//Función para mostrar en HTML
const showHTML = () => {
    if(!todosProductos.length){
        carroEmpty.classList.remove('hidden');
        filaProducto.classList.add('hidden');
        carroTotal.classList.add('hidden');
    }else{
        carroEmpty.classList.add('hidden');
        filaProducto.classList.remove('hidden');
        carroTotal.classList.remove('hidden');
    }

    //Limpiar todos los productos
    filaProducto.innerHTML = '';

    let total = 0;
    let totalDeProducto = 0;


    todosProductos.forEach(producto => {
        const contenedorProducto = document.createElement('div')
        contenedorProducto.classList.add('carro-producto')

        contenedorProducto.innerHTML = `
        <div class="info-carro-producto">
            <span class="cantidad-carro-productos">${producto.cantidad}</span>
            <p class="titulo-producto-carro">${producto.titulo}</p>
            <span class="precio-carro-producto">${producto.precio}</span>
        </div>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            class="icon-cerrar">

            <path 
                fill-rule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
        </svg>
        `

        filaProducto.append(contenedorProducto);
        total = total + parseInt(producto.cantidad * producto.precio.slice(1));
        totalDeProducto = totalDeProducto + producto.cantidad;
    })

    valorTotal.innerText = `$${total}`;
    contarProductos.innerText = totalDeProducto;
};


/*CONFIGURACIÓN DE TRANSBANK */
async function create(){
    console.log('FUNCIÓN DE PAGO');
    const ordenCompra = "123456789"
    const sessionId = "1233DSXXD"
    /* LEER MONTO A PAGAR */
    const monto = $("#txt-C").val();
    const urlRetornoPago = "http://localhost/paginaweb/comprobante.html"
    const url = "http://127.0.0.1:8900/api/v1/transbank/transaccion/crear";
    const method = 'POST';
    /* LLAMADO A API REST CREACIÓN TRANSACCIÓN TRANSBANK */
    console.log('CALL SERVICE: ', url);
    const resp = await fetch(url, {
        method: method,
        /* SE HABILITA VERIFICACIÓN DE SITIO CRUZADO */
        mode: "cors",
        /* DEFINICIÓN CABECERA */
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        /* DEFINICIÓN DEL CUERPO (PAYLOAD)*/
        body: JSON.stringify({
            buy_order: ordenCompra,
            session_id: sessionId,
            amount: monto,
            return_url: urlRetornoPago
        }),
    }).then((response) => {
        /* SECCIÓN PARA VERIFICAR LA RESPUESTA */
        if (response.ok) {
            console.log('RESPUESTA CORRECTA.');
            /* RETORNANDO JSON EN FORMATO TEXTO EN VARIABLE (data) QUE USA EL SIGUIENTE BLOQUE THEN*/
            return response.text();
        } else {
            console.log('ERROR EN LA RESPUESTA DE TRANSBANK');
            /* EN CASO DE ERROR SE PROPAGA Y ES CAPTURADO POR EL BLOQUE CATCH*/
            throw new Exception('ERROR EN LA RESPUESTA DE TRANSBANK');
        }
    }).then((data) => {
        /* SECCIÓN PARA LEER data.json */
        console.log('TRASFORMANDO de texto a JSON');
        const objJSON = JSON.parse(data);
        console.log('json: ', objJSON);
        const url = objJSON.url;
        const token = objJSON.token;
        console.log('url: ', url);
        console.log('token: ', token);
        /* CREAR FORMULARIO PARA ENVIAR DATOS POR POST A TRANSBANK */
        var form = document.createElement("form");
        form.method = "POST";
        form.action = url;
        form.hidden = true;
        /* CREANDO INPUT Y NOMBRE DE DATO A ENVIAR*/
        var element1 = document.createElement("input");
        element1.hidden = true;
        element1.value = token;
        element1.name = 'token_ws';
        form.appendChild(element1);
        /* AGREGANDO FORMULARIO AL HTML*/
        document.body.appendChild(form);
        /* ENVIANDO FORMULARIO A TRANSBANK */
        form.submit();
    }).catch((err) => {
        /* SECCIÓN PARA CAPTURAR ERRORES */
        console.log('ERROR: ', err.message);
    });
}