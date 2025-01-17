let productos = [];
let currentId = 0;

// Función para cargar los datos del archivo JSON y mostrar el catálogo
async function cargarDatos() {
  try {
    const respuesta = await fetch('productos.json');
    productos = await respuesta.json();

    const div = document.getElementById('catalogoProductos');
    div.innerHTML = ''; // Asegurarse de limpiar el contenedor

    const lista = document.createElement('ul');
    lista.setAttribute("class", "elementoProducto");

    productos.forEach(producto => {
      const item = document.createElement('li');
      item.innerHTML = `
        <img src="../${producto.img}" alt="${producto.nombre}" width="205" height="212" class="imagenCatalogo">
        <p class="tituloProducto">${producto.nombre}</p>
        <p>${producto.precio}€ <button class ="botonCarrito" onclick = "carri"><i>Comprar --></i><i class="fa-solid fa-cart-shopping"></i></button></p>
      `;

      lista.appendChild(item);

  // Seleccionar solo la imagen dentro del 'li'
  const imagen = item.querySelector('.imagenCatalogo');
  imagen.addEventListener("click", () => {
    mostrarProducto(producto.id);
  });

  const titulo = item.querySelector('.tituloProducto');
  titulo.addEventListener("click", () => {
    mostrarProducto(producto.id);
  });

  
    });

    div.appendChild(lista);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.getElementById('catalogoProductos').textContent = 'Error al cargar los datos.';
  }
}

// Función para mostrar un producto basado en su ID
function mostrarProducto(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {
    document.getElementById("paginaProducto").innerHTML = `
      <div class="productoTexto">
        <p class="tituloProductoGrande" id="tituloProductoGrande">
          <button onclick="irPagina(${id})">${producto.nombre}</button>
        </p>
        <p class="descripcionProducto">${producto.descripcion}</p>
        <p>${producto.precio}€ <button>carrito</button></p>
      </div>
      <div class="divImagenProducto">
        <img src="../${producto.img}" alt="${producto.nombre}" width="350px" height="362px">
      </div>
    `;
    document.getElementById("ventanaSuperpuesta").style.display = "flex"; // Mostrar la ventana superpuesta
    currentId = id; // Actualizar el ID actual
  }
}

// Función para redirigir a la página del producto
function irPagina(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    window.location.href = 'pagina_producto.html';
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

// Función para cerrar la ventana superpuesta
function cerrar() {
  document.getElementById("ventanaSuperpuesta").style.display = "none";
}

// Cargar los datos al cargar la página
cargarDatos();