function toggleMenu() {
  const menu = document.querySelector('.menu ul');  // Obtener la lista del menú
  const rightSection = document.querySelector('.right-section');  // Obtener la sección de usuario y carrito
  
  // Alternar la clase 'active' para mostrar el menú y la sección derecha
  menu.classList.toggle('active');
  rightSection.classList.toggle('active');
}

