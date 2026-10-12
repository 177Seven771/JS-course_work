const closeBtn = document.querySelector('.close-btn');
const notificationBar = document.querySelector('.notification-bar');

if (notificationBar) {
  notificationBar.style.display = 'flex';
}

if (closeBtn && notificationBar) {
  closeBtn.addEventListener('click', () => {
    notificationBar.style.display = 'none';
  });
}

const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');

if (burgerMenu && navMenu) {
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}


const slider = document.querySelector('.products-slider');
const dots = document.querySelectorAll('.slider-dots .dot');

if (slider && dots.length > 0) {
  slider.addEventListener('scroll', () => {
    const scrollLeft = slider.scrollLeft;
    const width = slider.clientWidth;
    const activeIndex = Math.round(scrollLeft / width);

    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const width = slider.clientWidth;
      slider.scrollTo({
        left: index * width,
        behavior: 'smooth'
      });
    });
  });
}


const brandsSlider = document.querySelector('.brands-grid');
const prevArrow = document.querySelector('.arrow-btn[aria-label="Previous brand"]');
const nextArrow = document.querySelector('.arrow-btn[aria-label="Next brand"]');

if (brandsSlider && prevArrow && nextArrow) {
  const scrollAmount = 200;

  nextArrow.addEventListener('click', () => {
    brandsSlider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  prevArrow.addEventListener('click', () => {
    brandsSlider.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
}