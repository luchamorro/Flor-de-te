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
      <p>${producto.precio}€ <button class="botonCarrito" onclick="location.href='../catalogo/catalogo.html'"><i>Comprar </i><i class="fa-solid fa-cart-shopping"></i></button></p>
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
    const idiomaSeleccionado = localStorage.getItem("selectedLanguage") || "es"; // Obtener el idioma seleccionado
    // Cargar el archivo JSON correspondiente al idioma seleccionado
    const respuesta = await fetch(idiomaSeleccionado === "en" ? 'productos2_en.json' : 'productos2_es.json');
    productos = await respuesta.json();

    const div = document.getElementById('catalogoProductosMini');
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
    const borrarFiltrosBtn = document.getElementById('borrarFiltrosMini');
    borrarFiltrosBtn.addEventListener('click', () => {
      // Restablecer checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);

      // Limpiar la lista y mostrar todos los productos
      lista.innerHTML = '';
      mostrarProductos(productos, lista);
    });

  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.getElementById('catalogoProductosMini').textContent = 'Error al cargar los datos.';
  }
}

// Función para cambiar el idioma
function cambiarIdioma(event) {
  const idiomaSeleccionado = event.target.value;
  localStorage.setItem("selectedLanguage", idiomaSeleccionado); // Guardar idioma en localStorage
  cargarDatos(); // Recargar los datos en el nuevo idioma
}

// Función para redirigir a la página del producto
function irPagina(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    window.location.href = 'pagina_producto.html';
  }
}

// Función para mostrar un producto basado en su ID
function mostrarProducto(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {
    document.getElementById("paginaProducto").innerHTML = `
                <div class="divImagenProducto">
          <img src="../${producto.img}" alt="${producto.nombre}" width="350px" height="362px">
        </div>
        <div class="productoTexto">
          <p class="tituloProductoGrande" id="tituloProductoGrande">
            <button id="verPaginaProducto" class = "verPaginaProducto">${producto.nombre}</button>
          </p>
          <p class="precioDisplay">${producto.precio}€</p> 
          <p>100 gramos</p>
        <br>
          <button onclick="location.href='../catalogo/catalogo.html'" id="botonCarrito"><i>Ver más</i></button>
          <p class="descripcionProducto">${producto.descripcion}</p>
          <ul class="listaPropiedades">
          <li>${producto.filtros}</li>
          </ul>
        </div>
    `;
    document.getElementById("ventanaSuperpuesta").style.display = "flex"; // Mostrar ventana
    currentId = id; // Actualizar ID actual

    // Eventos para botones en la ventana emergente
    document.getElementById('verPaginaProducto').addEventListener('click', () => irPagina(id));
  }
}

// Asignar eventos para cambiar el idioma
document.getElementById('language-select').addEventListener('change', cambiarIdioma);

// Cargar los datos al cargar la página
cargarDatos();


/*
// Función para redirigir a la página del producto
function irPagina(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    window.location.href = 'pagina_producto.html';
  }
}

*/


// Buscador

const buscador = document.getElementById('buscador');
const menuBuscador = document.createElement('div');
menuBuscador.classList.add('menuBuscador');
document.querySelector('.right-section').appendChild(menuBuscador);

// Variable para almacenar todos los productos
let catalogoCompleto = [];

// Cargar el catálogo completo
async function cargarCatalogoCompleto() {
  try {
    const respuesta = await fetch('../catalogo/productos.json');
    catalogoCompleto = await respuesta.json();
  } catch (error) {
    console.error('Error al cargar el catálogo:', error);
  }
}

// Cargar el catálogo al iniciar
cargarCatalogoCompleto();


// Evento de búsqueda
buscador.addEventListener('input', function(item) {
   const busca = item.target.value.toLowerCase().trim();
   
   if (busca.length < 2) {
       menuBuscador.style.display = 'none';
       return;
   }

   // Filtrar productos
   const filtro = catalogoCompleto.filter(producto => 
    producto.nombre.toLowerCase().includes(busca));

   // Mostrar resultados
   if (filtro.length) {
       menuBuscador.style.display = 'block';
       menuBuscador.innerHTML = filtro.map(producto => `
           <div class="productoBuscado" onclick="anadirCompra(${producto.id})" id='${producto.id}' style="
               display: flex;
               align-items: center;
               padding: 0.5rem;
               border-bottom: 1px solid #eee;
               cursor: pointer;
           ">
               <img src="../${producto.img}" alt="${producto.nombre}" style="
                   width: 50px;
                   height: 50px;
                   object-fit: cover;
                   margin-right: 1rem;
               ">
               <div>
                   <div style="font-weight: bold;">${producto.nombre}</div>
                   <div>${producto.precio}€</div>
               </div>
           </div>
       `).join('');
   } else {
       menuBuscador.innerHTML = '<div style="padding: 1rem;">No se encontraron resultados</div>';
   };
});

// Cerrar resultados al hacer click fuera
document.addEventListener('click', (e) => {
   if (!menuBuscador.contains(e.target) && e.target !== buscador) {
       menuBuscador.style.display = 'none';
   }
});