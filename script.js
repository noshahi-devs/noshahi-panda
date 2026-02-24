document.addEventListener('DOMContentLoaded', () => {
    // --- Auto Year Update ---
    const yearElem = document.getElementById('current-year');
    if (yearElem) yearElem.innerText = new Date().getFullYear();

    // --- Cuisine Categories Data ---
    const cuisines = [
        { name: "Burgers", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop" },
        { name: "Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop" },
        { name: "Biryani", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop" },
        { name: "Healthy", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop" },
        { name: "Asian", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=200&h=200&fit=crop" },
        { name: "Breakfast", img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=200&h=200&fit=crop" },
        { name: "Desi", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop" },
        { name: "Desserts", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop" },
        { name: "Coffee", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&h=200&fit=crop" },
        { name: "Pasta", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=200&h=200&fit=crop" },
        { name: "Sandwiches", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop" }
    ];

    const cuisineScroll = document.querySelector('.cuisine-scroll');
    if (cuisineScroll) {
        cuisines.forEach(c => {
            const item = document.createElement('a');
            item.href = `index.html?category=${encodeURIComponent(c.name)}`;
            item.className = 'cuisine-item text-decoration-none text-dark';
            item.innerHTML = `
                <img src="${c.img}" alt="${c.name}" class="cuisine-img shadow-sm">
                <span class="d-block text-center mt-2">${c.name}</span>
            `;
            cuisineScroll.appendChild(item);
        });
    }

    // --- Cuisine Scrolling Logic ---
    const prevBtn = document.getElementById('prevCuisine');
    const nextBtn = document.getElementById('nextCuisine');

    if (prevBtn && nextBtn) {
        // function to update button states
        const updateScrollButtons = () => {
            const tolerance = 2; // pixel tolerance

            // Check Start
            if (cuisineScroll.scrollLeft <= 0) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            }

            // Check End
            if (cuisineScroll.scrollLeft + cuisineScroll.clientWidth >= cuisineScroll.scrollWidth - tolerance) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            }
        };

        // Scroll Amount (approx 2 items width)
        const scrollAmount = 300;

        prevBtn.addEventListener('click', () => {
            cuisineScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            cuisineScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Update on scroll and resize
        cuisineScroll.addEventListener('scroll', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);

        // Initial Check (allow DOM to render)
        setTimeout(updateScrollButtons, 100);
    }


    // --- Realistic Restaurant Data ---
    // Expose data globally so new pages can access it
    // --- Dynamic Restaurant Data Loading ---
    const defaultRestaurants = [
        {
            id: 1,
            name: "The Burger Club",
            categories: "Burgers • American",
            rating: "4.8",
            reviews: "500+",
            time: "20-30 min",
            fee: "Free Delivery",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop",
            offer: "20% OFF"
        },
        {
            id: 2,
            name: "Pizza Napoletana",
            categories: "Pizza • Italian",
            rating: "4.5",
            reviews: "1k+",
            time: "30-40 min",
            fee: "Rs. 99 Delivery",
            image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=500&h=300&fit=crop",
            offer: "Buy 1 Get 1"
        },
        {
            id: 3,
            name: "Chopstick House",
            categories: "Pan Asian • Chinese",
            rating: "4.3",
            reviews: "200+",
            time: "25-35 min",
            fee: "Free Delivery",
            image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&h=300&fit=crop",
            offer: ""
        },
        {
            id: 4,
            name: "The Green Bowl",
            categories: "Salads • Healthy",
            rating: "4.9",
            reviews: "50+",
            time: "15-25 min",
            fee: "Rs. 50 Delivery",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop",
            offer: "10% OFF"
        },
        {
            id: 5,
            name: "Royal Desi Kitchen",
            categories: "Pakistani • Curry",
            rating: "4.6",
            reviews: "3k+",
            time: "40-50 min",
            fee: "Free Delivery",
            image: "https://images.unsplash.com/photo-1626777553733-bb02998396ec?w=500&h=300&fit=crop",
            offer: "Hot Deal"
        },
        {
            id: 6,
            name: "Frosty Delights",
            categories: "Desserts • Ice Cream",
            rating: "4.7",
            reviews: "800+",
            time: "10-20 min",
            fee: "Rs. 40 Delivery",
            image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&h=300&fit=crop",
            offer: "15% Welcome Offer"
        }
    ];

    function getCombinedRestaurants() {
        const stored = JSON.parse(localStorage.getItem('noshahi_all_restaurants') || '[]');

        // Map stored restaurants (from dashboard) to homepage format
        const mappedStored = stored.map((res, index) => {
            return {
                id: res.id,
                name: res.name,
                categories: res.cuisine || "Multi-cuisine",
                rating: res.rating || "4.5",
                reviews: "New",
                time: "25-35 min",
                fee: "Free Delivery",
                image: res.image || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop",
                offer: "New"
            };
        });

        // Combine default and stored, avoiding duplicates by name
        const all = [...defaultRestaurants];
        mappedStored.forEach(res => {
            if (!all.find(a => a.name.toLowerCase() === res.name.toLowerCase())) {
                all.push(res);
            }
        });
        return all;
    }

    const restaurants = getCombinedRestaurants();
    window.PandaData = { restaurants };

    // --- Grid Rendering Logic ---
    const renderGrid = (containerId, data, isItemView) => {
        const grid = document.getElementById(containerId);
        if (!grid) return;

        grid.innerHTML = '';
        if (data.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center py-5"><h5 class="text-muted">No options found.</h5></div>';
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'col-lg-3 col-md-6 col-12';

            if (isItemView) {
                // RENDER FOOD ITEM CARD
                card.innerHTML = `
                    <div class="res-card h-100">
                        <div class="res-img-wrap">
                            <img src="${item.image}" alt="${item.name}" class="res-img">
                            <div class="res-hover-btn" onclick="addToCart('${item.name}', '${item.price}', '${item.image}', '${item.restaurant}')">
                                <i class="fa-solid fa-plus me-1"></i> Add to Cart
                            </div>
                        </div>
                        <div class="res-body text-center">
                            <h5 class="res-name text-truncate mb-1">${item.name}</h5>
                            <div class="small text-muted mb-2">by ${item.restaurant}</div>
                            <div class="res-meta d-flex justify-content-center align-items-center">
                                <span class="text-warning small"><i class="fa-solid fa-star"></i> ${item.rating}</span>
                                <span class="text-brand-red fw-bold ms-3">${item.price}</span>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // RENDER RESTAURANT CARD (Default)
                card.innerHTML = `
                    <div class="res-card h-100" onclick="window.location.href='restaurant.html?id=${item.id}'">
                        <div class="res-img-wrap">
                            <img src="${item.image}" alt="${item.name}" class="res-img">
                            ${item.offer ? `<span class="badge-offer">${item.offer}</span>` : ''}
                            <div class="res-rating">
                                <i class="fa-solid fa-star text-warning"></i> ${item.rating} <span class="text-muted fw-normal" style="font-size:0.75rem">(${item.reviews})</span>
                            </div>
                            <div class="res-hover-btn">
                                <i class="fa-solid fa-eye me-1"></i> View Menu
                            </div>
                        </div>
                        <div class="res-body text-center">
                            <h5 class="res-name text-truncate">${item.name}</h5>
                            <div class="res-meta mb-1">${item.categories}</div>
                            <div class="res-meta d-flex justify-content-center align-items-center">
                                <span><i class="fa-regular fa-clock me-1"></i> ${item.time}</span>
                                <span class="text-brand-red fw-bold ms-3">Rs. 450+</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            grid.appendChild(card);
        });
    };

    // --- Main Logic ---
    const params = new URLSearchParams(window.location.search);
    const categoryFilter = params.get('category');

    if (categoryFilter) {
        const lowerFilter = categoryFilter.toLowerCase();
        // FILTERED VIEW: Show items
        const matchingRestaurants = restaurants.filter(r =>
            r.categories.toLowerCase().includes(lowerFilter)
        );

        // 1. Get products from localStorage added by restaurants
        const storedProducts = JSON.parse(localStorage.getItem('noshahi_all_products') || '[]');
        const filteredStored = storedProducts.filter(p =>
            (p.category && p.category.toLowerCase().includes(lowerFilter)) ||
            (p.name && p.name.toLowerCase().includes(lowerFilter))
        );

        // 2. Generate hardcoded items (fallback/variety)
        const generatedItems = matchingRestaurants.flatMap(res => {
            return [1, 2, 3].map(i => {
                let itemName = `${categoryFilter} Item ${i}`;
                let itemImg = res.image;

                if (categoryFilter === 'Burgers') {
                    const names = ['Classic Beef Burger', 'Zinger Crunch', 'Mushroom Melt'];
                    itemName = names[i - 1] || `Special Burger ${i}`;
                } else if (categoryFilter === 'Pizza') {
                    const names = ['Margherita Feast', 'Pepperoni Passion', 'BBQ Chicken'];
                    itemName = names[i - 1] || `Pizza ${i}`;
                } else if (categoryFilter === 'Biryani') {
                    const names = ['Chicken Biryani', 'Mutton Special', 'Sindhi Biryani'];
                    itemName = names[i - 1] || `Biryani ${i}`;
                } else if (categoryFilter === 'Breakfast') {
                    const names = ['Pancakes Stack', 'Classic Omelette', 'Full English Breakfast'];
                    const images = [
                        'https://images.unsplash.com/photo-1598214886806-c87b84b707bc?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1599321955726-e04842d99462?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1533089862017-ec13714b62e4?w=500&h=300&fit=crop'
                    ];
                    itemName = names[i - 1] || `Breakfast ${i}`;
                    itemImg = images[i - 1] || res.image;
                } else if (categoryFilter === 'Healthy') {
                    const names = ['Quinoa Power Bowl', 'Avocado Garden Salad', 'Grilled Chicken Caesar'];
                    const images = [
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1511688858344-18350bb96df6?w=500&h=300&fit=crop'
                    ];
                    itemName = names[i - 1] || `Healthy ${i}`;
                    itemImg = images[i - 1] || res.image;
                } else if (categoryFilter === 'Asian') {
                    const names = ['California Rolls', 'Spicy Chicken Ramen', 'Kung Pao Chicken'];
                    const images = [
                        'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=300&fit=crop'
                    ];
                    itemName = names[i - 1] || `Asian ${i}`;
                    itemImg = images[i - 1] || res.image;
                } else if (categoryFilter === 'Desserts') {
                    const names = ['Triple Chocolate Brownie', 'Vanilla Bean Cheesecake', 'Artisan Gelato Scoop'];
                    const images = [
                        'https://images.unsplash.com/photo-1564355808539-22fda35bcd09?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&h=300&fit=crop'
                    ];
                    itemName = names[i - 1] || `Dessert ${i}`;
                    itemImg = images[i - 1] || res.image;
                } else if (categoryFilter === 'Coffee') {
                    const names = ['Signature Caramel Macchiato', 'Double Shot Espresso', 'Fluffy Flat White'];
                    const images = [
                        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=300&fit=crop'
                    ];
                    itemName = names[i - 1] || `Coffee ${i}`;
                    itemImg = images[i - 1] || res.image;
                } else if (categoryFilter === 'Desi') {
                    const names = ['Seekh Kebab Platter', 'Chicken Karahi (Half)', 'Garlic Naan Basket'];
                    const images = [
                        'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1626777553733-bb02998396ec?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=300&fit=crop'
                    ];
                    itemName = names[i - 1] || `Desi ${i}`;
                    itemImg = images[i - 1] || res.image;
                } else if (categoryFilter === 'Pasta') {
                    const names = ['Creamy Alfredo Pasta', 'Spicy Arrabbiata', 'Pesto Genovese Penne'];
                    const images = [
                        'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=500&h=300&fit=crop'
                    ];
                    itemName = names[i - 1] || `Pasta ${i}`;
                    itemImg = images[i - 1] || res.image;
                } else if (categoryFilter === 'Sandwiches') {
                    const names = ['Classic Club Sandwich', 'Chicken Tikka Sub', 'Grilled Cheese Sourdough'];
                    const images = [
                        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1509722747041-619f383b8646?w=500&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=500&h=300&fit=crop'
                    ];
                    itemName = names[i - 1] || `Sandwich ${i}`;
                    itemImg = images[i - 1] || res.image;
                }

                return {
                    name: itemName,
                    price: `Rs. ${350 + (i * 100)}`,
                    restaurant: res.name,
                    image: itemImg,
                    resId: res.id,
                    rating: res.rating
                };
            });
        });

        // 3. Combine stored products and generated items
        const itemData = [
            ...filteredStored.map(p => ({
                name: p.name,
                price: `Rs. ${p.price}`,
                restaurant: p.restaurant,
                image: p.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop",
                resId: p.resId,
                rating: "5.0"
            })),
            ...generatedItems
        ];

        // Update Title
        const titleElem = document.querySelector('.restaurant-section h2');
        if (titleElem) titleElem.innerText = `Top ${categoryFilter} Nearby`;

        // Hide other sections
        // Render the filtered grid

        renderGrid('restaurant-grid', itemData, true);

        setTimeout(() => {
            document.querySelector('.restaurant-section').scrollIntoView({ behavior: 'smooth' });
        }, 100);

    } else {
        // DEFAULT VIEW: Show main restaurants
        renderGrid('restaurant-grid', restaurants, false);
    }

    // --- Search Interaction ---
    const searchBtn = document.querySelector('.search-group button');
    const searchInput = document.querySelector('.search-group input');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const val = searchInput.value.trim().toLowerCase();
            if (!val) {
                searchInput.classList.add('is-invalid');
                setTimeout(() => searchInput.classList.remove('is-invalid'), 1000);
            } else {
                // Filter restaurants based on name or category
                const filteredRes = restaurants.filter(r =>
                    r.name.toLowerCase().includes(val) ||
                    r.categories.toLowerCase().includes(val)
                );

                // Also search in items
                const allProducts = JSON.parse(localStorage.getItem('noshahi_all_products') || '[]');
                const filteredProducts = allProducts.filter(p =>
                    p.name.toLowerCase().includes(val) ||
                    p.category.toLowerCase().includes(val)
                ).map(p => ({
                    name: p.name,
                    price: `Rs. ${p.price}`,
                    restaurant: p.restaurant,
                    image: p.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop",
                    resId: p.resId,
                    rating: "5.0"
                }));

                // Update grid title
                const titleElem = document.querySelector('.restaurant-section h2');
                if (titleElem) titleElem.innerText = `Search Results for "${val}"`;

                // If we have items matching, show items. If only restaurants, show restaurants.
                if (filteredProducts.length > 0) {
                    renderGrid('restaurant-grid', filteredProducts, true);
                } else {
                    renderGrid('restaurant-grid', filteredRes, false);
                }

                // Scroll to grid
                document.getElementById('restaurant-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // --- Hero Search "Find Food" Button ---
    const heroFindBtn = document.querySelector('.hero-content .btn-brand-red');
    const heroInput = document.querySelector('.hero-content .form-control');
    if (heroFindBtn) {
        heroFindBtn.addEventListener('click', () => {
            const val = heroInput.value.trim();
            if (val) {
                searchInput.value = val;
                searchBtn.click();
            } else {
                document.getElementById('restaurant-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // --- Cart Persistence ---
    window.toggleCart = function () {
        document.querySelector('.cart-sidebar').classList.toggle('active');
        document.querySelector('.cart-overlay').classList.toggle('active');
    };

    // Initialize Cart Icon Click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) cartIcon.addEventListener('click', toggleCart);

    let cart = JSON.parse(localStorage.getItem('pandaCart') || '[]');

    window.addToCart = function (name, price, img, restaurant) {
        const existing = cart.find(i => i.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, img, restaurant, quantity: 1 });
        }
        updateCart();
        if (!document.querySelector('.cart-sidebar').classList.contains('active')) {
            toggleCart();
        }
    };

    window.updateCart = function () {
        localStorage.setItem('pandaCart', JSON.stringify(cart));
        const container = document.getElementById('cart-drawer-items');
        const badge = document.querySelector('.cart-badge');
        const totalSpan = document.getElementById('cart-total-price');

        let total = 0;
        let count = 0;
        container.innerHTML = '';

        cart.forEach((item, index) => {
            const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
            total += priceNum * item.quantity;
            count += item.quantity;

            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-item-img shadow-sm">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start mb-1">
                            <h6 class="fw-bold mb-0" style="font-size: 0.95rem;">${item.name}</h6>
                            <button class="btn-close" style="font-size:0.6rem" onclick="removeItem(${index})"></button>
                        </div>
                        <div class="small text-muted mb-3" style="font-size: 0.8rem;">${item.restaurant} • ${item.price}</div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-3">
                                <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                                <span class="fw-bold" style="min-width: 20px; text-align: center;">${item.quantity}</span>
                                <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                            </div>
                            <span class="fw-bold text-dark">Rs. ${priceNum * item.quantity}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        if (cart.length === 0) {
            container.innerHTML = '<div class="text-center py-5"><i class="fa-solid fa-basket-shopping fa-3x text-light mb-3"></i><p class="text-muted">Your basket is empty</p></div>';
        }

        badge.innerText = count;
        totalSpan.innerText = `Rs. ${total}`;
    };

    window.changeQty = function (index, delta) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        updateCart();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Initial population
    setTimeout(updateCart, 100);
});
