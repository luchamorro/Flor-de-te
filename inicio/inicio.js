//carrusel hero
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Ajustar el intervalo a 5000 milisegundos (5 segundos)
setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);






// Función para cargar datos desde un archivo JSON
async function cargarDatos() {    
    //async es una función asincrónica que siempre devuelve una promesa. Se puede usar await dentro de ella para esperar a que se resuelvan promesas sin bloquear el flujo del programa.
      try { //try se usa para manejar errores. si algo falla en el bucle try, el programa no se rompe, sino que salta a catch, donde se puede manejar el error.
      // --- Obtener los datos del archivo JSON:
          const respuesta = await fetch('productos.json'); // await es: "para aquí hasta que se resuelva la promesa"
          const datos = await respuesta.json(); //espera a que los datos sean procesados como JSON
            // --- Seleccionar el div donde se muestran los datos
            const div = document.getElementById('catalogoProductos');
            // Generar la lista de datos
            const lista = document.createElement('ul'); // createElementcrea un elemento HTML especificado por su tagName

            lista.setAttribute("class", "elementoProducto");

            datos.forEach(producto => {
              const item = document.createElement('li');
             item.innerHTML = `<img src="../${producto.img}" alt="${producto.nombre }  width="205" height="212" class = "imagenCatalogo"> <p class="tituloProducto">${producto.nombre}</p> <p>${producto.precio}€   <button>carrito</button></p>` //incluir la función para el botón carrito de Alejandro
              lista.appendChild(item);
            });

            // Inserta la lista en el div
          div.appendChild(lista);

          } catch (error) {
            console.error('Error al cargar los datos:', error);
            document.getElementById('catalogoProductos').textContent = 'Error al cargar los datos.';
          }

        }
        // Llama a la función al cargar la página
        cargarDatos();


