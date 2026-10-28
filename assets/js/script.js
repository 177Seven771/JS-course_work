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

let productsData = []; 
const catalogGrid = document.getElementById('catalogGrid');
const bestsellerGrid = document.getElementById('bestsellerGrid');
const productBestsellerGrid = document.getElementById('productBestsellerGrid');
const categorySelect = document.getElementById('categorySelect');

function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card';

  const link = document.createElement('a');
  link.href = product.link || 'product.html';
  link.className = 'product-card-link';

  const imageBox = document.createElement('div');
  imageBox.className = 'product-image-box';

  if (product.badge) {
    const badge = document.createElement('span');
    badge.className = product.badgeClass || 'badge-hot';
    badge.textContent = product.badge;
    imageBox.appendChild(badge);
  }

  if (product.saleBadge) {
    const saleBadge = document.createElement('span');
    saleBadge.className = 'badge-sale';
    saleBadge.textContent = product.saleBadge;
    imageBox.appendChild(saleBadge);
  }

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;
  img.className = 'product-img';
  imageBox.appendChild(img);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'add-to-cart-btn';
  btn.textContent = 'У кошик';
  imageBox.appendChild(btn);

  const infoBox = document.createElement('div');
  infoBox.className = 'product-info';

  const stars = document.createElement('div');
  stars.className = 'stars';
  stars.textContent = '★★★★★';
  infoBox.appendChild(stars);

  const title = document.createElement('h3');
  title.className = 'product-name';
  title.textContent = product.name;
  infoBox.appendChild(title);

  const priceWrapper = document.createElement('div');
  priceWrapper.className = 'price-wrapper';

  const price = document.createElement('span');
  price.className = 'product-price';
  price.textContent = product.price;
  priceWrapper.appendChild(price);

  if (product.oldPrice) {
    const oldPrice = document.createElement('span');
    oldPrice.className = 'product-old-price';
    oldPrice.textContent = product.oldPrice;
    priceWrapper.appendChild(oldPrice);
  }

  infoBox.appendChild(priceWrapper);
  link.appendChild(imageBox);
  link.appendChild(infoBox);
  article.appendChild(link);

  return article;
}

function renderProductsContainer(container, products) {
  if (!container) return;

  container.innerHTML = '';

  if (products.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'grid-message';
    emptyMsg.textContent = 'На жаль, товарів у цій категорії не знайдено.';
    container.appendChild(emptyMsg);
    return;
  }

  products.forEach(product => {
    container.appendChild(createProductCard(product));
  });
}

async function loadProductsData() {
  if (catalogGrid) catalogGrid.innerHTML = '<p class="grid-message">Завантаження каталогу...</p>';
  if (bestsellerGrid) bestsellerGrid.innerHTML = '<p class="grid-message">Завантаження хітів продажу...</p>';
  if (productBestsellerGrid) productBestsellerGrid.innerHTML = '<p class="grid-message">Завантаження хітів продажу...</p>';

  try {
    const response = await fetch('assets/data/products.json');

    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    productsData = await response.json();

    if (catalogGrid) {
      renderProductsContainer(catalogGrid, productsData);
    }

    if (bestsellerGrid) {
      renderProductsContainer(bestsellerGrid, productsData);
    }

    if (productBestsellerGrid) {
      renderProductsContainer(productBestsellerGrid, productsData);
    }

  } catch (error) {
    console.error('Помилка при завантаженні товарів:', error);

    const errorHTML = `
      <div class="grid-error-message">
        <h3>Не вдалося завантажити товари</h3>
        <p>Помилка отримання даних (${error.message}). Перевірте шлях до JSON-файлу або підключення.</p>
      </div>
    `;

    if (catalogGrid) catalogGrid.innerHTML = errorHTML;
    if (bestsellerGrid) bestsellerGrid.innerHTML = errorHTML;
    if (productBestsellerGrid) productBestsellerGrid.innerHTML = errorHTML;
  }
}

function handleFilterChange() {
  const selectedCategory = categorySelect.value;

  if (!selectedCategory) {
    renderProductsContainer(catalogGrid, productsData);
  } else {
    const filteredProducts = productsData.filter(product => 
      product.category === selectedCategory
    );
    renderProductsContainer(catalogGrid, filteredProducts);
  }
}

if (catalogGrid || bestsellerGrid || productBestsellerGrid) {
  if (categorySelect) {
    categorySelect.addEventListener('change', handleFilterChange);
  }
  loadProductsData();
}

const cartLink = document.querySelector('.cart-link');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCart');

if (cartLink && cartModal) {
  cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.classList.add('active');
  });

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  }

  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      cartModal.classList.remove('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const elementsToReveal = document.querySelectorAll('.bestseller-section, .catalog-content, .features-container, .collection-card, .promo-banner-container, .contact-section');

  elementsToReveal.forEach(el => {
    el.classList.add('reveal');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userMessage = document.getElementById('userMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('formSuccessMessage');
    const serverErrorMessage = document.getElementById('formServerErrorMessage');

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      if (successMessage) successMessage.style.display = 'none';
      if (serverErrorMessage) serverErrorMessage.style.display = 'none';

      if (userName.value.trim() === '') {
        userName.classList.add('error');
        userName.classList.remove('success');
        nameError.textContent = 'Будь ласка, введіть ваше ім\'я.';
        nameError.classList.add('active');
        isValid = false;
      } else if (userName.value.trim().length < 2) {
        userName.classList.add('error');
        nameError.textContent = 'Ім\'я повинно містити щонайменше 2 символи.';
        nameError.classList.add('active');
        isValid = false;
      } else {
        userName.classList.remove('error');
        userName.classList.add('success');
        nameError.classList.remove('active');
      }

      if (userEmail.value.trim() === '') {
        userEmail.classList.add('error');
        userEmail.classList.remove('success');
        emailError.textContent = 'Будь ласка, введіть ваш email.';
        emailError.classList.add('active');
        isValid = false;
      } else if (!isValidEmail(userEmail.value.trim())) {
        userEmail.classList.add('error');
        userEmail.classList.remove('success');
        emailError.textContent = 'Введіть коректний email (наприклад, example@mail.com).';
        emailError.classList.add('active');
        isValid = false;
      } else {
        userEmail.classList.remove('error');
        userEmail.classList.add('success');
        emailError.classList.remove('active');
      }

      if (userMessage.value.trim() === '') {
        userMessage.classList.add('error');
        userMessage.classList.remove('success');
        messageError.textContent = 'Будь ласка, напишіть повідомлення.';
        messageError.classList.add('active');
        isValid = false;
      } else if (userMessage.value.trim().length < 10) {
        userMessage.classList.add('error');
        messageError.textContent = 'Повідомлення має містити щонайменше 10 символів.';
        messageError.classList.add('active');
        isValid = false;
      } else {
        userMessage.classList.remove('error');
        userMessage.classList.add('success');
        messageError.classList.remove('active');
      }

      if (isValid) {
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Надсилання...';

        const formData = new FormData(contactForm);

        try {
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            successMessage.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
              userName.classList.remove('success');
              userEmail.classList.remove('success');
              userMessage.classList.remove('success');
            }, 3000);
          } else {
            if (serverErrorMessage) serverErrorMessage.style.display = 'block';
          }
        } catch (error) {
          console.error('Помилка надсилання форми:', error);
          if (serverErrorMessage) serverErrorMessage.style.display = 'block';
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }
});