document.addEventListener('DOMContentLoaded', () => {
    const carritoDestino = document.getElementById('carrito_container'); 
  
    const carritoGuardado = localStorage.getItem('carritoLleno');
  
    if (carritoDestino && carritoGuardado) {
      
      carritoDestino.innerHTML = carritoGuardado;
    }
  });
  
  // Función para aumentar el monto
  window.botonMas = (id) => {
      const montoElement = document.getElementById(`monto${id}`);
      let monto = parseInt(montoElement.textContent.replace('x', ''), 10);
      monto += 1;
      montoElement.textContent = `x${monto}`;
      obtenerPrecio(); // Actualiza el precio total
    };
  
    // Función para disminuir el monto
    window.botonMenos = (id) => {
      const montoElement = document.getElementById(`monto${id}`);
      let monto = parseInt(montoElement.textContent.replace('x', ''), 10);
      if (monto > 1) { // Evita que el monto sea menor a 1
        monto -= 1;
        montoElement.textContent = `x${monto}`;
        obtenerPrecio(); // Actualiza el precio total
      }
    };
  
  
  
  setTimeout(obtenerPrecio, 100);
  setTimeout(borrarProducto, 100);
  
  function obtenerPrecio() { 
      let sumaTotal = 0;
      let subTotal = 0;
      let ivaTotal = 0;
  
      const precios = document.querySelectorAll(".precio");
      const montos = document.querySelectorAll(".monto");
  
      // Extraer los valores numéricos de montos
      const numeros = Array.from(montos).map(monto => {
          const match = monto.innerText.match(/\d+/); // Busca un número en el texto
          return match ? parseInt(match[0], 10) : 1; // Si no encuentra un número, usa 1 como valor predeterminado
      });
  
      
      // Iterar sobre los precios y multiplicar por los montos correspondientes
      precios.forEach((elemento, index) => {
          const precio = parseFloat(elemento.innerText); 
          const monto = numeros[index] || 1; // Si no hay un monto, asumir 1 como predeterminado
  
          if (!isNaN(precio)) { 
              sumaTotal += precio * monto; // Multiplicar precio por monto
          } 
      });
  
      // Calcular IVA y subtotal
      ivaTotal = sumaTotal * 0.21;
      subTotal = sumaTotal - ivaTotal;
  
      // Actualizar los valores en el DOM
      const total = document.getElementById("total");
      total.innerText = sumaTotal.toFixed(2); // Con 2 decimales
  
      const total2 = document.getElementById("iva");
      total2.innerText = ivaTotal.toFixed(2);
  
      const total3 = document.getElementById("subtotal");
      total3.innerText = subTotal.toFixed(2);
  }
  
  function borrarProducto(){
  
    const papelera = document.querySelectorAll(".carrito_container li span");
    
    papelera.forEach(item => {
      item.addEventListener('click', function() {
        
        item.setAttribute("cursor", "pointer");
  
        /* anadirProducto.remove();*/
        item.parentNode.remove();
        obtenerPrecio()
  
      });
    });
  
  }