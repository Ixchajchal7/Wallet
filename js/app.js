let userExist = true;


class Users{
    constructor(){
        this.id = ''
        this.usuario = ''
        this.password = ''
        this.montoInicial = ''
    }

    setID(){
        const getRandomInt = (min, max)=>{
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min) + min);
        }
        this.id = getRandomInt(0, 1000000000)
    }

    setUsuario(value){
        this.usuario = value;
    }

    setPassword(value){
        this.password = value
    }

    setMontoInicial(value){
        this.montoInicial = value
    }

    getAll(){
        return{
            id: this.id,
            usuario: this.usuario,
            password: this.password,
            montoInicial: this.montoInicial,
        }
    }

    
}

class ListUsers{
    constructor(){
        this.lista = [];
    }

    addUser(value){
        this.lista.push(value)
        
    }

    updateLocalStorage(){
        const userString = JSON.stringify(this.lista)
        localStorage.setItem('usuarios', userString)

        console.log(JSON.parse(localStorage.getItem('usuarios')));
    }

    initLocalStorage(){
        if (JSON.parse(localStorage.getItem('usuarios') != null)) {
            this.lista = JSON.parse(localStorage.getItem('usuarios'))
        } else {
            this.lista = []
            this.updateLocalStorage()
        }
    }
    validateUsers(){
        this.lista.forEach(usuario =>{

            if (usuario.usuario == document.getElementById('user').value) {
                userExist = false;
            }
        })
    }


}

const listUsers = new ListUsers()
listUsers.initLocalStorage()


document.getElementById('btn1').addEventListener('click', (e)=>{
    e.preventDefault()
    listUsers.validateUsers()

    if (userExist) {
        const usuario = document.getElementById('user').value
        const usuarioEnPalabras = usuario.split(' ')

        const password = document.getElementById('password').value
        const passwordEnPalabras = password.split(' ')
        
        if (passwordEnPalabras[0].length >= 5) {
            if (usuarioEnPalabras[0].length >= 5) {
                const user = new Users()
                
                user.setUsuario(usuarioEnPalabras)
                
                user.setID();
            
                const password = document.getElementById('password').value
                user.setPassword(password)
                
                const montonInicial = document.getElementById('initial-amount').value
                user.setMontoInicial(montonInicial)
                
                listUsers.addUser(user)
                
                listUsers.updateLocalStorage()
        
                console.log(`Usuario: ${usuario} agregado exitosamente`);
            } else {
                console.log(`Usuario: ${usuario} tiene menos de 5 caracteres.`);
            }
        }else {
            console.log(`la contraseña tiene menos de 5 caracteres`);
        }
        
    } else {
        console.log(`El usuario ya existe, por favor intenta de nuevo`);
        userExist = true;
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