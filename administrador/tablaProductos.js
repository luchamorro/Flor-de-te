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


// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("usuarioConectado");
  window.location.href = "../inicio/index.html";
});
