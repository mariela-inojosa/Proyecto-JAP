var cantidadProductos = []; 
var costoUnidad =  0;
var costoUnidadEnPesos = [];
var subtotal = [];
var subtotalFinal = [];
var numero = 0;
let botones = document.getElementById("envio");
const botonPago  = document.getElementById("botonModal");

function showArticles(array){
    let htmlContent = "";
    for(let i = 0; i < array.length; i++){
        let article = array[i];
    
    htmlContent += `
    <tr>
      <th scope="col"> <img class="mr-2 img-thumbnail" width="70" height="70" src="` + article.src + `" alt="">`+ article.name +`</th>
      <th scope="col" id="price">`+ article.currency + article.unitCost +`</th>
      <th scope="col">
        <input type="number" class="quantity" value="`+ article.count +`"></input>
      </th>
      <th scope="col"> <span class="productTotalByUnit">`+ article.unitCost * article.count +`<span></th>
    </tr>
    `
    }
    document.getElementById("cartProduct").innerHTML = htmlContent;
}

function calcularTotales(array){
    let cantidadProd = document.getElementsByClassName("quantity");
    for (let index = 0; index < cantidadProd.length; index++) {
        const element = cantidadProd[index];
        let costoUnidad =  array[index].unitCost;
        let moneda =  array[index].currency;
        sumarSubtotal(element, index, array[index]);

        element.onchange = function (e) { 
            
        sumarSubtotal(element, index, array[index]);
        }
    }
}

function sumarSubtotal(cifra, index, articulo){        
    cantidadProductos = cifra.value;
    var totalPorProducto = cantidadProductos * articulo.unitCost;
    var art = document.getElementsByClassName("productTotalByUnit");
    art[index].innerText = totalPorProducto;

    if (articulo.currency == "USD") {
        var costoUnidadEnPesos = articulo.unitCost * 40;
    }
    else costoUnidadEnPesos = articulo.unitCost;

    var subtotal = costoUnidadEnPesos * cantidadProductos;
    subtotalFinal[index] =+ subtotal;
   
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let numero = subtotalFinal.reduce(reducer);
    document.getElementById("subtotal").innerHTML = numero;
}

function envio(){
    botones.onchange = function(e){
        botonPago.disabled = false;
        htmlContent = "";
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let numero = subtotalFinal.reduce(reducer);

        if (e.target.value === "gold"){
            envioGold = numero * 0.15;
            htmlContent = envioGold;
        } else {
            if (e.target.value === "premium"){
                envioPremium = numero * 0.07;
                htmlContent = envioPremium;
            } else {
                if (e.target.value === "estandar"){
                    envioEstandar = numero * 0.05;
                    htmlContent = envioEstandar;
                }
            }
        }

        var totalFinal = numero + Number(htmlContent);

        document.getElementById("tipoDeEnvio").innerHTML = htmlContent;
        document.getElementById("total").innerHTML = totalFinal;
    }
}

function validar(){
    let tarjeta = document.getElementById("tdc");
    let transferencia = document.getElementById("tb");
    let numeroTarjeta = document.getElementById("numeroTarjeta");
    let numeroCuenta = document.getElementById("numeroTransferencia");
    let formulario = document.getElementById("formularioCompra");

    tarjeta.onclick = (e) => {
        if (tarjeta.checked === true && transferencia.checked === false) {
            numeroTarjeta.setAttribute("required", "") && numeroCuenta.removeAttribute("required");
        }
    }

    transferencia.onclick = (e) => {
        if (transferencia.checked === true && tarjeta.checked === false) {
            numeroCuenta.setAttribute("required", "") && numeroTarjeta.removeAttribute("required");
        }
    }

    formulario.onsubmit = (e) => {
        e.preventDefault();
        window.location.href = "checkout.html";
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data;
            showArticles(product.articles);
            calcularTotales(product.articles);
            envio();
            validar();
        }

    });

});