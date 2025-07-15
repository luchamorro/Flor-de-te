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
      <p>${producto.precio}€ <button class="botonCarrito" onclick="anadirCompra(${producto.id})"><i>Comprar </i><i class="fa-solid fa-cart-shopping"></i></button></p>
    `;

    // Añadir eventos a la imagen y título
    const imagen = item.querySelector('.imagenCatalogo');
    imagen.addEventListener("click", () => mostrarProducto(producto.id));
    const titulo = item.querySelector('.tituloProducto');
    titulo.addEventListener("click", () => mostrarProducto(producto.id));

    lista.appendChild(item);
  });
}

// Función para aplicar el idioma estático
function applyLanguage(lang) {
  if (lang === "es") {
    // Si es español, no hacemos traducción porque ya está en el HTML
    document.querySelectorAll("[data-translate]").forEach((el) => {
      el.textContent = el.getAttribute("data-original") || el.textContent; // Restaurar texto original si existe
    });
    return;
  }

  // Cargar las traducciones desde el archivo JSON
  fetch("catalogo.json")
    .then((response) => response.json())
    .then((translations) => {
      document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        const translation = translations[lang]?.[key];
        if (translation) {
          if (!el.getAttribute("data-original")) {
            el.setAttribute("data-original", el.textContent); // Guardar el texto original para restaurarlo si se vuelve a "es"
          }
          if (el.tagName === "INPUT" && el.type === "checkbox") {
            const label = document.querySelector(`label[for="${el.id}"]`);
            if (label) label.textContent = translation;
          } else if (el.hasAttribute("placeholder")) {
            el.setAttribute("placeholder", translation);
          } else {
            el.textContent = translation;
          }
        }
      });
    })
    .catch((error) => console.error("Error al cargar las traducciones:", error));
}

// Función principal para cargar los datos del archivo JSON
async function cargarDatos(idiomaSeleccionado) {
  try {
    const idiomaSeleccionado = localStorage.getItem("selectedLanguage") || "es"; // Obtener el idioma seleccionado
    // Cargar el archivo JSON correspondiente al idioma seleccionado
    const respuesta = await fetch(idiomaSeleccionado === "en" ? 'productos_en.json' : 'productos_es.json');
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
          <button class="btnMasMenos" onclick="botonMenos(${producto.id})">-</button>
          <p class="num" id="contador"></p>
          <button class="btnMasMenos" onclick="botonMas(${producto.id})">+</button>
          <br>
      </div>
      <br>
        <button onclick="anadirCompra(${producto.id})" id="botonCarrito"><i>Comprar</i></button>
        <p class="descripcionProducto">${producto.descripcion}</p>
        <p class="listaPropiedades">
        <p>${producto.filtros}</p>
        </p>
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
    window.location.href = '../inicio/pagina_producto.html';
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
document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language-select");

  // Comprobar si hay un idioma guardado en localStorage
  const savedLanguage = localStorage.getItem("selectedLanguage") || "es"; // Por defecto "es"
  languageSelect.value = savedLanguage; // Seleccionar el idioma guardado en el dropdown
  applyLanguage(savedLanguage); // Aplicar el idioma guardado
  cargarDatos(savedLanguage); // Cargar los datos del catálogo en el idioma guardado

  // Cambiar el idioma al seleccionar una opción del dropdown
  languageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("selectedLanguage", selectedLanguage); // Guardar el idioma seleccionado
    applyLanguage(selectedLanguage); // Aplicar el idioma sin recargar la página
    cargarDatos(selectedLanguage); // Recargar los productos en el idioma seleccionado
  });
});

// Función para agregar al carrito
let compra = document.querySelectorAll('#carrito li');
let listaCompra = Array.from(compra);
let carritoIcon = document.querySelector('.right-section .cart');

 carritoIcon.setAttribute('data-content', listaCompra.length);
 
 //funcion para añadir cosas al carrito
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
   //añade el producto al array
   listaCompra.push(producto);

   let anadirProducto = document.createElement("li");
   let nombre = document.createElement("p");
   let pic = document.createElement('img');
   let precio = document.createElement('p');
   let borrar = document.createElement('span');

   let divi = document.createElement('div');
   let suma = document.createElement('button');
   let resta = document.createElement('button');
   let monto = document.createElement('p');

   precio.setAttribute('class', 'precio');
   monto.setAttribute('id', `monto${producto.id}`);
   monto.setAttribute('class', 'monto');
   borrar.setAttribute('class', 'borrar');

   monto.innerText = 'x1';
   divi.classList.add('masMenos');

   suma.innerText = '+';
   suma.classList.add('suma');
   suma.setAttribute('onclick', `botonMas(${producto.id})`)

   resta.innerText = '-';
   resta.classList.add('resta')
   resta.setAttribute('onclick', `botonMenos(${producto.id})`)

   anadirProducto.setAttribute('id', `${producto.id}`)

   nombre.setAttribute('class', 'tituloProducto');
   nombre.innerHTML = `${producto.nombre}`;

   pic.setAttribute("src", `../${producto.img}`);
   pic.setAttribute("alt", `${producto.nombre}`);
   
   precio.innerHTML = `${producto.precio}€`;

   borrar.innerHTML = `&#128465;`

   document.getElementById('carrito').appendChild(anadirProducto);
   anadirProducto.appendChild(nombre);
   anadirProducto.appendChild(pic);
   anadirProducto.appendChild(divi);
   divi.appendChild(suma);
   divi.appendChild(monto);
   divi.appendChild(resta);
   anadirProducto.appendChild(precio);
   anadirProducto.appendChild(borrar);

  const porAhora = document.getElementById('porAhora');
  porAhora.style.display = "none";


   carritoIcon.setAttribute('data-content', listaCompra.length);

   // borrar un producto de la cesta
   borrar.addEventListener('click', function(id) {
    listaCompra = listaCompra.filter(item => item.id !== producto.id);
    anadirProducto.remove();
    carritoIcon.setAttribute('data-content', listaCompra.length);
   });
   
   currentId = id; // Actualizar el ID actual
 }
}

// botones de añadir y reducir

function botonMas(id){
  const producto = productos.find(p => p.id == id);
  let contador = document.getElementById('contador');

  anadirCompra(id)
 
  //Añadir producto al array
  if(producto){
  listaCompra.push(producto);
  }
    // Actualizar contador carrito
  let cantidad = listaCompra.length;
  carritoIcon.setAttribute('data-content', listaCompra.length);
 
  //Cambiar el numero del monto
  let monto = document.getElementById(`monto${producto.id}`);
  monto.setAttribute('class', 'monto');
  let aumento = listaCompra.filter(item => item.id === producto.id).length;
  monto.innerText = 'x' + aumento;
  contador.innerText = 'x' + aumento;

 };
 
 //
 function botonMenos(id){
  const producto = productos.find(p => p.id == id);
 
  //Añadir producto al array
  if(producto){
  listaCompra.pop(producto);
  }
 
    // Actualizar contador carrito
  carritoIcon.setAttribute('data-content', listaCompra.length);
 
  //Cambiar el numero del monto
  let monto = document.getElementById(`monto${producto.id}`)
  let reduce = listaCompra.filter(item => item.id === producto.id).length;  
  monto.setAttribute('class', 'monto');
  monto.innerText = 'x' + reduce;
  contador.innerText = 'x' + reduce;

 };

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
    const idiomaSeleccionado = localStorage.getItem("selectedLanguage") || "es"; 
    const respuesta = await fetch(idiomaSeleccionado === "en" ? 'productos_en.json' : 'productos_es.json');
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

// Redirigir a la página del carrito
function checkOut() {
  const carritoList = document.getElementById('carrito');

  if (carritoList) {
    localStorage.setItem('carritoLleno', carritoList.innerHTML);
    // Redirigir a otra página
    window.location.href = '../carrito/carrito.html';
  }
};