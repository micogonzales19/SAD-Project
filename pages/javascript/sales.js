let cart = [];
let sales = [];


function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) addToCart(product);
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    console.log(cart)
    displayCart();
}

function displayProducts(productArray = products){
    const container1 = document.getElementById("product-list");

    container1.innerHTML = "";

    productArray.forEach(product => {
        const productCard = document.createElement("div");

        productCard.innerHTML=`
        <h3>${product.name}</h3>
        <p>₱ ${product.price}</p>
        <button onclick="handleAddToCart(${product.id})"> + </button>`;

        container1.appendChild(productCard);
    });
}
displayProducts();

function displayCart(){
    const containerCart = document.getElementById("cart-list");

    containerCart.innerHTML = `
        <div class="cart-header">
            <span class="header-name">Product</span>
            <span class="header-qty">Qty</span>
            <span class="header-price">Price</span>
            <span class="header-subtotal">Subtotal</span>
        </div>
    `;

    cart.forEach(item => {
        const itemCard = document.createElement("div");

        itemCard.innerHTML = `
        <span class="item-name">${item.name}</span> 
        <span class="item-qty">× ${item.quantity}</span> 
        <span class="item-price">₱ ${item.price}</span> 
        <span class="item-subtotal">₱ ${item.price * item.quantity}</span>
        `;

        containerCart.appendChild(itemCard);
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: ₱ ${calculateCartTotal()}</strong>`;
    containerCart.appendChild(totalDiv);
}

displayCart();

function updateCartUI(){
    const cartList = document.getElementById("cart-list")

    cartList.innerHTML = "";
}
function cancelOrder(){
    cart = [];
}

function calculateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total;
}

document.addEventListener('DOMContentLoaded', function() {
    const cancelBtn = document.getElementById('cancelOrderBtn');
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm("Do you really want to cancel this order?")) {
                cancelOrder();
                alert("Cancelled");
                console.log(cart);

                displayCart();
            }
        });
    }
});

function completeSale(){
    if (cart.length === 0){
        alert("Cart is empty");
        return;
    }

    const transaction = {
        id: sales.length+1,
        date: new Date().toLocaleDateString(),
        items: [...cart],
        total: calculateCartTotal()
    };

    sales.push(transaction);
    alert("Sale recorded!");

    cart = [];
    displayCart();
    console.log(sales);
}
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

searchForm.addEventListener('submit', function(e){
    e.preventDefault();

    const query = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );

    displayProducts(filteredProducts);
});