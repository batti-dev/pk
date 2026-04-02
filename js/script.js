/* ===================================================================
   OnlinePharmacyPK — script.js
   Data, rendering, cart, wishlist, modals, upload, checkout
   =================================================================== */

// ─── DUMMY DATA ─────────────────────────────────────────────────────

const categories = [
  { id:1, name:'Medicine',        image:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', subcategories:['Pain Relief','Antibiotics','Vitamins','Cough & Cold'] },
  { id:2, name:'Personal Care',   image:'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop', subcategories:['Body Care','Oral Care','Deodorants'] },
  { id:3, name:'Baby Care',       image:'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop', subcategories:['Diapers','Baby Food','Baby Skin Care'] },
  { id:4, name:'Medical Devices', image:'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=400&h=300&fit=crop', subcategories:['BP Monitors','Glucometers'] },
  { id:5, name:'Supplements',     image:'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=300&fit=crop', subcategories:['Multivitamins','Omega-3','Probiotics'] },
  { id:6, name:'Health & Wellness',image:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop', subcategories:['Eye Care','First Aid'] },
  { id:7, name:'Oral Care',       image:'https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=400&h=300&fit=crop', subcategories:['Toothpaste','Toothbrush'] },
  { id:8, name:'Eye Care',        image:'https://images.unsplash.com/photo-1584362917165-50235ad625a2?w=400&h=300&fit=crop', subcategories:['Eye Drops','Contact Lenses'] },
  { id:12,name:'Surgical',        image:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop', subcategories:['Masks','Gloves','Bandages'] },
  { id:13,name:'Ayurvedic',       image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', subcategories:['Herbal Tea','Essential Oils'] },
  { id:14,name:'Men Care',        image:'https://images.unsplash.com/photo-1567894340315-735d7c36190e?w=400&h=300&fit=crop', subcategories:['Shaving','Men Skin Care'] },
  { id:15,name:'Women Care',      image:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop', subcategories:['Cosmetics','Women Hygiene'] },
];

const products = [
  { id:1,  name:'Panadol Extra',       price:180, discountPrice:150, category:'Pain Relief',  image:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop', badge:'sale',    desc:'Fast-acting pain relief tablets effective for headaches, toothaches, and body pain.' },
  { id:2,  name:'Augmentin 625mg',     price:850, discountPrice:null,category:'Antibiotics',  image:'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop', badge:null,      desc:'Broad-spectrum antibiotic for bacterial infections. Prescription required.' },
  { id:3,  name:'Centrum Multivitamin',price:2200,discountPrice:1800,category:'Vitamins',     image:'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop', badge:'sale',    desc:'Complete daily multivitamin with essential vitamins and minerals for adults.' },
  { id:4,  name:'Dettol Antiseptic',   price:450, discountPrice:380, category:'First Aid',    image:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&h=500&fit=crop', badge:'limited', desc:'Trusted antiseptic liquid for wound cleaning and disinfection.' },
  { id:5,  name:'Pampers Premium',     price:3200,discountPrice:2800,category:'Diapers',      image:'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop', badge:'sale',    desc:'Premium diapers with up to 12 hours of overnight dryness protection.' },
  { id:6,  name:'Omron BP Monitor',    price:6500,discountPrice:5500,category:'BP Monitors',  image:'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=500&h=500&fit=crop', badge:'limited', desc:'Automatic digital blood pressure monitor with memory function.' },
  { id:7,  name:'Ensure Gold',         price:4200,discountPrice:3600,category:'Supplements',  image:'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&h=500&fit=crop', badge:'sale',    desc:'Complete balanced nutrition shake for adults. Vanilla flavor.' },
  { id:8,  name:'Sensodyne Toothpaste',price:650, discountPrice:null,category:'Oral Care',    image:'https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=500&h=500&fit=crop', badge:null,      desc:'Clinically proven toothpaste for sensitive teeth with fluoride protection.' },
  { id:9,  name:'Voltaren Gel 50g',    price:750, discountPrice:620, category:'Pain Relief',  image:'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop', badge:'sale',    desc:'Topical anti-inflammatory gel for joint and muscle pain relief.' },
  { id:10, name:'Accu-Chek Glucometer',price:3800,discountPrice:3200,category:'Glucometers',  image:'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&h=500&fit=crop', badge:'limited', desc:'Blood glucose monitoring kit with test strips and lancets.' },
  { id:11, name:'Calpol Syrup',        price:320, discountPrice:280, category:'Cough & Cold', image:'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&h=500&fit=crop', badge:null,      desc:'Children\'s paracetamol syrup for fever and pain. Strawberry flavored.' },
  { id:12, name:'Nivea Moisturizer',   price:890, discountPrice:null,category:'Skin Care',    image:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop', badge:null,      desc:'Intensive moisturizing cream for soft and smooth skin. All skin types.' },
];

const recommendedProducts = [
  { id:13, name:'Omega-3 Fish Oil',    price:1800,discountPrice:1500,category:'Omega-3',      image:'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=500&h=500&fit=crop', badge:null,      desc:'High potency fish oil capsules supporting heart and brain health.' },
  { id:14, name:'N95 Face Masks (10)',  price:350, discountPrice:250, category:'Masks',        image:'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=500&h=500&fit=crop', badge:'sale',    desc:'Pack of 10 medical-grade N95 face masks with ear loops.' },
  { id:15, name:'Vitamin D3 Drops',    price:950, discountPrice:null,category:'Vitamins',     image:'https://images.unsplash.com/photo-1631549916768-4c0b43b3bbff?w=500&h=500&fit=crop', badge:null,      desc:'Essential Vitamin D3 drops for bone health and immunity support.' },
  { id:16, name:'Hand Sanitizer 500ml',price:480, discountPrice:380, category:'First Aid',    image:'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=500&h=500&fit=crop', badge:'limited', desc:'70% alcohol-based hand sanitizer gel. Kills 99.9% germs.' },
];

const doctorSpecialties = ['All','General Physician','Cardiologist','Gynecologist','Pediatrician','Dermatologist','ENT Specialist'];
const pharmacistTypes = ['All','Clinical','Community','Hospital','Consultant'];

const doctors = [
  { id:1, name:'Dr. Ahmed Khan',    specialty:'General Physician', qualification:'MBBS, FCPS (Medicine)',    experience:'12 years', availability:'online',  slots:['9:00 AM','10:00 AM','11:00 AM','2:00 PM','4:00 PM','5:00 PM'], image:'https://randomuser.me/api/portraits/men/32.jpg' },
  { id:2, name:'Dr. Fatima Zahra',  specialty:'Gynecologist',       qualification:'MBBS, FCPS (Gynecology)', experience:'8 years',  availability:'online',  slots:['10:00 AM','11:30 AM','1:00 PM','3:00 PM','5:30 PM'],          image:'https://randomuser.me/api/portraits/women/44.jpg' },
  { id:3, name:'Dr. Hassan Ali',    specialty:'Cardiologist',       qualification:'MBBS, MRCP (Cardiology)', experience:'15 years', availability:'offline', slots:['9:30 AM','11:00 AM','2:30 PM','4:00 PM'],                     image:'https://randomuser.me/api/portraits/men/75.jpg' },
  { id:4, name:'Dr. Sana Malik',    specialty:'Pediatrician',       qualification:'MBBS, DCH (Pediatrics)',  experience:'6 years',  availability:'online',  slots:['8:00 AM','9:30 AM','11:00 AM','1:00 PM','3:30 PM','5:00 PM'], image:'https://randomuser.me/api/portraits/women/68.jpg' },
];

const pharmacists = [
  { id:5, name:'Pharm. Usman Raza',    pType:'Clinical',   qualification:'Pharm.D, RPh',          experience:'10 years', availability:'online',  slots:['9:00 AM','10:30 AM','12:00 PM','2:00 PM','4:30 PM'],             image:'https://randomuser.me/api/portraits/men/85.jpg' },
  { id:6, name:'Pharm. Ayesha Noor',   pType:'Community',  qualification:'Pharm.D, M.Phil',       experience:'7 years',  availability:'online',  slots:['8:30 AM','10:00 AM','11:30 AM','1:30 PM','3:00 PM','5:00 PM'],   image:'https://randomuser.me/api/portraits/women/90.jpg' },
  { id:7, name:'Pharm. Bilal Hussain', pType:'Hospital',   qualification:'Pharm.D, MBA (Health)', experience:'9 years',  availability:'offline', slots:['10:00 AM','12:00 PM','3:00 PM'],                                  image:'https://randomuser.me/api/portraits/men/46.jpg' },
  { id:8, name:'Pharm. Hira Sheikh',   pType:'Consultant', qualification:'Pharm.D, RPh',          experience:'5 years',  availability:'online',  slots:['9:00 AM','11:00 AM','1:00 PM','3:30 PM','5:30 PM'],              image:'https://randomuser.me/api/portraits/women/22.jpg' },
];

const brands = [
  { name: 'GSK', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/GlaxoSmithKline_logo.svg/512px-GlaxoSmithKline_logo.svg.png' },
  { name: 'Pfizer', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pfizer_logo.svg/512px-Pfizer_logo.svg.png' },
  { name: 'Abbott', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Abbott_Laboratories_logo.svg/512px-Abbott_Laboratories_logo.svg.png' },
  { name: 'Sanofi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Sanofi_Logo_2022.svg/512px-Sanofi_Logo_2022.svg.png' },
  { name: 'Novartis', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Novartis_Logo.svg/512px-Novartis_Logo.svg.png' },
  { name: 'Bayer', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Bayer_logo.svg/512px-Bayer_logo.svg.png' },
  { name: 'Getz Pharma', logo: 'https://getzpharma.com/wp-content/themes/getz-pharma/assets/images/logo.png' },
  { name: 'Searle', logo: 'https://searlecompany.com/wp-content/uploads/2021/04/Searle-Logo-New.png' },
  { name: 'Martin Dow', logo: 'https://martindow.com/wp-content/uploads/2021/06/logo.png' },
  { name: 'Hilton Pharma', logo: 'https://hiltonpharma.com/wp-content/themes/hilton/images/logo.png' },
  { name: 'Reckitt', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Reckitt_Logo_2021.svg/512px-Reckitt_Logo_2021.svg.png' },
  { name: 'AstraZeneca', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/AstraZeneca_logo.svg/512px-AstraZeneca_logo.svg.png' },
  { name: 'Roche', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hoffmann-La_Roche_logo.svg/512px-Hoffmann-La_Roche_logo.svg.png' },
  { name: 'Sami Pharma', logo: 'https://samipharmallc.com/wp-content/uploads/2021/05/sami-logo.png' },
  { name: 'Dettol', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dettol_logo.svg/512px-Dettol_logo.svg.png' },
];

// ─── STATE ──────────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('online_pharmacy_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('online_pharmacy_wishlist')) || [];
let selectedSlot = null;

function saveState() {
  localStorage.setItem('online_pharmacy_cart', JSON.stringify(cart));
  localStorage.setItem('online_pharmacy_wishlist', JSON.stringify(wishlist));
}

// ─── DOM HELPERS ────────────────────────────────────────────────────

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
function formatPrice(n) { return 'Rs. ' + n.toLocaleString(); }

function showToast(message, icon = 'fa-check-circle') {
  const container = $('#toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, 2500);
}

// ─── RENDER: NAV DROPDOWNS ──────────────────────────────────────────

function renderNavDropdown() {
  // Categories
  const catWrap = $('#nav-categories-dropdown');
  if (catWrap) {
    catWrap.innerHTML = categories.map(c => `
      <li>
        <a href="products.html?category=${encodeURIComponent(c.name)}">${c.name} <i class="fas fa-chevron-right"></i></a>
        <ul class="sub-dropdown-menu">
          ${(c.subcategories || []).map(s => `<li><a href="products.html?category=${encodeURIComponent(c.name)}&subcategory=${encodeURIComponent(s)}">${s}</a></li>`).join('')}
        </ul>
      </li>
    `).join('');
  }
  // Doctors dropdown
  const docWrap = $('#nav-doctors-dropdown');
  if (docWrap) {
    docWrap.innerHTML = doctorSpecialties.filter(s => s !== 'All').map(s => `<li><a href="doctors.html?filter=${encodeURIComponent(s)}">${s}</a></li>`).join('');
  }
  // Pharmacists dropdown
  const pharmWrap = $('#nav-pharmacists-dropdown');
  if (pharmWrap) {
    pharmWrap.innerHTML = pharmacistTypes.filter(t => t !== 'All').map(t => `<li><a href="pharmacists.html?filter=${encodeURIComponent(t)}">${t} Pharmacist</a></li>`).join('');
  }
}

// ─── RENDER: CATEGORIES ─────────────────────────────────────────────

function renderCategories() {
  const wrap = $('#categories-scroll');
  if (!wrap) return;
  // Triple items for seamless infinite loop
  const tripledItems = [...categories, ...categories, ...categories];
  wrap.innerHTML = tripledItems.map(c => `
    <div class="category-card" data-id="${c.id}">
      <div class="category-card-img"><img src="${c.image}" alt="${c.name}" loading="lazy"></div>
      <h4>${c.name}</h4>
    </div>
  `).join('');
  
  // Center scroll to start at the middle set
  setTimeout(() => {
    wrap.scrollLeft = wrap.scrollWidth / 3;
  }, 100);
}

// ─── RENDER: PRODUCT CARD ───────────────────────────────────────────

function productCardHTML(p) {
  const inWishlist = wishlist.includes(p.id);
  const badgeHTML = p.badge ? `<span class="product-badge ${p.badge}">${p.badge === 'sale' ? '🔥 SALE' : '⚡ LIMITED'}</span>` : '';
  const discountPct = p.discountPrice ? Math.round((1 - p.discountPrice / p.price) * 100) : 0;
  const priceHTML = p.discountPrice
    ? `<span class="current">${formatPrice(p.discountPrice)}</span><span class="original">${formatPrice(p.price)}</span><span class="discount-badge">-${discountPct}%</span>`
    : `<span class="current">${formatPrice(p.price)}</span>`;
  return `
    <div class="product-card" data-id="${p.id}">
      ${badgeHTML}
      <button class="product-wishlist ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(${p.id})" aria-label="Wishlist">
        <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
      </button>
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-hover">
          <button class="product-hover-btn" onclick="addToCart(${p.id})">
            <span class="btn-text">Add to Cart</span>
            <span class="btn-icon"><i class="fas fa-cart-plus"></i></span>
          </button>
          <button class="product-hover-btn" onclick="openQuickView(${p.id})">
            <span class="btn-text">Quick View</span>
            <span class="btn-icon"><i class="fas fa-eye"></i></span>
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h4>${p.name}</h4>
        <div class="product-price">${priceHTML}</div>
      </div>
    </div>
  `;
}

function renderProducts() {
  const grid = $('#products-grid');
  if (grid) grid.innerHTML = products.map(p => productCardHTML(p)).join('');
}
function renderDeals() {
  const grid = $('#deals-grid');
  if (grid) grid.innerHTML = products.filter(p => p.badge).map(p => productCardHTML(p)).join('');
}
function renderRecommended() {
  const grid = $('#recommended-grid');
  if (grid) grid.innerHTML = recommendedProducts.map(p => productCardHTML(p)).join('');
}

// Products page (all products)
function renderAllProducts(filter = 'All', search = '', section = null, minPrice = 0, maxPrice = 10000) {
  const grid = $('#all-products-grid');
  if (!grid) return;
  
  let baseProducts = [...products, ...recommendedProducts];
  let filtered = [];

  // 1. SECTION FILTER (From Home Page)
  if (section === 'deals') {
    filtered = baseProducts.filter(p => p.badge === 'sale');
  } else if (section === 'top') {
    filtered = baseProducts; // Assuming Top Selling are general popular products
  } else if (section === 'recommended') {
    filtered = recommendedProducts;
  } else {
    filtered = baseProducts;
  }

  // 2. CATEGORY FILTER (Parent or Subcategory)
  if (filter !== 'All') {
    const parentCat = categories.find(c => c.name === filter);
    if (parentCat) {
      // It's a parent category, show all subcategories
      const subs = parentCat.subcategories || [];
      filtered = filtered.filter(p => subs.includes(p.category) || p.category === filter);
    } else {
      // It's a specific category or subcategory
      filtered = filtered.filter(p => p.category === filter);
    }
  }
  
  // 3. SEARCH FILTER
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  // 4. PRICE FILTER
  filtered = filtered.filter(p => {
    const price = p.discountPrice || p.price;
    return price >= minPrice && price <= maxPrice;
  });
  
  grid.innerHTML = filtered.length 
    ? filtered.map(p => productCardHTML(p)).join('') 
    : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">
         <i class="fas fa-search" style="font-size:3rem;margin-bottom:20px;display:block;opacity:.2"></i>
         <p>No products found matching your active filters.</p>
         <button class="see-more-btn" style="margin-top:20px" onclick="window.location.href='products.html'">Clear Filters</button>
       </div>`;
}

// ─── RENDER: PROFILES ───────────────────────────────────────────────

function doctorCardHTML(d) {
  return `
    <div class="profile-card" data-id="${d.id}">
      <div class="profile-avatar"><img src="${d.image}" alt="${d.name}" loading="lazy"></div>
      <h4>${d.name}</h4>
      <p class="specialty">${d.specialty}</p>
      <p class="qualification">${d.qualification}</p>
      <p class="experience"><i class="fas fa-briefcase"></i> ${d.experience} experience</p>
      <div class="availability-tag ${d.availability}">
        <span class="dot"></span>
        ${d.availability === 'online' ? 'Available Now' : 'Offline'}
      </div><br>
      <button class="book-btn" onclick="openBookingModal(${d.id},'doctor')">
        <i class="fas fa-calendar-check"></i> Book Appointment
      </button>
      <a href="https://wa.me/923441636700" target="_blank" class="book-btn" style="background:#25d366;margin-top:10px">
        <i class="fab fa-whatsapp"></i> Chat Now
      </a>
    </div>
  `;
}
function pharmacistCardHTML(p) {
  return `
    <div class="profile-card" data-id="${p.id}">
      <div class="profile-avatar"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <h4>${p.name}</h4>
      <p class="specialty">${p.pType} Pharmacist</p>
      <p class="qualification">${p.qualification}</p>
      <p class="experience"><i class="fas fa-briefcase"></i> ${p.experience} experience</p>
      <div class="availability-tag ${p.availability}">
        <span class="dot"></span>
        ${p.availability === 'online' ? 'Available Now' : 'Offline'}
      </div><br>
      <button class="book-btn" onclick="openBookingModal(${p.id},'pharmacist')">
        <i class="fas fa-calendar-check"></i> Book Appointment
      </button>
      <a href="https://wa.me/923441636700" target="_blank" class="book-btn" style="background:#25d366;margin-top:10px">
        <i class="fab fa-whatsapp"></i> Chat Now
      </a>
    </div>
  `;
}

function renderDoctors() {
  const grid = $('#doctors-grid');
  if (grid) grid.innerHTML = doctors.map(d => doctorCardHTML(d)).join('');
}
function renderPharmacists() {
  const grid = $('#pharmacists-grid');
  if (grid) grid.innerHTML = pharmacists.map(p => pharmacistCardHTML(p)).join('');
}

// Full page renderers
function renderAllDoctors(filter = 'All') {
  const grid = $('#all-doctors-grid');
  if (!grid) return;
  const filtered = filter === 'All' ? doctors : doctors.filter(d => d.specialty === filter);
  grid.innerHTML = filtered.length ? filtered.map(d => doctorCardHTML(d)).join('') : '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px">No doctors found for this specialty.</p>';
}
function renderAllPharmacists(filter = 'All') {
  const grid = $('#all-pharmacists-grid');
  if (!grid) return;
  const filtered = filter === 'All' ? pharmacists : pharmacists.filter(p => p.pType === filter);
  grid.innerHTML = filtered.length ? filtered.map(p => pharmacistCardHTML(p)).join('') : '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px">No pharmacists found for this type.</p>';
}

// ─── RENDER: BRANDS ─────────────────────────────────────────────────

function renderBrands() {
  const wrap = $('#brands-scroll');
  if (!wrap) return;
  const tripledItems = [...brands, ...brands, ...brands];
  wrap.innerHTML = tripledItems.map(b => `
    <div class="brand-logo">
      <img src="${b.logo}" alt="${b.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
      <span class="brand-text-fallback" style="display:none;font-weight:700;color:var(--text-light);font-size:1.1rem;">${b.name}</span>
    </div>
  `).join('');
  setTimeout(() => {
    wrap.scrollLeft = wrap.scrollWidth / 3;
  }, 100);
}

// ─── CART SYSTEM ─────────────────────────────────────────────────────

function findProduct(id) {
  return [...products, ...recommendedProducts].find(p => p.id === id);
}
function addToCart(productId) {
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.qty++;
  else cart.push({ id: productId, qty: 1 });
  updateCartBadge(); renderCartSidebar();
  saveState();
  const p = findProduct(productId);
  showToast(`${p.name} added to cart`, 'fa-cart-plus');
}
function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartBadge(); renderCartSidebar();
  saveState();
  showToast('Item removed', 'fa-trash-alt');
}
function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  updateCartBadge(); renderCartSidebar();
  saveState();
}
function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = findProduct(item.id);
    return sum + (p.discountPrice || p.price) * item.qty;
  }, 0);
}
function updateCartBadge() {
  const badge = $('#cart-badge');
  const count = cart.reduce((n, i) => n + i.qty, 0);
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
}
function renderCartSidebar() {
  const itemsWrap = $('#cart-items');
  const totalEl = $('#cart-total-amount');
  if (!itemsWrap) return;
  if (cart.length === 0) {
    itemsWrap.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p></div>';
    if (totalEl) totalEl.textContent = formatPrice(0);
    return;
  }
  itemsWrap.innerHTML = cart.map(item => {
    const p = findProduct(item.id);
    const price = p.discountPrice || p.price;
    return `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${p.image}" alt="${p.name}"></div>
        <div class="cart-item-details">
          <h4>${p.name}</h4>
          <p class="cart-item-price">${formatPrice(price)}</p>
        </div>
        <div class="cart-qty">
          <button onclick="updateQty(${p.id},-1)"><i class="fas fa-minus"></i></button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${p.id},1)"><i class="fas fa-plus"></i></button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${p.id})"><i class="fas fa-times"></i></button>
      </div>
    `;
  }).join('');
  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}
function toggleCart() {
  $('#cart-sidebar')?.classList.toggle('active');
  $('#cart-overlay')?.classList.toggle('active');
}

// ─── WISHLIST ────────────────────────────────────────────────────────

function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx > -1) { wishlist.splice(idx, 1); showToast('Removed from wishlist', 'fa-heart-broken'); }
  else { wishlist.push(productId); showToast('Added to wishlist', 'fa-heart'); }
  saveState();
  updateWishlistBadge();
  renderProducts(); renderDeals(); renderRecommended(); renderAllProducts(); renderWishlist();
}
function updateWishlistBadge() {
  const badge = $('#wishlist-badge');
  if (badge) { badge.textContent = wishlist.length; badge.style.display = wishlist.length > 0 ? 'flex' : 'none'; }
}

function renderWishlist() {
  const grid = $('#wishlist-grid');
  const empty = $('#wishlist-empty');
  if (!grid) return;
  if (wishlist.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  grid.innerHTML = wishlist.map(id => {
    const p = findProduct(id);
    return productCardHTML(p);
  }).join('');
}

// ─── QUICK VIEW MODAL ───────────────────────────────────────────────

function openQuickView(productId) {
  const p = findProduct(productId);
  if (!p) return;
  const modal = $('#quickview-modal');
  if (!modal) return;
  const priceHTML = p.discountPrice
    ? `<span class="current">${formatPrice(p.discountPrice)}</span><span class="original">${formatPrice(p.price)}</span>`
    : `<span class="current">${formatPrice(p.price)}</span>`;
  modal.querySelector('.modal-body').innerHTML = `
    <div class="qv-image"><img src="${p.image}" alt="${p.name}"></div>
    <p class="qv-category">${p.category}</p>
    <h3 class="qv-name">${p.name}</h3>
    <p class="qv-desc">${p.desc}</p>
    <div class="qv-price">${priceHTML}</div>
    <button class="qv-add-btn" onclick="addToCart(${p.id}); closeModal('quickview-modal');">
      <i class="fas fa-cart-plus"></i> Add to Cart
    </button>
  `;
  modal.classList.add('active');
}

// ─── BOOKING MODAL ──────────────────────────────────────────────────

function openBookingModal(personId, type) {
  const person = (type === 'doctor' ? doctors : pharmacists).find(d => d.id === personId);
  if (!person) return;
  selectedSlot = null;
  const modal = $('#booking-modal');
  if (!modal) return;
  modal.querySelector('.modal-body').innerHTML = `
    <div class="booking-profile">
      <div class="booking-avatar"><img src="${person.image}" alt="${person.name}"></div>
      <div class="booking-info">
        <h4>${person.name}</h4>
        <p>${person.qualification}</p>
      </div>
    </div>
    <p class="time-slots-label">Select a time slot:</p>
    <div class="time-slots" id="time-slots">
      ${person.slots.map(s => `<button class="time-slot" onclick="selectSlot(this,'${s}')">${s}</button>`).join('')}
    </div>
    <button class="confirm-booking-btn" onclick="confirmBooking('${person.name}')">
      <i class="fas fa-check-circle"></i> Confirm Booking
    </button>
  `;
  modal.classList.add('active');
}
function selectSlot(el, slot) {
  $$('#time-slots .time-slot').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedSlot = slot;
}
function confirmBooking(name) {
  if (!selectedSlot) { showToast('Please select a time slot', 'fa-exclamation-circle'); return; }
  showToast(`Appointment booked with ${name} at ${selectedSlot}`, 'fa-calendar-check');
  closeModal('booking-modal');
  selectedSlot = null;
}

// ─── UPLOAD PRESCRIPTION ────────────────────────────────────────────

function openUploadModal() {
  const modal = $('#upload-modal');
  if (modal) modal.classList.add('active');
}
function setupUpload() {
  const zone = $('#upload-zone');
  const input = $('#prescription-input');
  const preview = $('#upload-preview');
  const previewImg = $('#upload-preview-img');
  const fileName = $('#upload-file-name');
  if (!zone || !input) return;

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault(); zone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => { if (input.files.length) handleFile(input.files[0]); });

  function handleFile(file) {
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      showToast('Please upload an image or PDF', 'fa-exclamation-circle'); return;
    }
    if (preview) preview.style.display = 'block';
    if (fileName) fileName.textContent = file.name;
    if (previewImg && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => { previewImg.src = e.target.result; };
      reader.readAsDataURL(file);
    } else if (previewImg) {
      previewImg.src = '';
      previewImg.alt = 'PDF file selected';
    }
  }
}
function submitPrescription() {
  const input = $('#prescription-input');
  if (!input || !input.files.length) { showToast('Please select a file first', 'fa-exclamation-circle'); return; }
  showToast('Prescription uploaded successfully! Our pharmacist will review it.', 'fa-check-circle');
  closeModal('upload-modal');
  // Reset
  const preview = $('#upload-preview');
  if (preview) preview.style.display = 'none';
  input.value = '';
}

// ─── MODAL CONTROLS ─────────────────────────────────────────────────

function closeModal(id) {
  const modal = $(`#${id}`);
  if (modal) modal.classList.remove('active');
}

// ─── WHATSAPP CHECKOUT ──────────────────────────────────────────────

function whatsappCheckout() {
  if (cart.length === 0) { showToast('Cart is empty', 'fa-exclamation-circle'); return; }
  let msg = 'Hello, I want to order:\n\n';
  cart.forEach((item, i) => {
    const p = findProduct(item.id);
    const price = p.discountPrice || p.price;
    msg += `${i + 1}. ${p.name} - Qty ${item.qty} (${formatPrice(price * item.qty)})\n`;
  });
  msg += `\nTotal: ${formatPrice(getCartTotal())}`;
  window.open(`https://wa.me/923441636700?text=${encodeURIComponent(msg)}`, '_blank');
}

// ─── MOBILE MENU ────────────────────────────────────────────────────

function toggleMobileMenu() {
  $('#nav-menu')?.classList.toggle('active');
  $('#hamburger')?.classList.toggle('active');
}

function setupMobileDropdowns() {
  $$('.dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
  $$('.dropdown-menu > li > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 && link.nextElementSibling) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
}

// ─── SEARCH LOGIC ───────────────────────────────────────────────────

function setupNavSearch() {
  const navSearch = $('#nav-search');
  const input = $('#nav-search-input');
  const btn = $('#nav-search-btn');
  if (!navSearch || !input || !btn) return;

  const handleSearch = (q) => {
    if (!q.trim() && !window.location.pathname.includes('products.html')) return;
    
    if (window.location.pathname.includes('products.html')) {
      renderAllProducts('All', q);
      const url = new URL(window.location);
      if (q) url.searchParams.set('search', q);
      else url.searchParams.delete('search');
      window.history.pushState({}, '', url);
    } else {
      window.location.href = `products.html?search=${encodeURIComponent(q)}`;
    }
  };

  btn.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && !navSearch.classList.contains('active')) {
      e.preventDefault();
      navSearch.classList.add('active');
      input.focus();
      return;
    }
    handleSearch(input.value);
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(input.value);
  });

  // Collapse on blur or click outside
  document.addEventListener('mousedown', (e) => {
    if (window.innerWidth <= 900 && navSearch.classList.contains('active') && !navSearch.contains(e.target)) {
      navSearch.classList.remove('active');
    }
  });

  // Hotfix: URL params
  const urlParams = new URLSearchParams(window.location.search);
  const searchQ = urlParams.get('search');
  if (searchQ && window.location.pathname.includes('products.html')) {
    input.value = searchQ;
    renderAllProducts('All', searchQ);
    
    // Also fill banner search if exists
    const bannerInput = $('#banner-search-input');
    if (bannerInput) bannerInput.value = searchQ;
  }

  // Banner search Enter listener
  const bannerInput = $('#banner-search-input');
  if (bannerInput) {
    bannerInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleBannerSearch();
    });
  }
}

function handleBannerSearch() {
  const input = $('#banner-search-input');
  if (!input) return;
  const q = input.value;
  renderAllProducts('All', q);
  
  // Sync with nav search input
  const navInput = $('#nav-search-input');
  if (navInput) navInput.value = q;
  
  // Update URL
  const url = new URL(window.location);
  if (q) url.searchParams.set('search', q);
  else url.searchParams.delete('search');
  window.history.pushState({}, '', url);
}

// ─── FILTER BUTTONS (sub-pages) ─────────────────────────────────────

function setupDoctorFilters() {
  const bar = $('#doctor-filter-bar');
  if (!bar) return;
  bar.innerHTML = doctorSpecialties.map(s => `<button class="filter-btn ${s === 'All' ? 'active' : ''}" data-filter="${s}">${s}</button>`).join('');
  bar.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderAllDoctors(e.target.dataset.filter);
  });
}
function setupPharmacistFilters() {
  const bar = $('#pharmacist-filter-bar');
  if (!bar) return;
  bar.innerHTML = pharmacistTypes.map(t => `<button class="filter-btn ${t === 'All' ? 'active' : ''}" data-filter="${t}">${t === 'All' ? 'All' : t + ' Pharmacist'}</button>`).join('');
  bar.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderAllPharmacists(e.target.dataset.filter);
  });
}

function setupProductFilters() {
  const bar = $('#product-filter-bar');
  if (!bar) return;
  
  const categoriesList = ['All', ...categories.map(c => c.name)];
  bar.innerHTML = categoriesList.map(c => `<button class="filter-btn ${c === 'All' ? 'active' : ''}" data-filter="${c}">${c}</button>`).join('');
  
  bar.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update products
    const searchInput = $('#nav-search-input');
    const min = $('#min-price')?.value || 0;
    const max = $('#max-price')?.value || 10000;
    renderAllProducts(e.target.dataset.filter, searchInput?.value || '', null, min, max);
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('category', e.target.dataset.filter);
    window.history.pushState({}, '', url);
  });
}

function applyPriceFilter() {
  const filterBtn = $('#product-filter-bar .filter-btn.active');
  const cat = filterBtn ? filterBtn.dataset.filter : 'All';
  const searchInput = $('#nav-search-input');
  const min = parseInt($('#min-price').value) || 0;
  const max = parseInt($('#max-price').value) || 10000;
  
  renderAllProducts(cat, searchInput?.value || '', null, min, max);
  
  // Update URL
  const url = new URL(window.location);
  url.searchParams.set('min', min);
  url.searchParams.set('max', max);
  window.history.pushState({}, '', url);
}

function initFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  const sub = params.get('subcategory');
  const search = params.get('search');
  const section = params.get('section');
  const min = parseInt(params.get('min')) || 0;
  const max = parseInt(params.get('max')) || 10000;
  const filterVal = params.get('filter'); // for doctors/pharmacists
  
  if (window.location.pathname.includes('products.html')) {
    // Fill inputs
    if (search) $$('#nav-search-input').forEach(i => i.value = search);
    if (min) $('#min-price').value = min;
    if (max) $('#max-price').value = max;
    
    // Highlight active button
    if (cat) {
      const btn = $$('#product-filter-bar .filter-btn').find(b => b.dataset.filter === cat);
      if (btn) {
        $$('#product-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    }
    
    renderAllProducts(sub || cat || 'All', search || '', section, min, max);
  }
  
  if (window.location.pathname.includes('doctors.html') && filterVal) {
    renderAllDoctors(filterVal);
    const btn = $$('#doctor-filter-bar .filter-btn').find(b => b.dataset.filter === filterVal);
    if (btn) {
      $$('#doctor-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  }
  
  if (window.location.pathname.includes('pharmacists.html') && filterVal) {
    renderAllPharmacists(filterVal);
    const btn = $$('#pharmacist-filter-bar .filter-btn').find(b => b.dataset.filter === filterVal);
    if (btn) {
      $$('#pharmacist-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  }
}

// ─── SLIDER SYSTEM ──────────────────────────────────────────────────

function moveSlider(sliderId, direction) {
  const slider = $(`#${sliderId}`);
  if (!slider) return;

  if (slider.classList.contains('horizontal')) {
    const scrollEl = slider.querySelector('.categories-scroll') || slider.querySelector('.products-grid') || slider.querySelector('.brands-scroll');
    if (!scrollEl) return;
    
    // Choose step: exactly one card if it's the categories or brands slider
    const firstCard = scrollEl.firstElementChild;
    let step = scrollEl.clientWidth * 0.8;
    if ((sliderId === 'categories-slider' || sliderId === 'brands-slider') && firstCard) {
      const gap = parseInt(window.getComputedStyle(scrollEl).gap) || 20;
      step = firstCard.clientWidth + gap;
    }

    const currentScroll = scrollEl.scrollLeft;
    
    let newScroll;
    if (direction === 1) { // Next
      newScroll = currentScroll + step;
      // If categories or brands, check if we're reaching the last set
      if ((sliderId === 'categories-slider' || sliderId === 'brands-slider') && currentScroll >= (scrollEl.scrollWidth * 2 / 3)) {
        scrollEl.style.scrollBehavior = 'auto';
        scrollEl.scrollLeft = scrollEl.scrollWidth / 3;
        scrollEl.style.scrollBehavior = 'smooth';
        newScroll = (scrollEl.scrollWidth / 3) + step;
      } else if (currentScroll >= scrollEl.scrollWidth - scrollEl.clientWidth - 20) {
        newScroll = 0;
      }
    } else { // Prev
      newScroll = currentScroll - step;
      if ((sliderId === 'categories-slider' || sliderId === 'brands-slider') && currentScroll <= (scrollEl.scrollWidth / 3)) {
        scrollEl.style.scrollBehavior = 'auto';
        scrollEl.scrollLeft = scrollEl.scrollWidth * 2 / 3;
        scrollEl.style.scrollBehavior = 'smooth';
        newScroll = (scrollEl.scrollWidth * 2 / 3) - step;
      } else if (currentScroll <= 20) {
        newScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
      }
    }

    scrollEl.scrollTo({ left: newScroll, behavior: 'smooth' });
  } else if (slider.classList.contains('vertical')) {
    const grid = slider.querySelector('.products-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.product-card');
    const cardHeight = 140 + 20; // card height (140) + gap (20)
    const visibleCount = 3;
    const totalCount = cards.length;
    
    let currentIdx = parseInt(grid.dataset.index || '0');
    currentIdx += direction;

    if (currentIdx < 0) currentIdx = Math.max(0, totalCount - visibleCount);
    if (currentIdx > totalCount - visibleCount) currentIdx = 0;

    grid.dataset.index = currentIdx;
    grid.style.transform = `translateY(-${currentIdx * cardHeight}px)`;
  }
}

function initAutoSlide() {
  setInterval(() => {
    moveSlider('categories-slider', 1);
    moveSlider('brands-slider', 1);
  }, 1500);
}

// ─── OUTSIDE CLICK HANDLERS ─────────────────────────────────────────

document.addEventListener('click', (e) => {
  if (e.target.id === 'cart-overlay') toggleCart();
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('active');
});

// ─── INIT ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderNavDropdown();
  renderCategories();
  renderProducts();
  renderDeals();
  renderRecommended();
  renderDoctors();
  renderPharmacists();
  renderBrands();
  renderAllProducts();
  renderAllDoctors();
  renderAllPharmacists();
  renderWishlist();
  updateWishlistBadge();
  setupMobileDropdowns();
  setupNavSearch();
  setupUpload();
  setupDoctorFilters();
  setupPharmacistFilters();
  setupProductFilters();
  initFromUrl();
  initAutoSlide();
});
