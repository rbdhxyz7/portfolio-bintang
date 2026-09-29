// --- 1. Slider Media Sosial ---
let currentSlide = 0;
const sliderTrack = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.slider-dots .dot');
const totalSlides = dots.length;

function updateSlider() {
  if (!sliderTrack) return;
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlider();
}

// Auto Slide setiap 4 detik
let autoSlideInterval = setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}, 4000);

// Pause auto-slide saat kursor berada di atas slider
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
  sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  sliderContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }, 4000);
  });
}


// --- 2. Floating Social Widget (Rotasi Ikon Otomatis Saat Diam) ---
const widgetIcon = document.getElementById('widgetIcon');
const icons = [
  'fa-solid fa-graduation-cap',
  'fa-brands fa-whatsapp',
  'fa-brands fa-instagram',
  'fa-brands fa-tiktok',
  'fa-brands fa-youtube',
  'fa-solid fa-envelope'
];

let iconIndex = 0;

if (widgetIcon) {
  setInterval(() => {
    iconIndex = (iconIndex + 1) % icons.length;
    widgetIcon.innerHTML = `<i class="${icons[iconIndex]}"></i>`;
  }, 2000);
}