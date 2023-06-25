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
     //INSERTAR A LA BD
     const datos= new FormData();
     datos.append("email", email);
     datos.append("clave", clave);
  
     var respuesta= await fetch("php/usuario/loginUsuario.php",{
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
           document.querySelector('#form-inicio').reset();
           setTimeout(()=>{
             window.location.href="carrito.html";
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