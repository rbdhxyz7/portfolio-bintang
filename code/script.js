document.addEventListener('DOMContentLoaded', () => {

  // 1. CAROUSEL / SLIDER MEDIA SOSIAL
  const sliderTrack = document.getElementById('sliderTrack');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const sliderContainer = document.querySelector('.slider-container');
  const totalSlides = dots.length;

  let currentSlide = 0;
  let autoSlideInterval = null;

  // Update posisi slider dan indicator dot
  function updateSlider() {
    if (!sliderTrack) return;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  // Menjalankan auto slide setiap 4 detik
  function startAutoSlide() {
    if (totalSlides === 0) return;
    stopAutoSlide(); // Hindari multiple timer berjalan berbarengan
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }, 4000);
  }

  // Menghentikan auto slide
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  // Pindah slide secara eksplisit (dipanggil via atribut onclick di HTML)
  window.goToSlide = function(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
    startAutoSlide(); // Reset timer auto-slide setelah diklik manual
  };

  // Event Listener: Pause slider saat kursor berada di atasnya
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    // Dukungan Swiping pada layar sentuh (Mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50; // Jarak minimal geseran (pixel)
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe ke Kiri -> Next Slide
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe ke Kanan -> Prev Slide
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
      }
    }
  }

  startAutoSlide();

  // 2. FLOATING SOCIAL WIDGET (ROTASI IKON)
  const widgetIcon = document.getElementById('widgetIcon');
  const icons = [
    'fa-solid fa-graduation-cap',
    'fa-brands fa-whatsapp',
    'fa-brands fa-instagram',
    'fa-brands fa-tiktok',
    'fa-brands fa-youtube',
    'fa-brands fa-github',
    'fa-solid fa-envelope'
  ];

  let iconIndex = 0;

  if (widgetIcon) {
    setInterval(() => {
      iconIndex = (iconIndex + 1) % icons.length;
      widgetIcon.innerHTML = `<i class="${icons[iconIndex]}"></i>`;
    }, 2000);
  }

});