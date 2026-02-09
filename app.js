// Mock Data Arrays
const categories = [
    { id: 1, name: "Pizza", image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=400" },
    { id: 2, name: "Burgers", image: "https://images.deliveryhero.io/image/fd-pk/LH/v6wi-hero.jpg?width=400" },
    { id: 3, name: "Desi", image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=400" },
    { id: 4, name: "Cakes", image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=400" },
    { id: 5, name: "Chinese", image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=400" },
    { id: 6, name: "Fast Food", image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=400" }
];

const restaurants = [
    {
        id: 1,
        name: "Panda Kitchen",
        cuisine: "International • Burgers",
        rating: 4.5,
        reviews: "500+",
        deliveryTime: "20-30 min",
        image: "https://images.deliveryhero.io/image/foodpanda/home-vendor-pk.jpg?width=500",
        discount: "20% OFF"
    },
    {
        id: 2,
        name: "Noshahi Gourmet",
        cuisine: "Pakistani • Desserts",
        rating: 4.8,
        reviews: "200+",
        deliveryTime: "15-25 min",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=500",
        discount: "Free Delivery"
    },
    {
        id: 3,
        name: "Pizza NDI",
        cuisine: "Italian • Pizza",
        rating: 4.2,
        reviews: "1000+",
        deliveryTime: "30-45 min",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=500",
        discount: "Rs. 100 OFF"
    },
    {
        id: 4,
        name: "Burger Lab",
        cuisine: "Fast Food • American",
        rating: 4.6,
        reviews: "800+",
        deliveryTime: "10-20 min",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/v6wi-hero.jpg?width=500",
        discount: "Flash Deal"
    },
    {
        id: 5,
        name: "Shahi Haleem",
        cuisine: "Pakistani • Traditional",
        rating: 4.9,
        reviews: "1500+",
        deliveryTime: "25-35 min",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=500",
        discount: "15% OFF"
    },
    {
        id: 6,
        name: "Chinese Dragon",
        cuisine: "Asian • Noodles",
        rating: 4.3,
        reviews: "300+",
        deliveryTime: "35-50 min",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=500",
        discount: "Free Delivery"
    },
    {
        id: 7,
        name: "Sweet Panda",
        cuisine: "Bakery • Cakes",
        rating: 4.7,
        reviews: "450+",
        deliveryTime: "15-20 min",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/v2le-hero.jpg?width=500",
        discount: "Buy 1 Get 1"
    },
    {
        id: 8,
        name: "Steak House NDI",
        cuisine: "Steak • Premium",
        rating: 4.6,
        reviews: "600+",
        deliveryTime: "40-55 min",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/v6wi-hero.jpg?width=500",
        discount: "Premium Deal"
    }
];

const martItems = [
    { name: "Fresh Milk", price: "Rs. 250", img: "https://images.deliveryhero.io/image/fd-pk/Products/12345.jpg?width=200", cat: "Dairy" },
    { name: "Brown Bread", price: "Rs. 120", img: "https://images.deliveryhero.io/image/fd-pk/Products/12346.jpg?width=200", cat: "Bakery" },
    { name: "Farm Eggs", price: "Rs. 300", img: "https://images.deliveryhero.io/image/fd-pk/Products/12347.jpg?width=200", cat: "Dairy" },
    { name: "Cooking Oil", price: "Rs. 1500", img: "https://images.deliveryhero.io/image/fd-pk/Products/12348.jpg?width=200", cat: "Grocery" },
    { name: "Red Apples", price: "Rs. 400", img: "https://images.deliveryhero.io/image/fd-pk/Products/12345.jpg?width=200", cat: "Fruits" },
    { name: "Fresh Carrots", price: "Rs. 150", img: "https://images.deliveryhero.io/image/fd-pk/Products/12346.jpg?width=200", cat: "Vegetables" },
    { name: "Pepsi 1.5L", price: "Rs. 180", img: "https://images.deliveryhero.io/image/fd-pk/Products/12347.jpg?width=200", cat: "Beverages" },
    { name: "Oreo Family Pack", price: "Rs. 200", img: "https://images.deliveryhero.io/image/fd-pk/Products/12348.jpg?width=200", cat: "Snacks" },
    { name: "Juicy Oranges", price: "Rs. 350", img: "https://images.deliveryhero.io/image/fd-pk/Products/12345.jpg?width=200", cat: "Fruits" },
    { name: "Premium Tea", price: "Rs. 650", img: "https://images.deliveryhero.io/image/fd-pk/Products/12346.jpg?width=200", cat: "Beverages" },
    { name: "Plain Yogurt", price: "Rs. 180", img: "https://images.deliveryhero.io/image/fd-pk/Products/12347.jpg?width=200", cat: "Dairy" },
    { name: "Basmati Rice 5kg", price: "Rs. 2500", img: "https://images.deliveryhero.io/image/fd-pk/Products/12348.jpg?width=200", cat: "Grocery" }
];

let cart = JSON.parse(localStorage.getItem('panda_cart')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    const page = window.location.pathname.split("/").pop();

    if (page === 'index.html' || page === '') {
        renderCategories();
        renderRestaurants(restaurants);
        setupSearch();
    } else if (page === 'offers.html') {
        renderOffers(restaurants.filter(r => r.discount));
    } else if (page === 'pandamart.html') {
        renderPandamart();
    } else if (page === 'restaurant-details.html') {
        renderRestaurantDetails();
    }
});

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split("/").pop();

    if (page === 'index.html' || page === '') {
        renderCategories();
        renderRestaurants(restaurants);
    } else if (page === 'offers.html') {
        renderOffers(restaurants.filter(r => r.discount));
    } else if (page === 'pandamart.html') {
        renderPandamart();
    } else if (page === 'restaurant-details.html') {
        renderRestaurantDetails();
    }
    updateCartUI();
});

// Render Functions
function renderCategories() {
    const container = document.getElementById('category-container');
    container.innerHTML = categories.map(cat => `
        <div class="col-3 col-md-2">
            <div class="category-item">
                <div class="category-img-wrapper mb-2">
                    <img src="${cat.image}" class="category-img-3d" alt="${cat.name}">
                </div>
                <p class="fw-bold small mb-0">${cat.name}</p>
            </div>
        </div>
    `).join('');
}

function renderRestaurants(data = restaurants) {
    const container = document.getElementById('restaurant-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><h3 class="text-muted">No restaurants found 🐼</h3></div>`;
        return;
    }

    container.innerHTML = data.map(res => `
        <div class="col-12 col-md-6 col-lg-3">
            <div class="restaurant-card card-3d h-100 p-0 overflow-hidden" onclick="window.location.href='restaurant-details.html?id=${res.id}'">
                <div class="position-relative">
                    <img src="${res.image}" class="card-img-top" alt="${res.name}" style="height: 200px; object-fit: cover;">
                    <div class="delivery-badge py-1 px-3 fw-bold small">
                        <i class="bi bi-clock-fill text-ndi-red me-1"></i> ${res.deliveryTime}
                    </div>
                    ${res.discount ? `<div class="badge bg-ndi-orange position-absolute bottom-0 start-0 m-3 px-3 py-2 shadow-sm">${res.discount}</div>` : ''}
                </div>
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="fw-900 mb-0">${res.name}</h5>
                        <div class="rating-badge px-2 py-1 small">
                            <i class="bi bi-star-fill text-dark me-1"></i>${res.rating}
                        </div>
                    </div>
                    <p class="text-muted small mb-3">${res.cuisine}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-ndi-red fw-bold small">Order Now <i class="bi bi-arrow-right"></i></span>
                        <i class="bi bi-heart text-secondary"></i>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderOffers(data = restaurants.filter(r => r.discount)) {
    const container = document.getElementById('offers-container');
    if (!container) return;
    container.innerHTML = data.map(res => `
        <div class="col-12 col-md-6">
            <div class="card-3d d-flex p-0 overflow-hidden mb-4" onclick="window.location.href='restaurant-details.html?id=${res.id}'">
                <img src="${res.image}" style="width: 150px; object-fit: cover;">
                <div class="p-4 flex-grow-1">
                    <span class="badge bg-ndi-red mb-2">${res.discount || 'Special Offer'}</span>
                    <h5 class="fw-900">${res.name}</h5>
                    <p class="text-muted small mb-0">${res.cuisine}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPandamart() {
    const container = document.getElementById('mart-container');
    if (!container) return;
    container.innerHTML = martItems.map(item => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card-3d p-3 text-center h-100 d-flex flex-column">
                <img src="${item.img}" class="img-fluid mb-3 rounded-3" style="height: 120px; object-fit: contain;">
                <h6 class="fw-bold mb-1">${item.name}</h6>
                <p class="text-ndi-red fw-900 mb-2">${item.price}</p>
                <div class="mt-auto">
                    <button class="btn btn-ndi-red btn-sm w-100 rounded-pill" onclick="addToCart('${item.name}', ${item.price.replace('Rs. ', '')})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderRestaurantDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const res = restaurants.find(r => r.id == id) || restaurants[0];

    document.getElementById('res-name').innerText = res.name;
    document.getElementById('res-cuisine').innerText = res.cuisine;
    document.getElementById('res-image').src = res.image;

    const menuContainer = document.getElementById('menu-container');
    const menuItems = [
        { name: "NDI Special Burger", desc: "A premium 3D burger with extra cheese, caramelized onions, and our secret NDI sauce.", price: "Rs. 850" },
        { name: "Panda Wings", desc: "Crispy fried wings with honey glazed sauce and a hint of spice.", price: "Rs. 450" },
        { name: "Techie Pizza", desc: "For the developers who love olives, jalapenos, and double pepperoni.", price: "Rs. 1200" },
        { name: "Code-Red Pasta", desc: "Spicy arrabbiata pasta with parmesan and fresh basil.", price: "Rs. 750" },
        { name: "Glassmorphism Salad", desc: "Fresh greens with a transparent-like lemon dressing.", price: "Rs. 550" },
        { name: "Cloud Refreshment", desc: "Cooling mint lemonade with a splash of blue curacao.", price: "Rs. 300" }
    ];

    menuContainer.innerHTML = menuItems.map(item => `
        <div class="col-12 mb-4">
            <div class="card-3d p-4 d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="fw-bold mb-1">${item.name}</h5>
                    <p class="text-muted small mb-2">${item.desc}</p>
                    <span class="text-ndi-red fw-900">${item.price}</span>
                </div>
                <button class="btn btn-ndi-red rounded-circle p-2" onclick="addToCart('${item.name}', ${item.price.replace('Rs. ', '')})">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Search & Filtering Logic
function setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = restaurants.filter(r =>
                r.name.toLowerCase().includes(query) ||
                r.cuisine.toLowerCase().includes(query)
            );
            renderRestaurants(filtered);
        });
    }
}

function filterBy(type) {
    let filtered = [...restaurants];
    if (type === 'rating') {
        filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (type === 'deals') {
        filtered = filtered.filter(r => r.discount);
    } else if (type === 'fast') {
        filtered = filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    }
    renderRestaurants(filtered);
}

// Cart Persistence Logic
function addToCart(itemName, price = 500) {
    const item = { name: itemName, price: price, id: Date.now() };
    cart.push(item);
    localStorage.setItem('panda_cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`Added ${itemName} to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('panda_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(el => el.innerText = cart.length);

    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = `<div class="text-center py-5 text-muted"><i class="bi bi-cart-x fs-1 mb-3 d-block"></i><p>Your cart is empty!</p></div>`;
        } else {
            let total = 0;
            const itemsHtml = cart.map(item => {
                total += item.price;
                return `
                    <div class="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom">
                        <div>
                            <h6 class="mb-0 fw-bold small">${item.name}</h6>
                            <span class="text-ndi-red x-small fw-bold">Rs. ${item.price}</span>
                        </div>
                        <button class="btn btn-sm text-danger" onclick="removeFromCart(${item.id})"><i class="bi bi-trash"></i></button>
                    </div>
                `;
            }).join('');

            cartContainer.innerHTML = `
                ${itemsHtml}
                <div class="mt-4 pt-3 border-top">
                    <div class="d-flex justify-content-between fw-bold mb-3">
                        <span>Total:</span>
                        <span class="text-ndi-red">Rs. ${total}</span>
                    </div>
                </div>
            `;
        }
    }
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'glass-effect p-3 rounded-3 shadow-lg position-fixed bottom-0 start-50 translate-middle-x mb-4 z-3 fw-bold text-ndi-red border-start border-4 border-ndi-red shake-item';
    toast.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function placeOrder() {
    if (cart.length === 0) {
        showToast("Your cart is empty! 🐼");
        return;
    }

    // Close the checkout modal first
    const checkoutModalEl = document.getElementById('checkoutModal');
    if (checkoutModalEl) {
        const modalInstance = bootstrap.Modal.getInstance(checkoutModalEl);
        if (modalInstance) modalInstance.hide();
    }

    // Show the success modal
    const successModalEl = document.getElementById('orderSuccessModal');
    if (successModalEl) {
        const successModal = new bootstrap.Modal(successModalEl);
        successModal.show();
    } else {
        // Fallback to alert if modal doesn't exist on page
        alert("Order Placed Successfully! Noshahi Panda is on the way. 🐼");
        window.location.href = 'index.html';
    }

    cart = [];
    localStorage.removeItem('panda_cart');
    updateCartUI();
}
