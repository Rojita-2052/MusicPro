function navbar(){

    //  OBTENER NOMBRE DEL ARCHIVO HTML DONDE FUE INVOCADA LA CARGA DEL
    //  NAVBAR (BARRA DE NAVEGACIÓN O MENÚ)
    const htmlName = window.location.pathname;
    let activeCarrito = "";

    console.log('PÁGINA SELECCIONADA: ', htmlName);

    /*  VALIDACIÓN PARA MODIFICAR CSS EN EL MENÚ DEJANDO ACTIVO LA PÁGINA ACTUAL*/
    if(htmlName.includes("carrito.html")){
        activeCarrito = " activate text-white";
    }

    /*  INTERPOLACIÓN QUE PERMITE REEMPLAZAR EN EL TEXTO LAS VARIABLES  activeCatalogov1, activeCatalogov2
        CON LOS VALORES DEFINIDOS ANTERIORMENTE. 

        https://www.freecodecamp.org/espanol/news/como-utilizar-la-interpolacion-de-cadenas-en-javascript/

    */
    const nav = `
        <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="30" height="24">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link${activeCarrito}" href="carrito.html">HOME</a>
                </li>
            </ul>
        </div>
        </div>
    </nav>
    `;
    var path = window.location.pathname;
    console.log('OBTENER DIV CON id = navbar');
    const navHTML = document.getElementById("navbar");
    console.log('RENDERIZANDO O REESCRIBIENDO DIV CON id = navbar AGREGANDO LA INFORMACIÓN DE LA VARIABLE navHTML');
    /* SE REESCRIBE ESTRUCTURA DIV CON INNERHTML

        https://developer.mozilla.org/es/docs/Web/API/Element/innerHTML
    */
    navHTML.innerHTML = nav;

}

navbar();