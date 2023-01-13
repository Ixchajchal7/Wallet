let loginStorage = JSON.parse(localStorage.getItem('usuarios'));
let userExist = false;

document.getElementById('btn1').addEventListener('click', ()=>{
    let userName = document.getElementById('user').value;
    loginStorage.forEach(user => {
        if (user.usuario == userName) {
            userExist = true;
            console.log(`tu contraseña es: ${user.password}`);
        }
    });

    if (userExist == false) {
        console.log(`Datos incorrectos`);
    } else {
        userExist = false;
    }
})