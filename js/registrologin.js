const registrarUsuario= async()=>{
    var nombre = document.querySelector('#nombre').value;
    var apellido = document.querySelector('#apellido').value;
    var email = document.querySelector('#email').value;
    var telefono = document.querySelector('#telefono').value;
    var clave = document.querySelector('#clave').value;

    if(nombre.trim()=== '' ||
       apellido.trim()=== ''|| 
       email.trim()===''|| 
       telefono.trim()===''|| 
       clave.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: '¡Completa todos los campos!',
            footer: 'MusicPRO CONTACTOS'
          })
        return;
    }

    if(!validarNombre(nombre)){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: '¡Registra un nombre válido!',
            footer: 'MusicPRO CONTACTOS'
          })
        return;
    }
    if(!validarApellido(apellido)){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: '¡Registra un apellido válido!',
            footer: 'MusicPRO CONTACTOS'
          })
        return;
    }
    if(!validarEmail(email)){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: '¡Registra un correo válido!',
            footer: 'MusicPRO CONTACTOS'
          })
        return;
    }
    if(!validartelefono(telefono)){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: '¡Registra un número celular válido!',
            footer: 'MusicPRO CONTACTOS'
          })
        return;
    }

    //INSERTAR A LA BD
    const datos= new FormData();
    datos.append("nombre", nombre);
    datos.append("apellido", apellido);
    datos.append("email", email);
    datos.append("telefono", telefono);
    datos.append("clave", clave);

    var respuesta= await fetch("php/usuario/registrarUsuario.php",{
        method: 'POST', 
        body: datos
    })

    var resultado = await respuesta.json();

    if(resultado.success == true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: resultado.mensaje,
            footer: 'MusicPRO CONTACTOS'
          }) 
          //borra el formulario
          document.querySelector('#form-registro').reset();
          setTimeout(()=>{
            window.location.href="inicio.html";
          },2000);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'MusicPRO CONTACTOS'
          })
    }
}

//login
const loginUsuario = async()=>{
  var email = document.querySelector('#email').value;
  var clave = document.querySelector('#clave').value;

  if(email.trim()===''||
     clave.trim()===''){
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: '¡Completa todos los campos!',
          footer: 'MusicPRO CONTACTOS'
        })
      return;
  }
  if(!validarEmail(email)){
      Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: '¡Registra un correo válido!',
          footer: 'MusicPRO CONTACTOS'
        })
      return;
  }
}