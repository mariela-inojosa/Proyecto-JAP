var cantidadProductos = []; 
var totalPorProducto = [];
var costoUnidad =  [];
var costoUnidadEnPesos = [];
var subtotal = [];
var subtotalFinal = [];

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

        element.onchange = function (e) {
            cantidadProductos = e.target.value;
            var totalPorProducto = cantidadProductos * costoUnidad;
            var art = document.getElementsByClassName("productTotalByUnit");
            art[index].innerText = totalPorProducto;

            if (array[index].currency == "USD") {
                var costoUnidadEnPesos = costoUnidad * 40;
            }
            else costoUnidadEnPesos = costoUnidad;

            var subtotal = costoUnidadEnPesos * cantidadProductos;
            subtotalFinal[index] =+ subtotal;
           
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            console.log(subtotalFinal.reduce(reducer));
            let numero = subtotalFinal.reduce(reducer);
            document.getElementById("subtotal").innerHTML = numero; 
        }
    }
}

function envio(){
    let botones = document.getElementById("envio");
    botones.onchange = function(e){
        htmlContent = "";
        console.log(e.target.value);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        console.log(subtotalFinal.reduce(reducer));
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
        console.log(totalFinal);


        document.getElementById("tipoDeEnvio").innerHTML = htmlContent;
        document.getElementById("total").innerHTML = totalFinal;
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
        }


    });
});