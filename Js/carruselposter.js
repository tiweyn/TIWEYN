(() => {
  const myCarousel = document.getElementById('poster');

  const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000,
    ride: 'carousel'
  });

  let startX = 0;

  myCarousel.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].screenX;
  });

  myCarousel.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].screenX;
    if (endX < startX - 40) carousel.next();
    if (endX > startX + 40) carousel.prev();
  });

  const images = myCarousel.querySelectorAll('img.carousel-img');
  images.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      window.openFullscreen(img.src, 'poster', i);
    });
  });
})();
