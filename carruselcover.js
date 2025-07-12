// ======= cover-carousel.js =======

// Найти #cover
const myCover = document.getElementById('cover');

const coverCarousel = new bootstrap.Carousel(myCover, {
  interval: 3000,
  ride: 'carousel'
});

let coverStartX = 0;

myCover.addEventListener('touchstart', (e) => {
  coverStartX = e.changedTouches[0].screenX;
});

myCover.addEventListener('touchend', (e) => {
  const coverEndX = e.changedTouches[0].screenX;
  if (coverEndX < coverStartX - 40) {
    coverCarousel.next();
  }
  if (coverEndX > coverStartX + 40) {
    coverCarousel.prev();
  }
});

// Использует общий fullscreenOverlay и openFullscreen (если они глобальные)
const coverImages = myCover.querySelectorAll('img');
coverImages.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const fullSrc = img.getAttribute('data-full');
    if (fullSrc) {
      openFullscreen(fullSrc);
    } else {
      console.warn('Нет data-full:', img);
    }
  });
});
