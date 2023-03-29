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
        this.saldo = 0;
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
        if (JSON.parse(localStorage.getItem('transactions')) != null) {
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

    creditBalance(userName) {

            let amountType = this.transaction;
            let creditTransaction = amountType.filter(elemento2 => elemento2.type === 'credito')
    
            let usersInfo = JSON.parse(localStorage.getItem('usuarios'));
            console.log(usersInfo);
    
            let creditPay;
    
            for (let i = 0; i < usersInfo.length; i++) {
                if (usersInfo[i].usuario == userName) {
                    creditPay = Number(usersInfo[i].montoInicial);
                    break;
                }
                
            }
    
            for (let i = 0; i < creditTransaction.length; i++) {
                const element = Number(creditTransaction[i].amount);
                creditPay += parseFloat(element);
            }

            // let amountType = this.transaction
            let balanceTransaction = amountType.filter(elemento => elemento.type === 'gasto');
    
    
            let balanceGastos = 0;
            for (let i = 0; i < balanceTransaction.length; i++) {
                const monto = Number(balanceTransaction[i].amount);
                balanceGastos += monto;
            }
            creditPay = creditPay - balanceGastos;


            let creditAmount = document.getElementsByClassName('available-amount')[0];
            creditAmount.textContent = `Q${creditPay.toLocaleString('en', {useGrouping: true})}`;

            let balanceAmount = document.getElementsByClassName('balance-amount')[0];
            balanceAmount.textContent = `Q${this.saldo.toLocaleString('en', {useGrouping: true})}`;

    }

    

    updateBalanceAmount(){
        let amountType = this.transaction
        let balanceTransaction = amountType.filter(elemento => elemento.type === 'gasto');


        let balanceGastos = 0;
        for (let i = 0; i < balanceTransaction.length; i++) {
            const monto = Number(balanceTransaction[i].amount);
            balanceGastos += monto;
        }
        let balanceAmount = document.getElementsByClassName('balance-amount')[0];
        balanceAmount.textContent = `Q${balanceGastos.toLocaleString('en', {useGrouping: true})}`;
    }

    
    
    updateStates(){
        this.updateLocalStorage()
        this.printTransactions()
        
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


    let transactionDescription = document.getElementById("mensajeEvento").value;
    transaction.setDescription(transactionDescription)


    let transactionAmount = document.querySelector("#dineroEvento").value;
    transaction.setAmount(transactionAmount)
    if (transactionType == 'credito') {
        if (listOfTransactions.saldo != 0) {
            listOfTransactions.saldo = listOfTransactions.saldo - Number(transactionAmount)

        }
    }else{
        listOfTransactions.saldo = listOfTransactions.saldo + Number(transactionAmount)

    }

    listOfTransactions.addTransaction(transaction)

    listOfTransactions.updateStates();

    listOfTransactions.creditBalance(localStorage.getItem('newLogin'), transactionType);
    

    // listOfTransactions.updateBalanceAmount(transactionType);




    movements.style.display = "none";
})


showCardInformation()