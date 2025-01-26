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

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("usuarioConectado");
    window.location.href = "../inicio/index.html";
  });

  // Subir y mostrar la foto
  const uploadPhoto = document.getElementById("uploadPhoto");
  const profilePicture = document.getElementById("profilePicture");

  uploadPhoto.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicture.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});
