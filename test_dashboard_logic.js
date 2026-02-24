
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; },
        get length() { return Object.keys(store).length; },
        key: (i) => Object.keys(store)[i]
    };
})();
const localStorage = localStorageMock;


// Mock data provided in the USER_REQUEST
const noshahi_active_restaurant = { "id": 1771954133016, "name": "Tabish Biryaani", "businessInfo": { "type": "Individual", "licenseNo": "DF56789", "authority": "PFA", "licenseDate": "2026-02-05" }, "owner": { "firstName": "N.K", "lastName": "Noshahi", "email": "dfghjkl@gmail.com", "phone": "+923457890765", "cnic": "34567898765456789" }, "taxInfo": { "ntn": "875457890" }, "bankInfo": { "name": "HBL", "accountNo": "34567890" }, "address": "sdfdgFG", "cuisine": "Fast Food", "operatingDetails": { "priceRange": "Mid-range", "hours": "09:00 - 23:00" }, "password": "Noshahi.000", "date": "2/24/2026", "status": "Approved", "image": "data:image/jpeg;base64,...(truncated)" };

const noshahi_all_orders = [
    {
        id: 5678,
        restaurant: "Tabish Biryaani",
        customer: "Nabeel",
        items: [{ name: "Special Signature Dish", price: "Rs. 850" }],
        total: "Rs. 949",
        date: "2/24/2026",
        status: "Preparing"
    }
];

localStorage.setItem('noshahi_active_restaurant', JSON.stringify(noshahi_active_restaurant));
localStorage.setItem('noshahi_all_orders', JSON.stringify(noshahi_all_orders));
localStorage.setItem('noshahi_menu_1771954133016', JSON.stringify([]));
localStorage.setItem('noshahi_all_products', JSON.stringify([]));

const sellerData = JSON.parse(localStorage.getItem('noshahi_active_restaurant'));

function updateOrderStatus(orderId, newStatus) {
    let allOrders = JSON.parse(localStorage.getItem('noshahi_all_orders') || '[]');
    const orderIndex = allOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        allOrders[orderIndex].status = newStatus;
        localStorage.setItem('noshahi_all_orders', JSON.stringify(allOrders));
        return true;
    }
    return false;
}

function saveDeliveryTime(orderId, time) {
    let allOrders = JSON.parse(localStorage.getItem('noshahi_all_orders') || '[]');
    const orderIndex = allOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        allOrders[orderIndex].deliveryTime = time;
        localStorage.setItem('noshahi_all_orders', JSON.stringify(allOrders));
        return true;
    }
    return false;
}

function addMenuItem(item) {
    const menuKey = `noshahi_menu_${sellerData.id}`;
    let menu = JSON.parse(localStorage.getItem(menuKey) || '[]');
    menu.push(item);
    localStorage.setItem(menuKey, JSON.stringify(menu));

    // Sync with global
    let allProducts = JSON.parse(localStorage.getItem('noshahi_all_products') || '[]');
    allProducts.push({
        ...item,
        restaurant: sellerData.name,
        resId: sellerData.id
    });
    localStorage.setItem('noshahi_all_products', JSON.stringify(allProducts));
}

function toggleAvailability(id) {
    const menuKey = `noshahi_menu_${sellerData.id}`;
    let menu = JSON.parse(localStorage.getItem(menuKey) || '[]');
    const itemIndex = menu.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        menu[itemIndex].status = menu[itemIndex].status === 'Available' ? 'Unavailable' : 'Available';
        localStorage.setItem(menuKey, JSON.stringify(menu));

        let allProducts = JSON.parse(localStorage.getItem('noshahi_all_products') || '[]');
        const prodIndex = allProducts.findIndex(p => p.id === id);
        if (prodIndex !== -1) {
            allProducts[prodIndex].status = menu[itemIndex].status;
            localStorage.setItem('noshahi_all_products', JSON.stringify(allProducts));
        }
        return true;
    }
    return false;
}

function deleteMenuItem(id) {
    const menuKey = `noshahi_menu_${sellerData.id}`;
    let menu = JSON.parse(localStorage.getItem(menuKey) || '[]');
    menu = menu.filter(item => item.id !== id);
    localStorage.setItem(menuKey, JSON.stringify(menu));

    let allProducts = JSON.parse(localStorage.getItem('noshahi_all_products') || '[]');
    allProducts = allProducts.filter(p => p.id !== id);
    localStorage.setItem('noshahi_all_products', JSON.stringify(allProducts));
}

// --- Test Execution ---
console.log("Testing Order Flow...");
updateOrderStatus(5678, 'Ready');
let orders = JSON.parse(localStorage.getItem('noshahi_all_orders'));
console.log("Order 5678 Status:", orders[0].status === 'Ready' ? "PASS" : "FAIL");

saveDeliveryTime(5678, 30);
orders = JSON.parse(localStorage.getItem('noshahi_all_orders'));
console.log("Order 5678 Delivery Time:", orders[0].deliveryTime === 30 ? "PASS" : "FAIL");

console.log("\nTesting Menu Flow...");
const newItem = { id: 123, name: "Test Dish", price: "500", status: "Available" };
addMenuItem(newItem);
let menu = JSON.parse(localStorage.getItem(`noshahi_menu_${sellerData.id}`));
let global = JSON.parse(localStorage.getItem('noshahi_all_products'));
console.log("Add Item (Local):", menu.length === 1 ? "PASS" : "FAIL");
console.log("Add Item (Global):", global.length === 1 ? "PASS" : "FAIL");

toggleAvailability(123);
menu = JSON.parse(localStorage.getItem(`noshahi_menu_${sellerData.id}`));
global = JSON.parse(localStorage.getItem('noshahi_all_products'));
console.log("Toggle Status (Local):", menu[0].status === 'Unavailable' ? "PASS" : "FAIL");
console.log("Toggle Status (Global):", global[0].status === 'Unavailable' ? "PASS" : "FAIL");

deleteMenuItem(123);
menu = JSON.parse(localStorage.getItem(`noshahi_menu_${sellerData.id}`));
global = JSON.parse(localStorage.getItem('noshahi_all_products'));
console.log("Delete Item (Local):", menu.length === 0 ? "PASS" : "FAIL");
console.log("Delete Item (Global):", global.length === 0 ? "PASS" : "FAIL");
