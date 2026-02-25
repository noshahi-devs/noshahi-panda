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
                offer: "New",
                address: res.address || ""
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

    // TRENDING DISHES LOGIC
    const renderTrending = () => {
        const trendingGrid = document.getElementById('trending-grid');
        if (!trendingGrid) return;

        // Get all products added by sellers
        const allProducts = JSON.parse(localStorage.getItem('noshahi_all_products') || '[]');

        // If no custom products, use some defaults for demo
        const defaultTrending = [
            { name: "Double Beef Zinger", price: "Rs. 650", restaurant: "The Burger Club", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", rating: "4.9" },
            { name: "Pesto Pasta", price: "Rs. 890", restaurant: "Pizza Napoletana", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400", rating: "4.7" },
            { name: "Dragon Rolls", price: "Rs. 1100", restaurant: "Chopstick House", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400", rating: "4.8" },
            { name: "Quinoa Salad", price: "Rs. 550", restaurant: "The Green Bowl", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", rating: "4.9" }
        ];

        const displayTrending = allProducts.length > 0 ? allProducts.map(p => ({
            name: p.name,
            price: `Rs. ${p.price}`,
            restaurant: p.restaurant,
            image: p.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
            rating: "5.0"
        })).slice(-4).reverse() : defaultTrending; // Show last 4 added

        renderGrid('trending-grid', displayTrending, true);
    };

    if (categoryFilter) {
        // Hide trending on filtered views
        const trendingSection = document.querySelector('.trending-dishes');
        if (trendingSection) trendingSection.classList.add('d-none');

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
        const titleElem = document.getElementById('grid-title');
        if (titleElem) titleElem.innerText = `Top ${categoryFilter} Nearby`;

        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) resetBtn.classList.remove('d-none');

        // Hide other sections
        // Render the filtered grid

        renderGrid('restaurant-grid', itemData, true);

        setTimeout(() => {
            document.querySelector('.restaurant-section').scrollIntoView({ behavior: 'smooth' });
        }, 100);

    } else {
        // DEFAULT VIEW: Show main restaurants
        renderGrid('restaurant-grid', restaurants, false);
        renderTrending();
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
                    r.categories.toLowerCase().includes(val) ||
                    (r.address && r.address.toLowerCase().includes(val))
                );

                // Also search in items
                const allProducts = JSON.parse(localStorage.getItem('noshahi_all_products') || '[]');
                const filteredProducts = allProducts.filter(p =>
                    p.name.toLowerCase().includes(val) ||
                    p.category.toLowerCase().includes(val) ||
                    (p.restaurant && p.restaurant.toLowerCase().includes(val))
                ).map(p => ({
                    name: p.name,
                    price: `Rs. ${p.price}`,
                    restaurant: p.restaurant,
                    image: p.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop",
                    resId: p.resId,
                    rating: "5.0"
                }));

                // Update grid title
                const titleElem = document.getElementById('grid-title');
                if (titleElem) titleElem.innerText = `Search Results for "${val}"`;

                const resetBtn = document.getElementById('reset-filters');
                if (resetBtn) resetBtn.classList.remove('d-none');

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

    // Global reset function
    window.resetSearch = function () {
        if (searchInput) searchInput.value = '';
        if (heroInput) heroInput.value = '';

        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) resetBtn.classList.add('d-none');

        const titleElem = document.getElementById('grid-title');
        if (titleElem) titleElem.innerText = 'Popular Restaurants';

        // Show trending section again
        const trendingSection = document.querySelector('.trending-dishes');
        if (trendingSection) trendingSection.classList.remove('d-none');

        // Clear URL params without reload
        const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({ path: newurl }, '', newurl);

        renderGrid('restaurant-grid', restaurants, false);
        renderTrending();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Hero Search "Find Food" Button ---
    // Already handled by .search-group button listener if they are the same
    // Consolidated above

    // Global Password Toggle Visibility
    window.togglePasswordVisibility = function (inputId, iconId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(iconId);

        if (passwordInput && toggleIcon) {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }
    };

    // --- Cart Persistence ---
    window.toggleCart = function () {
        const sidebar = document.querySelector('.cart-sidebar');
        const overlay = document.querySelector('.cart-overlay');
        if (sidebar && overlay) {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    };

    // Cart icon click listener removed to prevent double-toggling (using onclick in HTML)

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

    // --- Global Premium Signup Popup ---
    window.showSignupOption = function () {
        Swal.fire({
            title: '<h4 class="fw-bold mb-0">Join Noshahi Panda</h4>',
            html: `
                <div class="p-2">
                    <p class="text-muted mb-4 small">Choose your path to get started</p>
                    <div class="d-flex flex-column gap-3">
                        <a href="signup.html" class="signup-role-tile">
                            <div class="tile-icon bg-danger-subtle text-danger">
                                <i class="fa-solid fa-user-tag"></i>
                            </div>
                            <div class="tile-content text-start">
                                <div class="tile-title">As a Customer</div>
                                <p class="tile-desc mb-0 text-muted small">Order the best food near you</p>
                            </div>
                            <i class="fa-solid fa-chevron-right text-muted ms-auto small"></i>
                        </a>
                        
                        <a href="rider-application.html" class="signup-role-tile">
                            <div class="tile-icon bg-primary-subtle text-primary">
                                <i class="fa-solid fa-motorcycle"></i>
                            </div>
                            <div class="tile-content text-start">
                                <div class="tile-title">As a Rider</div>
                                <p class="tile-desc mb-0 text-muted small">Earn money on your schedule</p>
                            </div>
                            <i class="fa-solid fa-chevron-right text-muted ms-auto small"></i>
                        </a>
                        
                        <a href="seller-onboarding.html" class="signup-role-tile">
                            <div class="tile-icon bg-warning-subtle text-warning">
                                <i class="fa-solid fa-store"></i>
                            </div>
                            <div class="tile-content text-start">
                                <div class="tile-title">As a Seller</div>
                                <p class="tile-desc mb-0 text-muted small">Grow your business with us</p>
                            </div>
                            <i class="fa-solid fa-chevron-right text-muted ms-auto small"></i>
                        </a>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-top text-center">
                    <p class="small text-muted mb-0">Already have an account? <a href="login.html" class="text-brand-red fw-bold text-decoration-none">Log in</a></p>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            width: window.innerWidth < 500 ? '92%' : '440px',
            customClass: {
                popup: 'rounded-5 border-0 shadow-lg signup-option-popup',
                title: 'text-start ps-4 pt-4'
            }
        });
    };

    // --- Global Premium Security Popups ---
    window.showChangePasswordPopup = function () {
        Swal.fire({
            title: '<h4 class="fw-bold mb-0">Change Password</h4>',
            html: `
                <div class="p-2 text-start">
                    <p class="text-muted mb-4 small">Update your security credentials</p>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Current Password</label>
                        <input type="password" id="currentPassword" class="form-control rounded-3 border-light-subtle bg-light" placeholder="••••••••">
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">New Password</label>
                        <input type="password" id="newPassword" class="form-control rounded-3 border-light-subtle bg-light" placeholder="Min 6 characters">
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Confirm New Password</label>
                        <input type="password" id="confirmPassword" class="form-control rounded-3 border-light-subtle bg-light" placeholder="Repeat new password">
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Update Password',
            confirmButtonColor: '#E53935',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'rounded-5 border-0 shadow-lg',
                title: 'text-start ps-4 pt-4'
            },
            preConfirm: () => {
                const currentP = document.getElementById('currentPassword').value;
                const newP = document.getElementById('newPassword').value;
                const confirmP = document.getElementById('confirmPassword').value;

                if (!currentP || !newP || !confirmP) {
                    Swal.showValidationMessage('Please fill in all fields');
                    return false;
                }
                if (newP.length < 6) {
                    Swal.showValidationMessage('New password must be at least 6 characters');
                    return false;
                }
                if (newP !== confirmP) {
                    Swal.showValidationMessage('Passwords do not match');
                    return false;
                }
                return { currentP, newP };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Here we would normally call an API. 
                // For this demo, let's just simulate success.
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your password has been updated securely.',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: { popup: 'rounded-5' }
                });
            }
        });
    };

    window.showForgotPasswordPopup = function () {
        Swal.fire({
            title: '<h4 class="fw-bold mb-0">Reset Password</h4>',
            html: `
                <div class="p-2 text-start">
                    <p class="text-muted mb-4 small">Enter your email and we'll send a code</p>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Email Address</label>
                        <input type="email" id="resetEmail" class="form-control rounded-3 border-light-subtle bg-light" placeholder="name@example.com">
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Send Reset Link',
            confirmButtonColor: '#E53935',
            customClass: {
                popup: 'rounded-5 border-0 shadow-lg',
                title: 'text-start ps-4 pt-4'
            },
            preConfirm: () => {
                const email = document.getElementById('resetEmail').value;
                if (!email) {
                    Swal.showValidationMessage('Please entering your email');
                    return false;
                }
                return email;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Link Sent!',
                    text: 'Please check your inbox for reset instructions.',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: { popup: 'rounded-5' }
                });
            }
        });
    };

    window.showOrderHistory = function () {
        const activeCustomer = JSON.parse(localStorage.getItem('noshahi_active_customer'));
        if (!activeCustomer) {
            Swal.fire({
                icon: 'info',
                title: 'Sign In Required',
                text: 'Please log in to see your order history.',
                confirmButtonColor: '#E53935'
            });
            return;
        }

        const allOrders = JSON.parse(localStorage.getItem('noshahi_all_orders') || '[]');
        // Filter by either customerEmail or matching name (for backward compatibility)
        const myOrders = allOrders.filter(o =>
            o.customerEmail === activeCustomer.email ||
            o.customer === `${activeCustomer.firstName} ${activeCustomer.lastName}`
        );

        if (myOrders.length === 0) {
            Swal.fire({
                title: '<h4 class="fw-bold mb-0">No Orders Yet</h4>',
                html: `
                    <div class="text-center py-4">
                        <i class="fa-solid fa-basket-shopping fs-1 text-muted opacity-25 mb-3"></i>
                        <p class="text-muted small">You haven't placed any orders yet. <br>Order something delicious today!</p>
                    </div>
                `,
                confirmButtonText: 'Start Ordering',
                confirmButtonColor: '#E53935',
                customClass: { popup: 'rounded-5 border-0' }
            });
            return;
        }

        let ordersHtml = `
            <div class="p-2 text-start" style="max-height: 450px; overflow-y: auto;">
                <p class="text-muted mb-4 small">Your recent culinary journey with us</p>
                <div class="d-flex flex-column gap-3">
        `;

        myOrders.forEach(order => {
            const statusClass = order.status === 'Delivered' ? 'success' : (order.status === 'Ready' ? 'info' : 'warning');

            ordersHtml += `
                <div class="p-3 rounded-4 border border-light-subtle bg-white shadow-sm">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h6 class="fw-bold mb-0">${order.restaurant}</h6>
                            <span class="small text-muted">${order.date}</span>
                        </div>
                        <span class="badge bg-${statusClass}-subtle text-${statusClass} rounded-pill px-3" style="font-size: 0.7rem;">${order.status}</span>
                    </div>
                    <div class="small text-muted mb-2">
                        <i class="fa-solid fa-utensils me-1"></i> ${order.items.map(i => i.name).join(', ')}
                    </div>
                    <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                        <span class="fw-bold text-brand-red">${order.total}</span>
                        <span class="small text-muted">ID: #${order.id}</span>
                    </div>
                </div>
            `;
        });

        ordersHtml += `
                </div>
            </div>
        `;

        Swal.fire({
            title: '<h4 class="fw-bold mb-0">My Orders</h4>',
            html: ordersHtml,
            showConfirmButton: false,
            showCloseButton: true,
            width: '480px',
            customClass: {
                popup: 'rounded-5 border-0 shadow-lg',
                title: 'text-start ps-4 pt-4'
            }
        });
    };

    // Initial population
    setTimeout(updateCart, 100);
});
