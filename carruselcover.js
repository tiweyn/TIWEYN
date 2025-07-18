(() => {
  const myCover = document.getElementById('cover');

  const coverCarousel = new bootstrap.Carousel(myCover, {
    interval: 3000,
    ride: 'carousel'
  });

  let startX = 0;

  myCover.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].screenX;
  });

  myCover.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].screenX;
    if (endX < startX - 40) coverCarousel.next();
    if (endX > startX + 40) coverCarousel.prev();
  });

  const images = myCover.querySelectorAll('img.carousel-img');
  images.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const fullSrc = img.getAttribute('data-full') || img.src;
      window.openFullscreen(fullSrc, 'cover', i);
    });
  });
})();
