"use strict"

const searchDropdown = document.getElementById("searchDropdown");
const categoryDropdown = document.getElementById("categoryDropdown");
const productsDiv = document.getElementById("productsDiv");

const categoryUrl = "http://localhost:8081/api/categories"

const productUrl = "http://localhost:8081/api/products"


const productsByCategoryTable = document.getElementById("productsByCategoryTable");



window.onload = function(){
searchDropdown.onchange = showOrHide;
categoryDropdown.onchange = productsInCategory;

}

function showOrHide(){
 if (searchDropdown.value === "Search By Category") {
        categoryDropdown.style.visibility = "visible";
        productsDiv.style.display = "none";
        productsByCategoryTable.style.display = "block";
        displayCategories();


    } else if (searchDropdown.value === "View All"){
        categoryDropdown.style.visibility = "hidden";
        productsDiv.style.display = "block";
         
        productsByCategoryTable.style.display = "none";
       
        viewAllProducts();
    }

    else{
        categoryDropdown.style.visibility = "hidden";
        productsDiv.style.display = "none";
        productsByCategoryTable.style.display = "none";
    }
    productsByCategoryTable.innerHTML = ""; 

}

function displayCategories(){
    categoryDropdown.innerHTML = "";

    //populates the different categories 
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
                option.value = category.categoryId;
                categoryDropdown.appendChild(option);   

        })
    })

}

function viewAllProducts(){
     productsDiv.innerHTML = "";
    fetch(productUrl)
    .then(response => response.json())
    .then(products => {
       
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

        products.sort((a, b) => a.productName.localeCompare(b.productName)); //sort by name

        products.forEach(product => {
            let row = table.insertRow();
            let productIdCell = row.insertCell();
            productIdCell.textContent = product.productId;

            let productNameCell = row.insertCell();
            productNameCell.textContent = product.productName;

            let unitPriceCell = row.insertCell();
            unitPriceCell.textContent = parseFloat(product.unitPrice).toFixed(2);

            let extraDetailsCell = row.insertCell();
            let anchor = document.createElement("a")
            anchor.href = `./details.html?productId=${product.productId}`;
            anchor.text = "Show Details";
            extraDetailsCell.appendChild(anchor);
        });

        productsDiv.appendChild(table);
    })


}

function productsInCategory(){
    productsByCategoryTable.innerHTML = "";
    let selectedCategoryId = categoryDropdown.value;
    console.log(selectedCategoryId);

    let productsByCategoryUrl = "http://localhost:8081/api/products/bycategory/" + selectedCategoryId
    
    

    fetch(productsByCategoryUrl)
    .then(response => response.json())
    .then(products => {
       

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

        products.sort((a, b) => a.productName.localeCompare(b.productName)); //sort by name

        products.forEach(product => {
            let row = table.insertRow();
            let productIdCell = row.insertCell();
            productIdCell.textContent = product.productId;

            let productNameCell = row.insertCell();
            productNameCell.textContent = product.productName;

            let unitPriceCell = row.insertCell();
            unitPriceCell.textContent = parseFloat(product.unitPrice).toFixed(2);

            let extraDetailsCell = row.insertCell();
            let anchor = document.createElement("a");
            anchor.href = `./details.html?productId=${product.productId}`;
            anchor.text = "Show Details";
            extraDetailsCell.appendChild(anchor);
        });

        productsByCategoryTable.appendChild(table);
    });
    
    
}

