"use strict"

const productDetailTable = document.getElementById("productDetailTable");

const courseDetailsTableBody = document.getElementById("courseDetailsTableBody");

window.onload = function (){

const urlParams = new URLSearchParams(location.search);
let id = -1;
if (urlParams.has("productId")){
   id = urlParams.get("productId");
   detailsForProduct(id);
}


};


function detailsForProduct(productId){
    productDetailTable.innerHTML = "";

    const productDetailUrl = `http://localhost:8081/api/products/${productId}`;

    fetch(productDetailUrl)
    .then(response => response.json())
    .then(product =>{
        let row = productDetailTable.insertRow();

        let productIdCell = row.insertCell();
        productIdCell.textContent = product.productId;

        let productNameCell = row.insertCell();
        productNameCell.textContent = product.productName;

        let unitPriceCell = row.insertCell();
        unitPriceCell.textContent = parseFloat(product.unitPrice).toFixed(2);

        let unitStockCell = row.insertCell();
        unitStockCell.textContent = product.unitsInStock;

        let categoryCell = row.insertCell();
        categoryCell.textContent = product.categoryId;

        let supplierCell = row.insertCell();
        supplierCell.textContent = product.supplier;

        let disconCell = row.insertCell();
        disconCell.textContent = product.discontinued;


    })

}