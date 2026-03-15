let currentDebtorId = null;
let currentDebtorDeleteId = null;

function displayDebts(){
    const containerDebts = document.getElementById("debt-list")
    containerDebts.innerHTML = "";

    debtors.forEach(debtor => {
        const debtCard = document.createElement("div");
        debtCard.className = "debt-row";

        debtCard.innerHTML=`
        <button class="delete-btn" onclick="openRemoveDebtorModal(${debtor.id})">×</button>
        <span>${debtor.name}</span>
        <span>₱${debtor.debt}</span>
        <button class="pay-btn" onclick="openPayDebtModal(${debtor.id})">Pay</button>
        <button class="add-btn" onclick="openAddDebtModal(${debtor.id})">Add</button>
`       ;

        containerDebts.appendChild(debtCard);
    })  
}

displayDebts();



function payDebt(id){

    const payment = Number(document.getElementById("pay-debt").value) ;

    const debtor = debtors.find(d => d.id === currentDebtorId);

    if (debtor && payment > 0 && debtor.debt >=payment){
        debtor.debt = debtor.debt - payment;
    }

    displayDebts();

    closePayDebtModal();


}

function openPayDebtModal(id){
    currentDebtorId = id;
    document.getElementById("payDebt-modal").style.display = "flex";
}

function closePayDebtModal(){
    document.getElementById("payDebt-modal").style.display = "none";
}

function addDebt(){
    const additional = Number(document.getElementById("add-debt").value) ;

    const debtor = debtors.find(d => d.id === currentDebtorId);

    if (debtor && additional > 0){
        debtor.debt = debtor.debt + additional;
    }

    displayDebts();

    closeAddDebtModal();

}
function openAddDebtModal(id){
    currentDebtorId = id;
    document.getElementById("addDebt-modal").style.display = "flex";
}

function closeAddDebtModal(){
    document.getElementById("addDebt-modal").style.display = "none";
}

function openAddDebtorModal(){
    document.getElementById("addDebtor-modal").style.display = "flex";
}

function closeAddDebtorModal(){
    document.getElementById("addDebtor-modal").style.display = "none";
}



function addDebtor(){
    const name = document.getElementById("debtor-name").value;
    const debt = Number(document.getElementById("debtor-debt").value);

    const nameExists = debtors.some(d => d.name.toLowerCase() === name.toLowerCase());

if(nameExists){
    alert("Debtor already exists");
} else {


    const newDebtor ={
        id: debtors.length + 1,
        name: name,
        debt: debt
    };

    

        debtors.push(newDebtor);
        displayDebts();
        closeAddDebtorModal();

        document.getElementById("debtor-name").value = "";
        document.getElementById("debtor-debt").value = "";
}
}

function removeDebtor(){
    debtors = debtors.filter(debtor => debtor.id !== currentDebtorDeleteId);
    displayDebts();
    closeRemoveDebtorModal();
}

function openRemoveDebtorModal(id){
    currentDebtorDeleteId = id;
    document.getElementById("removeDebtor-modal").style.display = "flex";
}

function closeRemoveDebtorModal(){
    document.getElementById("removeDebtor-modal").style.display = "none";
}
