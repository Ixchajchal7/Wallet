let user = document.querySelector(".user");
let endSesion = document.querySelector(".closeSesion");
let userSection = document.querySelector(".user-container");
let creditCardName = document.querySelector(".credit-card-name");
let availableAmount = document.querySelector(".available-amount");
let sendMovement = document.querySelector(".btn1")
let cancelBtn = document.querySelector(".btn2");
let addTransaction = document.querySelector(".add-transaction");
let movements = document.querySelector(".add-transaction-container");
let hideNoneDetails = document.querySelector(".information-movements");
let resume = document.querySelector(".movements-container");
let transactionType = document.querySelector("#selectMovimiento");
let transactionDescription = document.querySelector("#mensajeEvento");
let transactionAmount = document.querySelector("#dineroEvento");
let transactions = [];
let date = new Date;


function Transaction(type, description, amount){
    this.type = type;
    this.description = description;
    this.amount = amount;
    this.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
}

function newTransaction(transactionType, transactionDescription, transactionAmount){
    let newTransaction = new Transaction(transactionType, transactionDescription, transactionAmount) ;
    transactions.unshift(newTransaction);
    

    
        let type = "profit";
        let sign = "+";
        if (transactionType == "gasto") {
            type = "spending";
            sign = "-";
        }

        let transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction');
        transactionDiv.innerHTML = `
            <div>
                <p>${transactionDescription}</p>
                <p>${date}</p>
            <div>
            <p class="amount ${type}">${sign} ${transactionAmount}</p>
        `;
        resume.appendChild(transactionDiv);
        
        const updateStorage = JSON.stringify(transactions)
        localStorage.setItem('transactions', updateStorage)
    
}

let initLocalStorage = ()=>{
    if (JSON.parse(localStorage.getItem('transactions') != null)) {
        transactions = JSON.parse(localStorage.getItem('transactions'))
    } else {
        transactions = []
    }
}

initLocalStorage()

if (window.localStorage.getItem("newLogin") !== null) {
    let userStorage = JSON.parse(window.localStorage.getItem("usuarios"));
    userStorage.forEach(users => {
        if (users.usuario == window.localStorage.getItem("newLogin")) {
            user.innerText = users.usuario    
            creditCardName.innerText = users.usuario;
            availableAmount.innerText = users.montoInicial;
            setTimeout(()=> {
                userSection.style.display = "none";
                user.style.display = "none";
            },3000)
        }
    });
}else{
    window.location = "../html/signIn.html";
}



sendMovement.addEventListener("click", ()=> {
    newTransaction(transactionType.value, transactionDescription.value, transactionAmount.value);
    movements.style.display = "none";
})

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




