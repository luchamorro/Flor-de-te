document.addEventListener("DOMContentLoaded", function () {
  // Cargar datos del usuario desde localStorage
  const usuarioConectado = JSON.parse(localStorage.getItem("usuarioConectado"));
  if (usuarioConectado) {
    document.getElementById("userName").textContent = usuarioConectado.nombre;
  } else {
    window.location.href = "../inicio/login.html";
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
