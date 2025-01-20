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
    lista.setAttribute('id', 'ulProductos') // Agregar id por Alejandro

    productos.forEach(producto => {
      const item = document.createElement('li');
      item.innerHTML = `
        <img src="../${producto.img}" alt="${producto.nombre}" width="205" height="212" class="imagenCatalogo">
        <p class="tituloProducto">${producto.nombre}</p>
        <p>${producto.precio}€ <button>carrito</button></p>
      `;

      lista.appendChild(item);

      // Agregar evento para mostrar el producto en la ventana superpuesta
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
        <p>${producto.precio}€ <button onclick="anadirCompra(${producto.id})">carrito</button></p>
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
function irPagina(id) {mostrarProducto
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
    nombre.innerHTML = `${producto.nombre}`;

    pic.setAttribute("src", `../${producto.img}`);
    pic.setAttribute("alt", `${producto.nombre}`);
    
    precio.innerHTML = `${producto.precio}€`;

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

//buscador de productos
const buscador = document.getElementById('buscador');
        const divsColoreados = document.querySelectorAll('main div div');
        let compra = document.querySelectorAll('div button')

        buscador.addEventListener('input', function() {
            const valorBuscado = buscador.value.toLowerCase();

            divsColoreados.forEach(div => {
                const atributo = div.innerHTML.toLowerCase();
                if (atributo.includes(valorBuscado)) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            });
        });