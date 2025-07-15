// Lógica para mostrar el nombre del usuario en la barra de navegación
document.addEventListener("DOMContentLoaded", function () {
  const usuarioConectado = JSON.parse(localStorage.getItem("usuarioConectado"));

  if (
    usuarioConectado &&
    usuarioConectado != null &&
    usuarioConectado != undefined
  ) {
    const areaUsuario = document.getElementById("iconoUsuarioLogin");
    areaUsuario.innerHTML =
      "<span> Hola, " + usuarioConectado.nombre + "</span>";
  }
});
// Logout
document.getElementById("productosBtn").addEventListener("click", function () {
  window.location.href = "tablaProductos.html";
});
// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("usuarioConectado");
  window.location.href = "/inicio/index.html";
});
