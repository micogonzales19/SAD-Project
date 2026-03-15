
function displayInventory(productArray = products){
    const containerInventory = document.getElementById("inventory-list")
    containerInventory.innerHTML = "";

    productArray.forEach(product => {
        const row = document.createElement("div");
        row.classList.add("list-row");

        row.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-stock">${product.stock}</div>
            <div class="product-price">₱ ${product.price}</div>
            <div class="actions">
                <button class="edit-btn" onclick="editInventory(${product.id})">Edit</button>
                <button class="remove-btn" onclick="openDeleteModal(${product.id})">Remove</button>
            </div>
        `;

        containerInventory.appendChild(row);
    })
}

displayInventory();

let currentEditId = null;

function editInventory(id){

    const product = products.find(p => p.id === id);

    document.getElementById("edit-name").value = product.name;
    document.getElementById("edit-price").value = product.price;
    document.getElementById("edit-stock").value = product.stock;

    currentEditId = id;

    openEditModal();
    
}

function saveEdit(){

    const product = products.find(p => p.id === currentEditId);

    product.name = document.getElementById("edit-name").value;
    product.price = Number(document.getElementById("edit-price").value);
    product.stock = Number(document.getElementById("edit-stock").value);

    displayInventory();

    closeEditModal();
}
function openEditModal(){
    document.getElementById("edit-modal").style.display = "flex";
}


function closeEditModal(){
    document.getElementById("edit-modal").style.display = "none";
}

function openAddModal(){
    document.getElementById("add-modal").style.display = "flex";
}

function closeAddModal(){
    document.getElementById("add-modal").style.display = "none";
}
let currentDeleteId = null;
function openDeleteModal(id){
    currentDeleteId = id;
    document.getElementById("delete-modal").style.display = "flex";
}

function closeDeleteModal(){
    document.getElementById("delete-modal").style.display = "none";
}

function addProduct(){

    const name = document.getElementById("product-name").value;
    const price = Number(document.getElementById("product-price").value);
    const stock = Number(document.getElementById("product-stock").value);

    const newProduct ={
        id: products.length + 1,
        name: name,
        price: price,
        stock: stock
    };

        products.push(newProduct);
        displayInventory();
        closeAddModal();

        document.getElementById("product-name").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-stock").value = "";
}

function removeProduct(){
    products = products.filter(product => product.id !== currentDeleteId);
    displayInventory();
    closeDeleteModal();
}

document.addEventListener("DOMContentLoaded", function(){

    displayInventory();

    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    searchForm.addEventListener('submit', function(e){
        e.preventDefault();

        const query = searchInput.value.toLowerCase().trim();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        displayInventory(filteredProducts);
    });

    searchInput.addEventListener('input', function(){
        if(searchInput.value.trim() === ""){
            displayInventory();
        }
    });
});