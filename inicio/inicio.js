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
