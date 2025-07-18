// === FULLSCREEN OVERLAY ===
const fullscreenOverlay = document.createElement('div');
fullscreenOverlay.style.position = 'fixed';
fullscreenOverlay.style.top = '0';
fullscreenOverlay.style.left = '0';
fullscreenOverlay.style.width = '100%';
fullscreenOverlay.style.height = '100%';
fullscreenOverlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
fullscreenOverlay.style.display = 'flex';
fullscreenOverlay.style.alignItems = 'center';
fullscreenOverlay.style.justifyContent = 'center';
fullscreenOverlay.style.zIndex = '9999';
fullscreenOverlay.style.opacity = '0';
fullscreenOverlay.style.transition = 'opacity 0.3s ease';
fullscreenOverlay.style.pointerEvents = 'none';

const fullscreenImage = document.createElement('img');
fullscreenImage.style.maxWidth = '90%';
fullscreenImage.style.maxHeight = '90%';
fullscreenImage.style.objectFit = 'contain';
fullscreenImage.style.cursor = 'zoom-out';
fullscreenImage.style.transition = 'opacity 0.4s ease'; // добавлено для плавной анимации

const closeButton = document.createElement('button');
closeButton.innerHTML = '&times;';
closeButton.style.position = 'absolute';
closeButton.style.top = '20px';
closeButton.style.right = '30px';
closeButton.style.fontSize = '40px';
closeButton.style.color = '#fff';
closeButton.style.background = 'transparent';
closeButton.style.border = 'none';
closeButton.style.cursor = 'pointer';
closeButton.style.zIndex = '10000';

const leftArrow = document.createElement('button');
leftArrow.innerHTML = '&#10094;';
leftArrow.style.position = 'absolute';
leftArrow.style.top = '50%';
leftArrow.style.left = '20px';
leftArrow.style.fontSize = '60px';
leftArrow.style.color = '#fff';
leftArrow.style.background = 'transparent';
leftArrow.style.border = 'none';
leftArrow.style.cursor = 'pointer';
leftArrow.style.transform = 'translateY(-50%)';
leftArrow.style.zIndex = '10000';

const rightArrow = document.createElement('button');
rightArrow.innerHTML = '&#10095;';
rightArrow.style.position = 'absolute';
rightArrow.style.top = '50%';
rightArrow.style.right = '20px';
rightArrow.style.fontSize = '60px';
rightArrow.style.color = '#fff';
rightArrow.style.background = 'transparent';
rightArrow.style.border = 'none';
rightArrow.style.cursor = 'pointer';
rightArrow.style.transform = 'translateY(-50%)';
rightArrow.style.zIndex = '10000';

fullscreenOverlay.appendChild(fullscreenImage);
fullscreenOverlay.appendChild(closeButton);
fullscreenOverlay.appendChild(leftArrow);
fullscreenOverlay.appendChild(rightArrow);
document.body.appendChild(fullscreenOverlay);

let currentCarousel = null;
let currentIndex = 0;
let currentImages = [];

// Функция плавной смены картинки
function changeFullscreenImage(newSrc) {
  fullscreenImage.style.opacity = '0'; // Начинаем затухание

  fullscreenImage.addEventListener('transitionend', function handler() {
    fullscreenImage.removeEventListener('transitionend', handler);
    fullscreenImage.src = newSrc;  // Меняем источник
    fullscreenImage.style.opacity = '1'; // Возвращаем видимость
  }, { once: true });
}

// Открыть fullscreen
function openFullscreen(src, carouselId, index) {
  fullscreenImage.src = src;
  fullscreenOverlay.style.pointerEvents = 'auto';
  fullscreenOverlay.style.opacity = '1';

  currentCarousel = carouselId;
  currentIndex = index;

  if (carouselId === 'poster') {
    currentImages = Array.from(document.querySelectorAll('#poster img.carousel-img'));
  } else if (carouselId === 'cover') {
    currentImages = Array.from(document.querySelectorAll('#cover img.carousel-img'));
  } else {
    currentImages = [];
  }
}

// Закрыть fullscreen
function closeFullscreen() {
  fullscreenOverlay.style.opacity = '0';
  fullscreenOverlay.style.pointerEvents = 'none';
}

closeButton.addEventListener('click', closeFullscreen);
fullscreenImage.addEventListener('click', closeFullscreen);
fullscreenOverlay.addEventListener('click', e => {
  if (e.target === fullscreenOverlay) closeFullscreen();
});

// Навигация стрелками с анимацией
leftArrow.addEventListener('click', e => {
  e.stopPropagation();
  if (!currentImages.length) return;

  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;

  let newSrc;
  if (currentCarousel === 'cover') {
    newSrc = currentImages[currentIndex].getAttribute('data-full') || currentImages[currentIndex].src;
  } else {
    newSrc = currentImages[currentIndex].src;
  }

  changeFullscreenImage(newSrc);
});

rightArrow.addEventListener('click', e => {
  e.stopPropagation();
  if (!currentImages.length) return;

  currentIndex = (currentIndex + 1) % currentImages.length;

  let newSrc;
  if (currentCarousel === 'cover') {
    newSrc = currentImages[currentIndex].getAttribute('data-full') || currentImages[currentIndex].src;
  } else {
    newSrc = currentImages[currentIndex].src;
  }

  changeFullscreenImage(newSrc);
});

// Глобальные функции для доступа из других скриптов
window.openFullscreen = openFullscreen;
window.closeFullscreen = closeFullscreen;
