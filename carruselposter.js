const myCarousel = document.getElementById('poster');

const carousel = new bootstrap.Carousel(myCarousel, {
  interval: 3000,  // автопрокрутка
  ride: 'carousel'
});

let startX = 0;

myCarousel.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].screenX;
});

myCarousel.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].screenX;
  if (endX < startX - 40) {
    carousel.next();
  }
  if (endX > startX + 40) {
    carousel.prev();
  }
});

// ============================
// FULLSCREEN + ПЛАВНАЯ АНИМАЦИЯ
// ============================

// Создаём оверлей
const fullscreenOverlay = document.createElement('div');
fullscreenOverlay.style.position = 'fixed';
fullscreenOverlay.style.top = '0';
fullscreenOverlay.style.left = '0';
fullscreenOverlay.style.width = '100%';
fullscreenOverlay.style.height = '100%';
fullscreenOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
fullscreenOverlay.style.display = 'flex';
fullscreenOverlay.style.alignItems = 'center';
fullscreenOverlay.style.justifyContent = 'center';
fullscreenOverlay.style.zIndex = '9999';
fullscreenOverlay.style.opacity = '0';
fullscreenOverlay.style.transition = 'opacity 0.3s ease';
fullscreenOverlay.style.pointerEvents = 'none'; // чтобы не ловить клики, когда скрыт

// Картинка
const fullscreenImage = document.createElement('img');
fullscreenImage.style.maxWidth = '90%';
fullscreenImage.style.maxHeight = '90%';
fullscreenImage.style.objectFit = 'contain';
fullscreenImage.style.cursor = 'zoom-out';

// Кнопка закрытия
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

// Закрытие по кнопке
closeButton.addEventListener('click', closeFullscreen);

// Закрытие по клику на картинку
fullscreenImage.addEventListener('click', closeFullscreen);

// Закрытие по фону
fullscreenOverlay.addEventListener('click', (e) => {
  if (e.target === fullscreenOverlay) {
    closeFullscreen();
  }
});

// Функция открытия
function openFullscreen(src) {
  fullscreenImage.src = src;
  fullscreenOverlay.style.pointerEvents = 'auto';
  fullscreenOverlay.style.opacity = '1';
}

// Функция закрытия
function closeFullscreen() {
  fullscreenOverlay.style.opacity = '0';
  fullscreenOverlay.style.pointerEvents = 'none';
}

// Собираем всё
fullscreenOverlay.appendChild(fullscreenImage);
fullscreenOverlay.appendChild(closeButton);
document.body.appendChild(fullscreenOverlay);

// Навешиваем на все картинки
const images = myCarousel.querySelectorAll('img');
images.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    openFullscreen(img.src);
  });
});
