
function obtenerPrecioMiniCarrito(){
    let sumaTotal = 0;

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

// Actualizar los valores en el DOM
const total = document.getElementById("sumaTotal");
total.innerText = sumaTotal.toFixed(2); // Con 2 decimales


}

setInterval(obtenerPrecioMiniCarrito, 1000); 






