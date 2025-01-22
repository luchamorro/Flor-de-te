// Llamar a la función al cargar la página
pintarTablaProductos();

// Función para pintar las filas de la tabla
async function pintarTablaProductos() {
  // Obtener los datos de productos desde el archivo JSON
  const respuesta = await fetch("/productos.json");
  const productos = await respuesta.json();

  // Obtener el cuerpo de la tabla donde se agregarán las filas
  const tbody = document.getElementById("tablaProductos");

  // Limpiar cualquier fila existente (por si se recarga o se vuelve a pintar la tabla)
  tbody.innerHTML = "";

  // Recorrer el array de productos y agregar una fila para cada uno
  productos.forEach((producto) => {
    // Crear una nueva fila
    const fila = document.createElement("tr");

    // Agregar el checkbox
    const tdCheckbox = document.createElement("td");
    tdCheckbox.innerHTML = `<input type="checkbox" class="select-producto" data-id="${producto.id}">`;
    fila.appendChild(tdCheckbox);
    // Agregar las demás columnas
    fila.innerHTML += `
    <td>${producto.nombre}</td>
    <td>${producto.descripcion}</td>
    <td><img src="${producto.img}" alt="${producto.nombre}"></td>
    <td>
      ${producto.filtros
        .map((filtro) => `<span class="filtro">${filtro}</span>`)
        .join(" ")}
    </td>
    <td>${producto.precio}</td>
  `;

    tablaProductos.appendChild(fila);
  });
}

// Lógica de seleccionar todos los checkboxes
document.getElementById("select-all").addEventListener("change", (e) => {
  const checkboxes = document.querySelectorAll(".select-producto");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = e.target.checked;
  });
});
// Función para agregar un producto
function agregarProducto() {
  // Al hacer clic en el botón "Nuevo", simplemente mostramos un alert por ahora.
  abrirFormulario("agregar");
}

// Función para editar un producto
function editarProducto() {
  // Obtén todos los checkboxes seleccionados
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  // Si no hay ningún checkbox seleccionado, no hacer nada
  if (checkboxes.length === 0) {
    return;
  }

  // Si hay más de un checkbox seleccionado, muestra un alert de error
  if (checkboxes.length > 1) {
    alert("Solo puedes seleccionar un registro para editar.");
    return;
  }

  // Si solo hay un checkbox seleccionado, muestra un alert de éxito
  cargarProducto(checkboxes[0].dataset.id);
}

// Función para eliminar productos
function eliminarProducto() {
  // Obtén todos los checkboxes seleccionados
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  // Si no hay ningún checkbox seleccionado, no hacer nada
  if (checkboxes.length === 0) {
    return;
  }

  // Muestra un alert confirmando la eliminación
  alert("Productos eliminados correctamente.");
}

// Función para abrir el formulario
function abrirFormulario(accion) {
  fetch("modalDetalleProducto.html")
    .then((response) => response.text())
    .then((modalHtml) => {
      document.getElementById("modal-container").innerHTML = modalHtml;
      const modal = document.getElementById("modal");
      modal.style.display = "block";
      // Realizar otras configuraciones dependiendo de la acción
      if (accion === "agregar") {
        document.querySelector(".modal-content h2").textContent =
          "Nuevo Producto";
        document.getElementById("formProducto").reset(); // Limpiar formulario
      } else if (accion === "modificar") {
        document.querySelector(".modal-content h2").textContent =
          "Editar Producto";
      }
    });
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Lógica para guardar el producto (al hacer submit en el formulario)
// Prevenir el envío del formulario y mostrar un mensaje
document.addEventListener("submit", function (event) {
  if (event.target.id === "formProducto") {
    event.preventDefault();
    alert("Producto guardado correctamente");
    cerrarModal();
  }
});

// Función que se ejecuta cuando se hace clic en "Editar"
function cargarProducto(id) {
  abrirFormulario("modificar");

  // Leer el archivo JSON
  fetch("/productos.json")
    .then((response) => response.json()) // Convertir la respuesta en JSON
    .then((productos) => {
      limpiarFormulario();
      // Buscar el producto con el id correspondiente
      const producto = productos.find((p) => p.id == id);

      if (producto) {
        // Poblamos la modal con los datos del producto
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("descripcion").value = producto.descripcion;
        document.getElementById("precio").value = producto.precio;

        // Poblamos los filtros
        const filtrosSelect = document.getElementById("filtros");
        Array.from(filtrosSelect.options).forEach((option) => {
          option.selected = producto.filtros.includes(option.value);
        });
      } else {
        alert("Producto no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al cargar el producto:", error);
    });
}

// Función para cerrar la modal
function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

// Función para borrar el contenido del formulario
function limpiarFormulario() {
  const formulario = document.getElementById("formProducto");

  // Borrar todos los campos de texto y textarea
  formulario
    .querySelectorAll("input[type='text'], input[type='number'], textarea")
    .forEach((input) => {
      input.value = "";
    });

  // Borrar el select (desmarcar todas las opciones)
  formulario.querySelectorAll("select[multiple]").forEach((select) => {
    select.selectedIndex = -1;
    Array.from(select.options).forEach((option) => {
      option.selected = false;
    });
  });

  // Borrar el campo de archivo
  formulario.querySelector("input[type='file']").value = "";
}
