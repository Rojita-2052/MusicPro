

const registrarUsuario=()=>{
    var nombre = document.querySelector('#nombre').value;
    var apellido = document.querySelector('#apellido').value;
    var correo = document.querySelector('#correo').value;
    var telefono = document.querySelector('#telefono').value;
    var clave = document.querySelector('#clave').value;

    if(nombre.trim()=== '' ||
       apellido.trim()=== ''|| 
       correo.trim()===''|| 
       telefono.trim()===''|| 
       clave.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: '¡Completa todos los campos!',
            footer: 'CRUD CONTACTOS'
          })
    }
}