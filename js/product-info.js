var comments = {};
var product = {};
var relProducts = [];

function showGallery(array){ // Mostrar información de producto

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        }

        document.getElementById("product-image-gallery").innerHTML = htmlContentToAppend;
}        

function showRelatedProducts(indexList, productList){ // allProducts es donde estan los productos
    let htmlContentToAppend = "";
    for(let i = 0; i < indexList.length; i++){
        let ind = indexList[i];

    productList.forEach(function(){
            relProducts = productList[ind];
        });
        htmlContentToAppend += `
            <div class="col-3 border">
            <img class="img-fluid max-width: 100% height: auto align-baseline" src="` + relProducts.imgSrc + `" alt="">
            <p>`+ relProducts.name +`</p>
            <p>`+ relProducts.currency +` `+ relProducts.cost +`</p>
            <p>`+ relProducts.soldCount +` unidades vendidas</p>
            </div>`
        }
        document.getElementById("related").innerHTML = htmlContentToAppend;
    }
    
function showComments(){
    let htmlContentToAppend = "";

    for(let i = 0; i < comments.length; i++){
        let comment = comments[i];

    for(let i = 0; i < parseInt(comment.score); i++){
        htmlContentToAppend += `<span class="fa fa-star checked"></span>`}
        
    for(let i = 0; i < 5 - parseInt(comment.score); i++){
        htmlContentToAppend += `<span class="fa fa-star"></span>`}


    htmlContentToAppend += `
    <div>
        <div>
                <p>`+ comment.user + `</p>
                <p>`+ comment.dateTime +`</p>
                <p>`+ comment.description +`</p>
                <hr>

        </div>
    </div>    
    `
    }

    document.getElementById("comments").innerHTML = htmlContentToAppend;
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data;
            productPos = product.relatedProducts;

            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productDescription").innerHTML = product.description;
            document.getElementById("productCost").innerHTML = product.cost + " " + product.currency;
            document.getElementById("productSoldCount").innerHTML = product.soldCount;
            document.getElementById("productCategory").innerHTML = product.category;
            showGallery(product.images);

            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok"){
                    allProducts = resultObj.data;
                    showRelatedProducts(productPos, allProducts);

                    }
                })

            }                    
        })


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comments = resultObj.data;
            showComments(comments);
        }
    })
    
});