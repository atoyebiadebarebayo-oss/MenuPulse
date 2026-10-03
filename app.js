// --- MENU DATA ---
const menuItems = [
  {
    id: '1',
    name: "Ade's Signature Jollof & Grilled Chicken",
    category: 'mains',
    price: 15.00,
    badge: 'Chef Ade Special',
    desc: 'Smoky party jollof rice served with plantains and Ade roasted spiced chicken.'
  },
  {
    id: '2',
    name: "Ade's Spicy Peppered Beef Pizza",
    category: 'pizza',
    price: 18.50,
    badge: 'Ade Hot Pick',
    desc: 'Mozzarella, slow-cooked tender peppered beef, bell peppers, and chili oil.'
  },
  {
    id: '3',
    name: "Ade's Seafood Alfredo Pasta",
    category: 'mains',
    price: 21.00,
    badge: 'Popular',
    desc: 'Creamy parmesan fettuccine loaded with grilled prawns and calamari.'
  },
  {
    id: '4',
    name: "Ade Supreme Meat Lovers Pizza",
    category: 'pizza',
    price: 19.50,
    badge: 'Best Seller',
    desc: 'Pepperoni, sausage, smoked bacon, garlic drizzle, and fresh oregano.'
  },
  {
    id: '5',
    name: "Ade's Citrus Chilled Mocktail",
    category: 'drinks',
    price: 5.50,
    badge: 'Cold & Refreshing',
    desc: 'Freshly squeezed orange, passion fruit, lime, and sparkling mint water.'
  },
  {
    id: '6',
    name: 'Iced Espresso Delight',
    category: 'drinks',
    price: 4.50,
    badge: 'Ade Cold Brew',
    desc: 'Double shot espresso served over ice with vanilla cream.'
  },
  {
    id: '7',
    name: "Ade's Melted Chocolate Lava Cake",
    category: 'desserts',
    price: 9.00,
    badge: 'House Made',
    desc: 'Warm cocoa sponge with oozing chocolate center and vanilla bean gelato.'
  }
];

// --- STATE ---
let cart = JSON.parse(localStorage.getItem('menupulse_cart')) || [];
let activeCategory = 'all';

// --- DOM ELEMENTS ---
const menuGrid = document.getElementById('menu-grid');
const menuSearch = document.getElementById('menu-search');
const catBtns = document.querySelectorAll('.cat-btn');

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartModal = document.getElementById('cart-modal');

const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const sendWhatsappOrderBtn = document.getElementById('send-whatsapp-order-btn');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderMenu();
  updateCartUI();
});

// --- THEME ENGINE ---
function initTheme() {
  if (localStorage.getItem('menupulse_theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
  }
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('menupulse_theme', isDark ? 'dark' : 'light');
  themeToggleBtn.querySelector('i').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// --- RENDER MENU ---
function renderMenu() {
  const query = menuSearch.value.toLowerCase();
  menuGrid.innerHTML = '';

  const filtered = menuItems.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    menuGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No Ade dishes found matching your query.</p>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.innerHTML = `
      <div>
        ${item.badge ? `<span class="item-badge">${item.badge}</span>` : ''}
        <h3 class="item-title">${escapeHTML(item.name)}</h3>
        <p class="item-desc">${escapeHTML(item.desc)}</p>
      </div>
      <div class="item-footer">
        <span class="item-price">$${item.price.toFixed(2)}</span>
        <button class="add-btn" onclick="addToCart('${item.id}')">
          <i class="fa-solid fa-plus"></i> Add
        </button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

// --- CATEGORY & SEARCH LISTENERS ---
catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderMenu();
  });
});

menuSearch.addEventListener('input', renderMenu);

// --- CART FUNCTIONS ---
window.addToCart = function(id) {
  const item = menuItems.find(m => m.id === id);
  if (!item) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
};

window.changeQty = function(id, delta) {
  const existing = cart.find(c => c.id === id);
  if (!existing) return;

  existing.qty += delta;
  if (existing.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }

  updateCartUI();
};

function updateCartUI() {
  localStorage.setItem('menupulse_cart', JSON.stringify(cart));

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.innerText = totalQty;
  cartSubtotal.innerText = `$${subtotal.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your cart is currently empty.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-info">
        <strong>${escapeHTML(item.name)}</strong>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(el);
  });
}

// --- MODAL CONTROLS ---
openCartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeCartBtn.addEventListener('click', () => cartModal.classList.remove('active'));
window.addEventListener('click', (e) => {
  if (e.target === cartModal) cartModal.classList.remove('active');
});

// --- WHATSAPP ORDER ROUTER ---
sendWhatsappOrderBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Please add items to your cart before sending an order.');
    return;
  }

  const tableNum = document.getElementById('table-num').value || 'Ade Customer';
  const notes = document.getElementById('special-notes').value || 'None';
  
  // WhatsApp International Format for 07040416469
  const phone = '2347040416469';

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  let msg = `🍽️ *NEW ORDER — Ade Bistro*\n`;
  msg += `📍 *Customer/Table*: ${tableNum}\n`;
  msg += `------------------------------\n`;

  cart.forEach(item => {
    msg += `• ${item.qty}x ${item.name} ($${(item.price * item.qty).toFixed(2)})\n`;
  });

  msg += `------------------------------\n`;
  msg += `💰 *Total Amount*: $${subtotal.toFixed(2)}\n`;
  msg += `📝 *Notes for Ade*: ${notes}\n\n`;
  msg += `Please confirm and prepare my order!`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
});

// --- UTILITY ---
function escapeHTML(str) {
  return str ? str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  ) : '';
}