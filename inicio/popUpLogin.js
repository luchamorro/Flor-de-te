// Elementos del popup
const popupLoginBackground = document.getElementById("popupLoginBackground");
const popupLoginDiv = document.getElementById("popupLoginDiv");
const closeLoginPopup = document.getElementById("closeLoginPopup");
const userArea = document.querySelector(".user-area");

// Mostrar el popup de login al hacer clic en el ícono de usuario
userArea.addEventListener("click", () => {
  popupLoginBackground.style.display = "block";
  popupLoginDiv.style.display = "block";
});

// Cerrar el popup al hacer clic en el botón de cerrar
closeLoginPopup.addEventListener("click", () => {
  popupLoginBackground.style.display = "none";
  popupLoginDiv.style.display = "none";
});

// Cerrar el popup al hacer clic fuera del formulario
popupLoginBackground.addEventListener("click", () => {
  popupLoginBackground.style.display = "none";
  popupLoginDiv.style.display = "none";
});

// Evento para el envío del formulario de inicio de sesión
document
  .getElementById("formularioLogin")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("password").value;

    let usuario = null;

    // Simulación de validación
    if (email === "admin@ejemplo.com" && password === "123456") {
      usuario = {
        nombre: "Admin",
        email: "admin@ejemplo.com",
        esAdmin: true,
      };
    } else if (email === "andres@ejemplo.com" && password === "123456") {
      usuario = {
        nombre: "Andrés",
        email: "andres@ejemplo.com",
        esAdmin: false,
      };
    } else {
      alert("Credenciales incorrectas");
      return;
    }

    // Guardamos el objeto en el localStorage como JSON
    localStorage.setItem("usuarioConectado", JSON.stringify(usuario));

    // Redireccionamos según el tipo de usuario
    if (usuario.esAdmin) {
      window.location.href = "../administrador/panelAdmin.html";
    } else {
      window.location.href = "../login/login.html";
    }
  });

// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("usuarioConectado");
  window.location.href = "../inicio/index.html";
});
