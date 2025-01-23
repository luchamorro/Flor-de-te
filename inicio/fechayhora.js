function mostrarFechaHora() {
    const contenedorFechaHora = document.getElementById("fechayhora");
    const fecha = new Date();

    // formateo de fecha
    const opcionesFecha = {
      weekday: 'long', // Día de la semana completo
      day: 'numeric',  // Día del mes
      month: 'long',   // Nombre del mes completo
      year: 'numeric', // Año
    };

    // formateo de hora
    const opcionesHora = {
      hour: '2-digit', // Hora
      minute: '2-digit', // Minuto
      hour12: false,    // Formato 24 horas
    };

    // formateo fecha y hora
    const fechaFormateada = new Intl.DateTimeFormat('es-Es', opcionesFecha).format(fecha); //cambiar a 'en-En' para inglés - eu-Eu para euskera
    // const fechaFormateadaEn = new Intl.DateTimeFormat('en-EN', opcionesFecha).format(fecha); 
    const horaFormateada = new Intl.DateTimeFormat('es-ES', opcionesHora).format(fecha);

    // como se muestra 
    contenedorFechaHora.textContent = `${fechaFormateada} - ${horaFormateada}`;
  }

  
  mostrarFechaHora();

  // Actualizar la hora cada 30 segundos
  setInterval(mostrarFechaHora, 30000);