// Product Database
const products = [
    {
        id: 1,
        name: 'Modern Leather Sofa',
        category: 'sofa',
        price: 899,
        description: 'Luxurious leather sofa with comfortable seating for 3',
        image: 'mofern sofa.jpg',
        rating: 4.5,
        reviews: 120
    },
    {
        id: 2,
        name: 'Ergonomic Office Chair',
        category: 'chair',
        price: 349,
        description: 'Premium office chair with lumbar support',
        image: 'office chair.jpg',
        rating: 4.8,
        reviews: 95
    },
    {
        id: 3,
        name: 'Wooden Dining Table',
        category: 'table',
        price: 549,
        description: 'Solid wood dining table for 6 people',
        image: 'wooden table.webp',
        rating: 4.6,
        reviews: 78
    },
    {
        id: 4,
        name: 'Queen Bed Frame',
        category: 'bed',
        price: 599,
        description: 'Modern queen size bed with storage',
        image: 'bed frame.jpg',
        rating: 4.7,
        reviews: 156
    },
    {
        id: 5,
        name: 'L-Shaped Sectional Sofa',
        category: 'sofa',
        price: 1299,
        description: 'Spacious L-shaped sofa with reversible chaise',
        image: 'l sofa.jpg',
        rating: 4.4,
        reviews: 203
    },
    {
        id: 6,
        name: 'Accent Chair',
        category: 'chair',
        price: 299,
        description: 'Stylish accent chair for any room',
        image: 'accent chair.jpg',
        rating: 4.3,
        reviews: 67
    },
    {
        id: 7,
        name: 'Coffee Table',
        category: 'table',
        price: 199,
        description: 'Modern glass and steel coffee table',
        image: 'table.jpg',
        rating: 4.5,
        reviews: 112
    },
    {
        id: 8,
        name: 'Twin Bed',
        category: 'bed',
        price: 349,
        description: 'Comfortable twin bed for kids or guest room',
        image: 'bed.jpg',
        rating: 4.2,
        reviews: 43
    },
    {
        id: 9,
        name: 'Reclining Sofa',
        category: 'sofa',
        price: 799,
        description: 'Comfortable reclining sofa with cup holders',
        image: 'sofaa.webp',
        rating: 4.6,
        reviews: 134
    },
    {
        id: 10,
        name: 'Gaming Chair',
        category: 'chair',
        price: 299,
        description: 'High-back gaming chair with adjustable armrests',
        image: 'chaiir.jpg',
        rating: 4.7,
        reviews: 203
    },
    {
        id: 11,
        name: 'Console Table',
        category: 'table',
        price: 249,
        description: 'Sleek console table for entryways',
        image: 'tablee.jpg',
        rating: 4.4,
        reviews: 89
    },
    {
        id: 12,
        name: 'King Bed',
        category: 'bed',
        price: 799,
        description: 'Luxurious king size bed with premium mattress',
        image: 'beed.jpg',
        rating: 4.8,
        reviews: 267
    }
];

// Shopping Cart
let cart = [];
let currentFilter = 'all';
let selectedProductId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('all');
    setupFilterButtons();
    setupModals();
});

// Load Products
function loadProducts(filter) {
    currentFilter = filter;
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = '★'.repeat(Math.floor(product.rating)) + 
                  (product.rating % 1 >= 0.5 ? '✩' : '');
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/250'">
        <div class="product-content">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">${stars} (${product.reviews} reviews)</div>
            <button class="add-to-cart-btn" onclick="openProductDetails(${product.id})">View Details</button>
        </div>
    `;
    
    return card;
}

// Setup Filter Buttons
function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadProducts(btn.dataset.filter);
        });
    });
}

// Modal Functions
function setupModals() {
    const cartModal = document.getElementById('cartModal');
    const productModal = document.getElementById('productModal');
    const closeButtons = document.querySelectorAll('.close');
    const cartIcon = document.querySelector('.cart-icon');

    cartIcon.addEventListener('click', () => {
        updateCartDisplay();
        cartModal.style.display = 'block';
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.style.display = 'none';
        if (e.target === productModal) productModal.style.display = 'none';
    });
}

// Open Product Details
function openProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    selectedProductId = productId;

    const modal = document.getElementById('productModal');
    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailPrice').textContent = `$${product.price}`;
    
    const stars = '★'.repeat(Math.floor(product.rating)) + 
                  (product.rating % 1 >= 0.5 ? '✩' : '');
    document.getElementById('detailRating').textContent = `${stars} ${product.rating}`;
    document.getElementById('detailReviews').textContent = `(${product.reviews} customer reviews)`;
    
    modal.style.display = 'block';
}

// Add to Cart
function addToCart() {
    if (selectedProductId === null) return;

    const product = products.find(p => p.id === selectedProductId);
    const existingItem = cart.find(item => item.id === selectedProductId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    showNotification('Item added to cart!');
    document.getElementById('productModal').style.display = 'none';
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const total = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
        total.textContent = '0';
        return;
    }

    let totalPrice = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price} x ${item.quantity} = $${itemTotal}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');

    total.textContent = totalPrice.toFixed(2);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Update Cart Count
function updateCartCount() {
    const count = document.querySelector('.cart-count');
    count.textContent = cart.length;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Thank you! Your order of $${total.toFixed(2)} has been placed. You will receive an email confirmation shortly.`);
    
    cart = [];
    updateCartCount();
    document.getElementById('cartModal').style.display = 'none';
    updateCartDisplay();
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Contact Form
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.elements[0].value;
    
    showNotification(`Thank you ${name}! We'll get back to you soon.`);
    form.reset();
}

// Newsletter Form
function handleNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.elements[0].value;
    
    showNotification(`Welcome to our newsletter! Check ${email} for updates.`);
    form.reset();
}

// Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Search Products
function searchProducts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDesc.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

