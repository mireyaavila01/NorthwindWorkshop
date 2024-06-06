"use strict"

const searchDropdown = document.getElementById("searchDropdown");
const categoryDropdown = document.getElementById("categoryDropdown");
const productsDiv = document.getElementById("productsDiv");

const categoryUrl = "http://localhost:8081/api/categories"

const productUrl = "http://localhost:8081/api/products"

window.onload = function(){
searchDropdown.onchange = showOrHide;

}

function showOrHide(){
 if (searchDropdown.value === "Search By Category") {
        categoryDropdown.style.visibility = "visible";
        productsDiv.style.display = "none";
        displayCategories();


    } else if (searchDropdown.value === "View All"){
        categoryDropdown.style.visibility = "hidden";
        productsDiv.style.display = "block";
        viewAllProducts();
    }
    else {
        categoryDropdown.style.visibility = "hidden";
        productsDiv.style.display = "none";
    }
    

}

function displayCategories(){
    categoryDropdown.innerHTML = "";

    fetch(categoryUrl)
    .then(response => response.json())
    .then(categories => {
            let defaultOption = document.createElement("option");
                defaultOption.textContent = "Select a Category";
                defaultOption.value = "";
                categoryDropdown.appendChild(defaultOption);

        categories.forEach(category => {
            
            let option = document.createElement("option");
                option.text = category.name;
                option.value = category.id;
                categoryDropdown.appendChild(option);   

        })
    })

}

function viewAllProducts(){
    
    fetch(productUrl)
    .then(response => response.json())
    .then(products => {
        productsDiv.innerHTML = "";
        // Create a table
        let table = document.createElement("table");
        table.className = "table";

        // Create table header
        let headerRow = table.insertRow();
        let headers = ["Product ID", "Product Name", "Unit Price","Extra"];
        headers.forEach(headerText => {
            let header = document.createElement("th");
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        // Populate table with product data
        products.forEach(product => {
            let row = table.insertRow();
            let productIdCell = row.insertCell();
            productIdCell.textContent = product.productId;

            let productNameCell = row.insertCell();
            productNameCell.textContent = product.productName;

            let unitPriceCell = row.insertCell();
            unitPriceCell.textContent = product.unitPrice;

            let extraDetailsCell = row.insertCell();
            let anchor = document.createElement("a")
            anchor.href = "#";
            anchor.text = "Show Details";
            extraDetailsCell.appendChild(anchor);
        });

        productsDiv.appendChild(table);
    })


}

function productsInCategory(){

}