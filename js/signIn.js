let userExist = false;
let loginInformation = JSON.parse(localStorage.getItem('usuarios'))

document.getElementById('btn1').addEventListener('click', ()=>{
    if (localStorage.getItem('usuarios') != null) {
        let userName = document.getElementById('user').value;
        let password = document.getElementById('password').value;

        loginInformation.forEach(user => {
            if (user.usuario == userName && user.password == password) {
                localStorage.setItem('newLogin', user.usuario)
                window.location = './creditCard.html'
                userExist = true
            }
        });
        if (userExist == false) {
            console.log(`datos incorrectos o existen campos vacios`);
        } else {
            userExist = true;
        }
    } 
})

let password = document.getElementById("password")
let showPassword = document.getElementById("show");

showPassword.addEventListener("click", show);
function show(){
    if(showPassword.textContent == "Mostrar"){
        password.type = "text"
        showPassword.textContent = "Ocultar"
    }else{
        password.type = "password";
        showPassword.textContent = "Mostrar";
    }
}