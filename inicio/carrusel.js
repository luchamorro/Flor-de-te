  //carrusel hero
  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-slide');
  const totalSlides = slides.length;
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
  }
  // Cambiar de slide automáticamente cada 5 segundos
  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000); // 5000 milisegundos = 5 segundos

