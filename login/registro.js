// Capturamos el formulario por su ID
document.getElementById('formularioRegistro').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
  
    // Obtenemos los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('registroEmail').value;
    const confirmarEmail = document.getElementById('confirmarEmail').value;
    const password = document.getElementById('registroPassword').value;
  
    // Validación simple para comprobar que los correos coincidan
    if (email !== confirmarEmail) {
      alert('Los correos electrónicos no coinciden. Por favor, revisa los campos.');
      return;
    }
  
    // Creamos un objeto para almacenar los datos del usuario
    const usuario = {
      nombre,
      apellidos,
      email,
      password
    };
  
    // Guardamos el usuario en el almacenamiento local del navegador
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
  
    // Confirmación al usuario
    alert('¡Registro exitoso!');
  
    // Redireccionamos a otra página o limpiamos el formulario
    document.getElementById('formularioRegistro').reset();
  });
  
  
