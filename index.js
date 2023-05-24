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

const contarProducto = document.querySelector('.#contador-producto')

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

/**Función para mostrar en HTML */
const showHTML = () => {

    /**Limpiar todos los productos */
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
    contarProducto.innerText = totalDeProducto;
};