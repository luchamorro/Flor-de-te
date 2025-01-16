let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
}

// Cambiar de slide automáticamente cada 5 segundos
setInterval(() => {
  goToSlide(currentSlide + 1);
}, 5000); // 5000 milisegundos = 5 segundos

// Función para obtener los valores seleccionados de un grupo de checkboxes
function getCheckedValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(checkbox => checkbox.value.toLowerCase());
}

// Función para cargar los productos
async function cargarDatos() {    
  try {
    // Obtener los datos del archivo JSON
    const respuesta = await fetch('productos.json');
    const datos = await respuesta.json();
    
    // Seleccionar el contenedor donde se mostrarán los productos
    const div = document.getElementById('catalogoProductos');
    
    // Crear la lista para mostrar los productos
    const lista = document.createElement('ul');
    lista.setAttribute("class", "elementoProducto");

    // Mostrar todos los productos inicialmente
    mostrarProductos(datos, lista);

    // Escuchar el evento de aplicar filtros
    const filtrosForm = document.getElementById('filtrosForm');
    filtrosForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const categoriasSeleccionadas = getCheckedValues('categoria');
      const propiedadesSeleccionadas = getCheckedValues('propiedades');
      
      // Filtrar productos según las selecciones
      const productosFiltrados = datos.filter(producto => {
        const categoriasProducto = producto.filtros.filter(filtro => categoriasSeleccionadas.includes(filtro.toLowerCase()));
        const propiedadesProducto = producto.filtros.filter(filtro => propiedadesSeleccionadas.includes(filtro.toLowerCase()));
        return categoriasProducto.length > 0 || propiedadesProducto.length > 0;
      });

      // Limpiar la lista y mostrar los productos filtrados
      lista.innerHTML = '';  // Limpiar lista
      mostrarProductos(productosFiltrados, lista);
    });

    // Agregar funcionalidad para el botón de borrar filtros
    const borrarFiltrosBtn = document.getElementById('borrarFiltros');
    borrarFiltrosBtn.addEventListener('click', () => {
      // Restablecer los checkboxes
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => checkbox.checked = false);

      // Limpiar la lista y mostrar todos los productos
      lista.innerHTML = '';
      mostrarProductos(datos, lista);
    });

  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.getElementById('catalogoProductos').textContent = 'Error al cargar los datos.';
  }
}

// Función para mostrar los productos
function mostrarProductos(productos, lista) {
  productos.forEach(producto => {
    const item = document.createElement('li');
    item.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}" width="205" height="212" class="imagenCatalogo">
      <p class="tituloProducto">${producto.nombre}</p>
      <p>${producto.precio}€ <button><i class="fa-solid fa-cart-shopping"></i></button></p>`;
    lista.appendChild(item);
  });

  // Insertar la lista en el contenedor
  const div = document.getElementById('catalogoProductos');
  div.innerHTML = '';  // Limpiar contenido previo
  div.appendChild(lista);
}

// Llamar a la función para cargar los datos al cargar la página
cargarDatos();
