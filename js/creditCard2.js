let movements = document.querySelector(".add-transaction-container");
let addTransaction = document.querySelector(".add-transaction");
let cancelBtn = document.querySelector(".btn2");
let endSesion = document.querySelector(".closeSesion");
let sendMovement = document.querySelector(".btn1")
let user = document.querySelector(".user");
let creditCardName = document.querySelector(".credit-card-name");
let availableAmount = document.querySelector(".available-amount");
let userSection = document.querySelector(".user-container");

class Transaction{
    constructor(){
        this.type = '';
        this.description = '';
        this.amount = '';
        this.date = '';
    }

    setType(value){
        this.type = value;
    }

    setDescription(value){
        this.description = value;
    }

    setAmount(value){
        this.amount = value
    }

    setDate(){
        let date = new Date;
        this.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    }
}

class ListTransactions{
    constructor(){
        this.transaction = [];
    }

    addTransaction(value){
        this.transaction.push(value);
    }

    updateLocalStorage(){
        const transactionString = JSON.stringify(this.transaction)
        localStorage.setItem('transactions', transactionString)

        console.log(JSON.parse(localStorage.getItem('transactions')));
    }

    initLocalStorage(){
        if (JSON.parse(localStorage.getItem('transactions') != null)) {
            this.transaction = JSON.parse(localStorage.getItem('transactions'))
        } else {
            this.transaction = []
            this.updateLocalStorage()
        }
    }

    printTransactions() {
        document.querySelector('.information-movements').innerHTML = '';
    
        this.transaction.forEach(addedTransaction => {
            let tr = document.createElement('tr');
            let tdDate = document.createElement('td');
            let tdDescription = document.createElement('td');
            let tdAmount = document.createElement('td');
            let tdType = document.createElement('td');
    
            tdDate.textContent = addedTransaction.date;
            tdDescription.textContent = addedTransaction.description;
            tdAmount.textContent = addedTransaction.amount;
            tdType.textContent = addedTransaction.type;
    
            tr.appendChild(tdDate);
            tr.appendChild(tdDescription);
            tr.appendChild(tdAmount);
            tr.appendChild(tdType);
    
            document.querySelector('.information-movements').appendChild(tr);
        });
    }
    
}

const listOfTransactions = new ListTransactions()
listOfTransactions.initLocalStorage()

let showCardInformation = ()=>{
    if (localStorage.getItem('newLogin') !== null) {
        let userLocalStorage = JSON.parse(localStorage.getItem('usuarios'));
        userLocalStorage.forEach(users => {
            if (users.usuario == localStorage.getItem('newLogin')) {
                user.innerText = users.usuario;
                creditCardName.innerText = users.usuario;
                availableAmount.innerText = users.montoInicial;
                setTimeout(()=>{
                    userSection.style.display = 'none';
                    user.style.display = 'none';
                }, 3000)
            }
        });
    } else {
        window.location = "../html/signIn.html";
    }
}

addTransaction.addEventListener("click", ()=>{
    movements.style.display = "block";
    movements.style.display = "flex";
})

cancelBtn.addEventListener("click", ()=>{
    movements.style.display = "none";
})

endSesion.addEventListener("click",  ()=> {
    localStorage.removeItem("newLogin");
    window.location = "../html/signIn.html"
})


sendMovement.addEventListener("click", ()=> {
    const transaction = new Transaction()
    transaction.setDate()

    let transactionType = document.getElementById("selectMovimiento").value;
    transaction.setType(transactionType)
    console.log(transactionType);

    let transactionDescription = document.getElementById("mensajeEvento").value;
    transaction.setDescription(transactionDescription)
    console.log(transactionDescription);

    let transactionAmount = document.querySelector("#dineroEvento").value;
    transaction.setAmount(transactionAmount)

    listOfTransactions.addTransaction(transaction)

    listOfTransactions.updateLocalStorage()

    listOfTransactions.printTransactions()

    movements.style.display = "none";
})


showCardInformation()