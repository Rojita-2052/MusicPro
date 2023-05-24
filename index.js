const btnCarro = document.querySelector('.contenedor-iconos')
const contenedorCarroProducto = document.querySelector('.contenedor-carro-productos')

btnCarro.addEventListener('click', () => {
    contenedorCarroProducto.classList.toggle('hidden-cart')
})