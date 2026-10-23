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


function renderProducts(products) {
  if (!catalogGrid) return; 

  catalogGrid.innerHTML = ''; 

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
    const article = document.createElement('article');
    article.className = 'product-card';

    const link = document.createElement('a');
    link.href = product.link;
    link.className = 'product-card-link';

    const imageBox = document.createElement('div');
    imageBox.className = 'product-image-box';

    if (product.badge) {
      const badge = document.createElement('span');
      badge.className = product.badgeClass;
      badge.textContent = product.badge;
      imageBox.appendChild(badge);
    }

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'product-img';
    imageBox.appendChild(img);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'add-to-cart-btn';
    btn.textContent = 'Детальніше';
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

    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = product.price;
    infoBox.appendChild(price);

    link.appendChild(imageBox);
    link.appendChild(infoBox);
    article.appendChild(link);

    catalogGrid.appendChild(article);
  });
}

function handleFilterChange() {

  const selectedCategories = Array.from(filterCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  if (selectedCategories.length === 0) {
    renderProducts(productsData);
  } else {
    const filteredProducts = productsData.filter(product => 
      selectedCategories.includes(product.category)
    );
    renderProducts(filteredProducts);
  }
}


if (catalogGrid && filterCheckboxes.length > 0) {
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleFilterChange);
  });
  renderProducts(productsData);
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