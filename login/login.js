document
  .getElementById("formularioLogin")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let usuario = null;
    // Simulación de validación

    if (email === "administrador@ejemplo.com" && password === "123456") {
      usuario = {
        nombre: "Administrador",
        email: "administrador@ejemplo.com",
        esAdmin: true,
      };
    } else {
      usuario = {
        nombre: "Usuario",
        email: email,
        esAdmin: false,
      };
    }

    // Guardamos el objeto en el localStorage
    localStorage.setItem("usuarioConectado", usuario);

    // Redireccionamos a la página de de productos
    if (usuario.esAdmin) {
      window.location.href = "../administrar/panel.html";
    } else {
      window.location.href = "../inicio/pagina_producto.html";
    }
  });
