// Load data

let ProductId = document.getElementById("product-id");
let ProductName = document.getElementById("productName");
let Price = document.getElementById("price");
let Description = document.getElementById("description");
let img = document.getElementById("imgUser");
let viewModal = document.getElementById("productFormModal");
let btnAdd = document.getElementById("btnAdd");



function btnSubmit() {
    if (localStorage.getItem('productArray') == null) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem('productArray'));
    }
    let reader = new FileReader();
    reader.readAsDataURL(img.files[0]);
    reader.addEventListener('load', () => {
        let photos = reader.result;
        arr.push({
            ProductID: ProductId.value,
            Productname: ProductName.value,
            Price: Price.value,
            Description: Description.value,
            Photo: photos
        });
        localStorage.setItem('productArray', JSON.stringify(arr));

        location.reload();
    });
    viewModal.reset();

}


showData();
// Display data in a table using local Storage 
function showData() {

    var showProduct;
    if (localStorage.getItem("productArray" == null)) {
        console.log(localStorage.getItem("productArray"));
        showProduct = [];
    }
    else {
        showProduct = JSON.parse(localStorage.getItem("productArray"));
    }
    var table = "";

    showProduct.forEach(function (element, index) {
        table += `<tr index=${index}>`
        table += `<td>${element.ProductID}</td>`
        table += `<td>${element.Productname}</td>`
        table += `<td>${element.Price}</td>`
        table += `<td>${element.Description}</td>`
        table += `<td><div style="width:100px; height:100px;"><img style=" max-width: 100%; max-height:100%; margin-left:40px; margin-right:20px" src="${element.Photo}"/></div></td>`
        table += `<td><button type="button" class="btn btn-primary" onclick='editData(${index})' style="" data-bs-toggle="modal" data-bs-target="#productFormModal"><i class="fa fa-eye" aria-hidden="true"></i></button></td>`
        table += `<td><button type="button" class="btn btn-danger" onclick='deleteData(${index})'><i class="fa fa-close" aria-hidden="true"></i></button></td>`
        table += `</tr>`

        document.querySelector("#main").innerHTML = table;

    });
}


// Delete data in a local storage and table 
function deleteData(index) {
    var peopleList;

    if (localStorage.getItem("productArray" == null)) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem('productArray'));
    }
    let deleted = confirm("Do you want to delete this Column " + peopleList[index].Productname + "?");
    if (deleted == true) {
        peopleList.splice(index, 1);
        localStorage.setItem('productArray', JSON.stringify(peopleList));

        location.reload();
    }
}

// Update data in a table and local storage 
function editData(index) {
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("btupdate").style.display = "flex";

    var peopleList;

    if (localStorage.getItem("productArray" == null)) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem('productArray'));
    }
    // let productId = index;
    // Show data in a modal 
    document.querySelector("#productFormModal .modal-type").value = "Edit";
    document.querySelector("#productFormModal #product-id").value = peopleList[index].ProductID;
    document.querySelector("#productFormModal .modal-title").textContent = "Edit Product";
    document.querySelector("#productFormModal #productName").value = peopleList[index].Productname;
    document.querySelector("#productFormModal #price").value = peopleList[index].Price;
    document.querySelector("#productFormModal #description").value = peopleList[index].Description;
    // btnAdd.textContent = "Update changes";
    editIndex = index;


}

function btnUpdate() {
    let idx = editIndex;
    var peopleList;

    if (localStorage.getItem("productArray" == null)) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem('productArray'));
    }
    let productID = document.getElementById("product-id").value;
    let name = document.getElementById("productName").value;
    let prices = document.getElementById("price").value;
    let desc = document.getElementById("description").value;
    let product_img = document.querySelector("#imgUser");
    // const file = document.querySelector("input[type=file]").files[0];

    if (product_img.value != '') {
        const reader = new FileReader();

        // const file = product_img.files[0];
        reader.readAsDataURL(product_img.files[0]);
        reader.onload = function () {
            let url = reader.result;

            peopleList[idx].ProductID = productID;
            peopleList[idx].Productname = name;
            peopleList[idx].Price = prices;
            peopleList[idx].Description = desc;
            peopleList[idx].Photo = url;

            localStorage.setItem("productArray", JSON.stringify(peopleList));
        }
        showData();
    }

    else {
        peopleList[idx].ProductID = document.getElementById("product-id").value;
        peopleList[idx].Productname = document.getElementById("productName").value;
        peopleList[idx].Price = document.getElementById("price").value;
        peopleList[idx].Description = document.getElementById("description").value;

        localStorage.setItem("productArray", JSON.stringify(peopleList));
        showData();
    }
    location.reload();
    viewModal.reset();
    document.getElementById("product-id").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";

    document.getElementById("btnAdd").style.display = "flex";
    document.getElementById("btupdate").style.display = "none";
}

function btnClose() {

    document.getElementById("product-id").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
    document.getElementById("imgUser") = "";
}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataDisplay");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function SortTable(table, Column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    // Sort each row 
    const sortedRow = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${Column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${Column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    tBody.append(...sortedRow);

    table.querySelectorAll(".th-sort").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${Column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${Column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable .th-sort").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        SortTable(tableElement, headerIndex, !currentIsAscending);
    });
});


