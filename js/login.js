//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){

  const formulario = document.getElementsByClassName("formulario")[0];
  var parrafoError = document.getElementsByClassName("esconder")[0];
  const usuario = document.getElementById("usuario");
  const contrasena = document.getElementById("contrasena");

  function mostrarError() {
      parrafoError.classList.remove("esconder");
  }

  formulario.addEventListener("submit", prueba);
  function prueba(e){
      e.preventDefault();
      let username = usuario.value;
      let password = contrasena.value

      if(username == '' || password == ''){
          mostrarError();
      } else {
          localStorage.setItem('user', username);
          window.location.href='home.html';
      }
}  
});