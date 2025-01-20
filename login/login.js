document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Simulación de validación
    if (email === 'usuario@ejemplo.com' && password === '123456') {
        alert('Inicio de sesión exitoso.');
    } else {
        alert('Credenciales incorrectas. Por favor, intente de nuevo.');
    }
});

// Suponiendo que el nombre de usuario es el dato que quieres guardar
const usuario = {
    nombre: 'pepito',
    email: 'pepito@hotmail.com'
};

// Guardamos el objeto en el localStorage en formato JSON
localStorage.setItem('usuario', JSON.stringify(usuario));