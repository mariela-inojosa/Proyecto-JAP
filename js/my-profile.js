let datos = document.getElementById("infoPerfil");

function modificarPerfil(array) {
    userInfo = [];
    let localDatos = JSON.parse(localStorage.getItem("usuario"));
    for (i = 0; i < localDatos.length; i++) {
        if (i == 0){
            document.getElementById("nombre").innerHTML  = localDatos[i];
        } if (i == 1){
            document.getElementById("edad").innerHTML = localDatos[i];
        } if (i == 2){
            document.getElementById("telefono").innerHTML = localDatos[i];
        } if (i == 3){
            document.getElementById("email").innerHTML = localDatos[i];
        } if (i == 4){
            document.getElementById("direccion").innerHTML = localDatos[i];
        } if (i == 5){
            document.getElementById("direccion2").innerHTML = localDatos[i];
        } if (i == 6){
            document.getElementById("ciudad").innerHTML = localDatos[i];
        } if (i == 7){
            document.getElementById("departamento").innerHTML = localDatos[i];
        } if (i == 8){
            document.getElementById("codigoPostal").innerHTML = localDatos[i];
        }
      }
    array.onsubmit = (e) => {
        for (let index = 0; index < array.length - 2; index++) {
            userInfo.push(array[index].value);
        }
        localStorage.setItem("usuario", JSON.stringify(userInfo));
        userInfo = [];
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    modificarPerfil(datos);
    // var user  = document.getElementById("usuario");
    // user.value = localStorage.getItem('user');
    // console.log(user);



});