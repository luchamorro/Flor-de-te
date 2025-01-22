let productos = [];
let currentId = 0;

// Función para obtener los valores seleccionados de un grupo de checkboxes
function getCheckedValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(checkbox => checkbox.value.toLowerCase());
}

// Función para mostrar productos en la lista
function mostrarProductos(datos, lista) {
  datos.forEach(producto => {
    const item = document.createElement('li');
    item.innerHTML = `
      <img src="../${producto.img}" alt="${producto.nombre}" width="205" height="212" class="imagenCatalogo">
      <p class="tituloProducto">${producto.nombre}</p>
      <p>${producto.precio}€ <button class="botonCarrito" onclick = "anadirCompra(${producto.id}"><i>Comprar --></i><i class="fa-solid fa-cart-shopping"></i></button></p>
    `;

    // Añadir eventos a la imagen y título
    const imagen = item.querySelector('.imagenCatalogo');
    imagen.addEventListener("click", () => mostrarProducto(producto.id));
    const titulo = item.querySelector('.tituloProducto');
    titulo.addEventListener("click", () => mostrarProducto(producto.id));

    lista.appendChild(item);
  });
}

// Función principal para cargar los datos del archivo JSON
async function cargarDatos() {
  try {
    const respuesta = await fetch('productos.json');
    productos = await respuesta.json();

    const div = document.getElementById('catalogoProductos');
    div.innerHTML = ''; // Limpiar contenedor

    const lista = document.createElement('ul');
    lista.setAttribute("class", "elementoProducto");
    div.appendChild(lista);

    // Mostrar todos los productos inicialmente
    mostrarProductos(productos, lista);

    // Manejar el evento del formulario de filtros
    const filtrosForm = document.getElementById('filtrosForm');
    filtrosForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const categoriasSeleccionadas = getCheckedValues('categoria');
      const propiedadesSeleccionadas = getCheckedValues('propiedades');

      // Filtrar productos según las selecciones
      const productosFiltrados = productos.filter(producto => {
        const categoriasProducto = producto.filtros.filter(filtro => categoriasSeleccionadas.includes(filtro.toLowerCase()));
        const propiedadesProducto = producto.filtros.filter(filtro => propiedadesSeleccionadas.includes(filtro.toLowerCase()));
        return categoriasProducto.length > 0 || propiedadesProducto.length > 0;
      });

      // Limpiar la lista y mostrar productos filtrados
      lista.innerHTML = '';
      mostrarProductos(productosFiltrados, lista);
    });

    // Botón para borrar filtros
    const borrarFiltrosBtn = document.getElementById('borrarFiltros');
    borrarFiltrosBtn.addEventListener('click', () => {
      // Restablecer checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);

      // Limpiar la lista y mostrar todos los productos
      lista.innerHTML = '';
      mostrarProductos(productos, lista);
    });

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
          <button id="verPaginaProducto" class = "verPaginaProducto">${producto.nombre}</button>
        </p>
        <p class="descripcionProducto">${producto.descripcion}</p>
        <p>${producto.precio}€ <button onclick="anadirCompra(${producto.id})" id="botonCarrito" onclick="anadirCompra(${producto.id}"><i>Comprar</i></button></p>
      </div>
      <div class="divImagenProducto">
        <img src="../${producto.img}" alt="${producto.nombre}" width="350px" height="362px">
      </div>
    `;
    document.getElementById("ventanaSuperpuesta").style.display = "flex"; // Mostrar ventana
    currentId = id; // Actualizar ID actual

    // Eventos para botones en la ventana emergente
    document.getElementById('verPaginaProducto').addEventListener('click', () => irPagina(id));
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

// Asignar eventos a los botones principales
document.getElementById('siguienteBtn').addEventListener('click', siguiente);
document.getElementById('anteriorBtn').addEventListener('click', anterior);
document.getElementById('cerrarBtn').addEventListener('click', cerrar);

// Cargar los datos al cargar la página
cargarDatos();

function anadirCompra(id) {
  const producto = productos.find(p => p.id == id);
  // Comprueba si el producto está en el carrito
  const carritoList = document.getElementById('carrito');
  const comprobacion = carritoList.querySelectorAll('.tituloProducto');

  for (let item of comprobacion) {
    if (item.textContent === producto.nombre) {
      return; // Termina si el producto existe
    }
  }

  if (producto) {
    let anadirProducto = document.createElement("li");
    let nombre = document.createElement("p");
    let pic = document.createElement('img');
    let precio = document.createElement('p');
    let borrar = document.createElement('span');

    nombre.setAttribute('class', 'tituloProducto');
    nombre.innerHTML = `${productoEncontrado.nombre}`;

    pic.setAttribute("src", `../${productoEncontrado.img}`);
    pic.setAttribute("alt", `${productoEncontrado.nombre}`);
    
    precio.innerHTML = `${productoEncontrado.precio}€`;

    borrar.innerHTML = `&#128465;`

    document.getElementById('carrito').appendChild(anadirProducto);
    anadirProducto.appendChild(nombre);
    anadirProducto.appendChild(pic);
    anadirProducto.appendChild(precio);
    anadirProducto.appendChild(borrar);

    // borrar un producto de la cessta
    borrar.addEventListener('click', function() {
      anadirProducto.remove();
    });

    currentId = id; // Actualizar el ID actual
  }
}