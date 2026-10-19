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

/* ==============================================================
   ДИНАМІЧНИЙ РЕНДЕРИНГ ТА ФІЛЬТРАЦІЯ ТОВАРІВ (ДЛЯ КАТАЛОГУ)
   Рівень складності 7-9 балів (DOM + Масив об'єктів + Фільтр)
============================================================== */

// 1. Масив з усіма товарами асортименту
const productsData = [
  {
    id: 1,
    name: "Трекінгова куртка Gore-Tex Pro",
    price: "310 $",
    image: "assets/images/november-outfits.jpg",
    category: "jackets",
    badge: "ТОП",
    badgeClass: "badge-hot",
    link: "product.html"
  },
  {
    id: 2,
    name: "Флісова кофта Polar 200",
    price: "120 $",
    image: "assets/images/flis-polar200.jpg",
    category: "fleece",
    badge: "НОВИНКА",
    badgeClass: "badge-new",
    link: "product.html"
  },
  {
    id: 3,
    name: "Туристичні штани Softshell",
    price: "150 $",
    image: "assets/images/softshell.jpg",
    category: "pants",
    badge: "",
    badgeClass: "",
    link: "product.html"
  },
  {
    id: 4,
    name: "Штормова куртка Alpine Windproof",
    price: "290 $",
    image: "assets/images/alphine.jpg",
    category: "jackets",
    badge: "",
    badgeClass: "",
    link: "product.html"
  },
  {
    id: 5,
    name: "Комплект термобілизни Merino",
    price: "50$",
    image: "assets/images/termo-merino.jpg",
    category: "thermal",
    badge: "",
    badgeClass: "",
    link: "product.html"
  },
  {
    id: 6,
    name: "Утеплені штани Winter Hike",
    price: "140$",
    image: "assets/images/winter-hike.jpg",
    category: "pants",
    badge: "ТОП",
    badgeClass: "badge-hot",
    link: "product.html"
  }
];

const catalogGrid = document.getElementById('catalogGrid');
const filterCheckboxes = document.querySelectorAll('.category-filter');

// 2. Функція відмальовування товарів у DOM
// 2. Функція відмальовування товарів у DOM (без HTML-рядків)
function renderProducts(products) {
  if (!catalogGrid) return; // Виконується лише якщо ми на сторінці каталогу

  catalogGrid.innerHTML = ''; // Очищаємо сітку перед оновленням

  if (products.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.style.gridColumn = '1 / -1';
    emptyMessage.style.fontFamily = 'var(--font-inter)';
    emptyMessage.style.color = 'var(--dark-grey)';
    emptyMessage.textContent = 'На жаль, товарів у цій категорії не знайдено.';
    catalogGrid.appendChild(emptyMessage);
    return;
  }

  products.forEach(product => {
    // Створюємо <article class="product-card">
    const article = document.createElement('article');
    article.className = 'product-card';

    // Створюємо <a href="..." class="product-card-link">
    const link = document.createElement('a');
    link.href = product.link;
    link.className = 'product-card-link';

    // Створюємо <div class="product-image-box">
    const imageBox = document.createElement('div');
    imageBox.className = 'product-image-box';

    // Додаємо бейдж (якщо він є)
    if (product.badge) {
      const badge = document.createElement('span');
      badge.className = product.badgeClass;
      badge.textContent = product.badge;
      imageBox.appendChild(badge);
    }

    // Додаємо картинку <img src="..." alt="...">
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'product-img';
    imageBox.appendChild(img);

    // Додаємо кнопку <button type="button" ...>
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'add-to-cart-btn';
    btn.textContent = 'Детальніше';
    imageBox.appendChild(btn);

    // Створюємо <div class="product-info">
    const infoBox = document.createElement('div');
    infoBox.className = 'product-info';

    // Додаємо зірки <div class="stars">
    const stars = document.createElement('div');
    stars.className = 'stars';
    stars.textContent = '★★★★★';
    infoBox.appendChild(stars);

    // Додаємо назву <h3 class="product-name">
    const title = document.createElement('h3');
    title.className = 'product-name';
    title.textContent = product.name;
    infoBox.appendChild(title);

    // Додаємо ціну <span class="product-price">
    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = product.price;
    infoBox.appendChild(price);

    // Збираємо все разом
    link.appendChild(imageBox);
    link.appendChild(infoBox);
    article.appendChild(link);

    // Додаємо готову картку в сітку
    catalogGrid.appendChild(article);
  });
}

// 3. Логіка фільтрації
function handleFilterChange() {
  // Збираємо значення всіх "включених" чекбоксів
  const selectedCategories = Array.from(filterCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  // Якщо нічого не обрано - показуємо всі товари, інакше - фільтруємо за категоріями
  if (selectedCategories.length === 0) {
    renderProducts(productsData);
  } else {
    const filteredProducts = productsData.filter(product => 
      selectedCategories.includes(product.category)
    );
    renderProducts(filteredProducts);
  }
}

// 4. Ініціалізація на сторінці каталогу
if (catalogGrid && filterCheckboxes.length > 0) {
  // Вішаємо прослуховувачі подій на чекбокси
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleFilterChange);
  });

  // Відмальовуємо всі товари при першому завантаженні сторінки
  renderProducts(productsData);
}