let productos = [];
let currentId = 0;

// Función para mostrar productos en el catálogo
function mostrarProductos(datos) {
  const catalogo = document.getElementById('catalogoProductos');
  catalogo.innerHTML = ''; // Limpiar el catálogo antes de mostrar

  const lista = document.createElement('ul');
  lista.setAttribute('class', 'listaProductos'); // Clase para estilizar

  datos.forEach(producto => {
    const item = document.createElement('li');
    item.classList.add('productoItem'); // Clase para cada producto
    item.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}" class="imagenCatalogo" width="205" height="212">
      <p class="tituloProducto">${producto.nombre}</p>
      <p class="precioProducto">${producto.precio}€</p>
      <button class="botonCarrito" onclick="anadirCompra(${producto.id})"><i>Comprar --></i><i class="fa-solid fa-cart-shopping"></i></button>
    `;

    // Añadir evento de clic a la imagen
    const imagen = item.querySelector('.imagenCatalogo');
    imagen.addEventListener('click', () => mostrarPopUp(producto));

    lista.appendChild(item);
  });

  catalogo.appendChild(lista);
}

// Función para mostrar el pop-up con la información del producto
function mostrarPopUp(producto) {
  const popUp = document.getElementById('ventanaSuperpuesta');
  const contenidoProducto = document.getElementById('paginaProducto');

  contenidoProducto.innerHTML = `
    <div class="divImagenProducto">
          <img src="../${producto.img}" alt="${producto.nombre}" width="350px" height="362px">
        </div>
        <div class="productoTexto">
          <p class="tituloProductoGrande" id="tituloProductoGrande">
            <button id="verPaginaProducto" class = "verPaginaProducto">${producto.nombre}</button>
          </p>
          <p class="precioDisplay">${producto.precio}€</p> 
          <p>100 gramos</p>
          <div class="contador">
            <button onclick="botonMenos()">-</button>
            <p class="num" id="contador"></p>
            <button onclick="botonMas()">+</button>
            <br>
        </div>
        <br>
          <button onclick="anadirCompra(${producto.id})" id="botonCarrito"><i>Comprar</i></button>
          <p class="descripcionProducto">${producto.descripcion}</p>
          <ul class="listaPropiedades">
          <li>${producto.filtros}</li>
          </ul>
        </div>
  `;

  popUp.style.display = 'flex'; // Mostrar el pop-up
  currentId = producto.id; // Guardar el ID del producto actual para navegar

  // Asignar eventos para los botones de navegación
  document.getElementById('anteriorBtn').addEventListener('click', mostrarAnterior);
  document.getElementById('siguienteBtn').addEventListener('click', mostrarSiguiente);
  document.getElementById('cerrarBtn').addEventListener('click', cerrarPopUp);
}

// Función para cerrar el pop-up
function cerrarPopUp() {
  document.getElementById('ventanaSuperpuesta').style.display = 'none'; // Ocultar el pop-up
}

// Función para mostrar el producto anterior
function mostrarAnterior() {
  const index = productos.findIndex(p => p.id === currentId);
  if (index > 0) {
    currentId = productos[index - 1].id;
  } else {
    currentId = Math.max(...productos.map(p => p.id)); // Ir al último producto
  }
  mostrarPopUp(productos.find(p => p.id === currentId));
}

// Función para mostrar el siguiente producto
function mostrarSiguiente() {
  const index = productos.findIndex(p => p.id === currentId);
  if (index < productos.length - 1) {
    currentId = productos[index + 1].id;
  } else {
    currentId = Math.min(...productos.map(p => p.id)); // Ir al primer producto
  }
  mostrarPopUp(productos.find(p => p.id === currentId));
}

// Función principal para cargar los datos del JSON
async function cargarDatos() {
  try {
    const respuesta = await fetch('bestsellers.json'); // Ruta del archivo JSON
    if (!respuesta.ok) throw new Error('Error al cargar el archivo JSON');
    productos = await respuesta.json();

    // Mostrar los productos cargados
    mostrarProductos(productos);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('catalogoProductos').innerHTML = `<p>Error al cargar los productos. Inténtalo más tarde.</p>`;
  }
}

// Cargar los datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarDatos);
