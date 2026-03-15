function displayTransactions(){
    const containerTransaction = document.getElementById("transaction-list")

    containerTransaction.innerHTML = "";

   sales.forEach(sale => {
        const row = document.createElement("div");
        row.classList.add("list-row");

        row.innerHTML = `
            <div class="sale-id">${sale.id}</div>
            <div class="sale-date">${sale.date}</div>
            <div class="sale-items">${sale.items}</div>
            <div class="sale-total">₱ ${sale.total}</div>
        `;

        containerTransaction.appendChild(row);
    })
}

displayTransactions();

function getBestSellers() {
    const productSales = {};

    sales.forEach(transaction => {
        transaction.items.forEach(item => {
            if (productSales[item.id]) {
                productSales[item.id].quantity += item.quantity;
            } else {
                productSales[item.id] = {
                    name: item.name,
                    quantity: item.quantity,
                    revenue: item.price * item.quantity
                };
            }
        });
    });

    const sorted = Object.values(productSales).sort((a, b) => b.quantity - a.quantity);

    return sorted;
}

function displayBestSellers() {
    const bestSellers = getBestSellers();
    const containerBestSellers = document.getElementById("best-sellers");
    if (!containerBestSellers) return;

    containerBestSellers.innerHTML = "<h3>Best Sellers</h3>";

    bestSellers.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.name} — Sold: ${item.quantity}, Revenue: ₱${item.revenue}`;
        containerBestSellers.appendChild(div);
    });
}

displayBestSellers();