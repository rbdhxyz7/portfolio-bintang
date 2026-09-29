// ==========================================
// 1. MEDIA SOCIAL SLIDER (SEKSI SLIDER)
// ==========================================
let currentSlide = 0;
const track = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.dot');
const totalSlides = dots.length;
let autoSlideInterval;

function goToSlide(index) {
  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  dots.forEach((dot, idx) => {
    if (idx === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// ==========================================
// 2. FLOATING WIDGET ROTATION
// ==========================================
const socialMediaList = [
  { color: "#2563eb", iconClass: "fa-solid fa-graduation-cap" },
  { color: "#25d366", iconClass: "fa-brands fa-whatsapp" },
  { color: "#e1306c", iconClass: "fa-brands fa-instagram" },
  { color: "#ff0000", iconClass: "fa-brands fa-youtube" },
  { color: "#000000", iconClass: "fa-brands fa-tiktok" },
  { color: "#ea4335", iconClass: "fa-solid fa-envelope" }
];

let currentWidgetIndex = 0;
let widgetInterval = null;
let isHovered = false;

let widgetWrapper, widgetIcon;

function updateWidgetContent() {
  if (isHovered || !widgetWrapper) return;

  currentWidgetIndex = (currentWidgetIndex + 1) % socialMediaList.length;
  const currentData = socialMediaList[currentWidgetIndex];

  widgetWrapper.style.backgroundColor = currentData.color;
  if (widgetIcon) {
    widgetIcon.innerHTML = `<i class="${currentData.iconClass}"></i>`;
  }
}

function startWidgetRotation() {
  if (!widgetInterval) {
    widgetInterval = setInterval(updateWidgetContent, 2000);
  }
}

function stopWidgetRotation() {
  clearInterval(widgetInterval);
  widgetInterval = null;
}

// ==========================================
// 3. EVENT INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  widgetWrapper = document.getElementById('floatingWidget');
  widgetIcon = document.getElementById('widgetIcon');

  startAutoSlide();

  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
  }

  // Deteksi Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (widgetWrapper && widgetWrapper.classList.contains('hidden')) {
        widgetWrapper.classList.remove('hidden');
        startWidgetRotation();
      }
    } else {
      if (widgetWrapper && !widgetWrapper.classList.contains('hidden')) {
        widgetWrapper.classList.add('hidden');
        stopWidgetRotation();
      }
    }
  });

  // Event Kursor Hover
  if (widgetWrapper) {
    widgetWrapper.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    
    widgetWrapper.addEventListener('mouseleave', () => {
      isHovered = false;
    });
  }
});