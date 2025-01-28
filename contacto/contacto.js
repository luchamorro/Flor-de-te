// Seleccionar el formulario
const formulario = document.getElementById("formulario");

// Escuchar el evento de envío del formulario
formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar el envío real del formulario

  // Obtener los datos del formulario
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const privacidad = document.getElementById("privacidad").checked;

  // Guardar los datos en localStorage como un objeto
  const datosFormulario = {
    nombre: nombre,
    email: email,
    privacidad: privacidad,
  };

  // Convertir el objeto a una cadena JSON y almacenarlo
  localStorage.setItem("formularioDatos", JSON.stringify(datosFormulario));

  // Confirmación (opcional)
  alert("tus datos han sido guardados");
});