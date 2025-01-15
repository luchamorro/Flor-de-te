let productos = [];
let currentId = 0;

async function cargarDatos() {
  try {
    const respuesta = await fetch('productos.json');
    productos = await respuesta.json();

    const div = document.getElementById('catalogoProductos');

    const lista = document.createElement('ul');
    lista.setAttribute("class", "elementoProducto");

    productos.forEach(producto => {
          const item = document.createElement('li');
          item.innerHTML = `<img src="../${producto.img}" alt="${producto.nombre}" width="205" height="212" class="imagenCatalogo"><p class="tituloProducto">${producto.nombre}</p><p>${producto.precio}€ <button>carrito</button></p>`;
          
          lista.appendChild(item);

          item.addEventListener("click", () => {
            mostrarProducto(producto.id);
          });
    });

    div.appendChild(lista);

  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.getElementById('catalogoProductos').textContent = 'Error al cargar los datos.';
  }
}

// Función para mostrar el producto basado en el ID
function mostrarProducto(id) {
  const producto = productos.find(p => p.id === id);


    if (producto) {
      document.getElementById("paginaProducto").innerHTML = `<div class="productoTexto"><p class="tituloProductoGrande" id = "tituloProductoGrande"><button onclick="irPagina(${id})">${producto.nombre}</button></p><p class="descripcionProducto">${producto.descripcion}</p><p>${producto.precio}€ <button>carrito</button></p></div><div class="divImagenProducto"><img src="../${producto.img}" alt= "${producto.nombre}" width="350px" height ="362px" ></div>`;
      // Asegurar que la ventana está visible
      document.getElementById("ventanaSuperpuesta").style.display = "flex";
            
        }
}

function irPagina(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {


    // Guardar datos del producto en localStorage
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));

    // Redirigir a la nueva página
    window.location.href = 'pagina_producto.html';

    /*
    document.getElementById("paginaProductoAparte").innerHTML = `
      <div class="productoTexto">
        <p class="tituloProductoGrande" id="tituloProductoGrande">${producto.nombre}</p>
        <p class="descripcionProducto">${producto.descripcion}</p>
        <p>${producto.precio}€ <button>carrito</button></p>
      </div>
      <div class="divImagenProducto">
        <img src="../${producto.img}" alt="${producto.nombre}" width="350px" height="362px">
      </div>`;
    document.getElementById("paginaProductoAparte").style.display = "flex";*/
  }
}


function anterior() {
  const index = productos.findIndex(p => p.id === currentId);
  if (index > 0) {
    currentId = productos[index - 1].id;
  } else {
    // Si es el primer producto, mostrar el producto con el ID mayor
    const maxId = Math.max(...productos.map(p => p.id));
    currentId = maxId;
  }
  mostrarProducto(currentId);
}

function siguiente() {
  const nroProducto = productos.findIndex(p => p.id === currentId);
  if (nroProducto < productos.length - 1) {
    currentId = productos[nroProducto + 1].id;
  } else {
    // Si es el último producto, mostrar el producto con el ID menor
    const minId = Math.min(...productos.map(p => p.id));
    currentId = minId;
  }
  mostrarProducto(currentId);
}

// Llama a la función al cargar la página
cargarDatos();

function cerrar() {
  var x = document.getElementById("ventanaSuperpuesta");
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}