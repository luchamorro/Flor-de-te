function mostrarFechaHora(lang = 'es-ES') {
  const contenedorFechaHora = document.getElementById("fechayhora");
  const fecha = new Date();

  // Opciones de formato de fecha
  const opcionesFecha = {
    weekday: 'long', // Día de la semana completo
    day: 'numeric',  // Día del mes
    month: 'long',   // Nombre del mes completo
    year: 'numeric', // Año
  };

  // Opciones de formato de hora
  const opcionesHora = {
    hour: '2-digit', // Hora
    minute: '2-digit', // Minuto
    hour12: false,    // Formato 24 horas
  };

  // Formatear fecha y hora según el idioma
  const fechaFormateada = new Intl.DateTimeFormat(lang, opcionesFecha).format(fecha);
  const horaFormateada = new Intl.DateTimeFormat(lang, opcionesHora).format(fecha);

  // Mostrar la fecha y hora formateadas
  contenedorFechaHora.textContent = `${fechaFormateada} - ${horaFormateada}`;
}

// Mostrar la fecha y hora al cargar la página
const savedLanguage = localStorage.getItem("selectedLanguage") || "es";
mostrarFechaHora(savedLanguage === "es" ? "es-ES" : savedLanguage === "en" ? "en-EN" : "eu-EU");

// Actualizar la hora cada 30 segundos en el idioma correcto
setInterval(() => {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "es";
  mostrarFechaHora(savedLanguage === "es" ? "es-ES" : savedLanguage === "en" ? "en-EN" : "eu-EU");
}, 30000);