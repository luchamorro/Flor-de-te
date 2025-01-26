
let productos = [];
let currentId = 0;


// Función principal para cargar los datos del archivo JSON
async function cargarDatos() {
  try {
    const respuesta = await fetch('productos.json');
    productos = await respuesta.json();

    const div = document.getElementById('contenedorProducto');
    div.innerHTML = ''; // Limpiar contenedor

    const lista = document.createElement('div');
    lista.setAttribute("class", "elementoProducto");
    div.appendChild(lista);

    // Mostrar todos los productos inicialmente
    mostrarProductos(productos);


  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.getElementById('catalogoProductos').textContent = 'Error al cargar los datos.';
  }
}

// Función para mostrar un producto basado en su ID
function mostrarProducto(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {
    document.getElementById("contenedorProducto").innerHTML = `
      <div class="productoTexto">
        <p class="tituloProductoGrande" id="tituloProductoGrande">
          <button id="verPaginaProducto" class = "verPaginaProducto">${producto.nombre}</button>
        </p>
        <p class="descripcionProducto">${producto.descripcion}</p>
        <p>${producto.precio}€ <button id="botonCarritoProducto">carrito</button></p>
      </div>
      <div class="divImagenProducto">
        <img src="../${producto.img}" alt="${producto.nombre}" width="350px" height="362px">
      </div>
    `;
    currentId = id; // Actualizar ID actual

}
}



// Función para mostrar el producto anterior
function anterior() {
  const index = productos.findIndex(p => p.id === currentId);
  if (index > 0) {
    currentId = productos[index - 1].id;
  } else {
    currentId = Math.max(...productos.map(p => p.id)); // Ir al último producto
  }
  mostrarProducto(currentId);
}

// Función para mostrar el siguiente producto
function siguiente() {
  const index = productos.findIndex(p => p.id === currentId);
  if (index < productos.length - 1) {
    currentId = productos[index + 1].id;
  } else {
    currentId = Math.min(...productos.map(p => p.id)); // Ir al primer producto
  }
  mostrarProducto(currentId);
}

// Asignar eventos a los botones principales
document.getElementById('siguienteBtn').addEventListener('click', siguiente);
document.getElementById('anteriorBtn').addEventListener('click', anterior);

// Cargar los datos al cargar la página
cargarDatos();
