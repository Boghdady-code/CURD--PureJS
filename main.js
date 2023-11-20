// select items

let title = document.getElementById ("title");
let price = document.getElementById ("price");
let taxes = document.getElementById ("taxes");
let ads = document.getElementById ("ads");
let discount = document.getElementById ("discount");
let total = document.getElementById ("total");
let count = document.getElementById ("count");
let category = document.getElementById ("category");
let submit = document.getElementById ("submit");
let mode = "create";
let tmp;
let search = document.getElementById ("search");



// console.log (title ,price, taxes, ads, discount, total, submit, category, count);
//total function

price.onkeyup = getTotal;
taxes.onkeyup = getTotal;
ads.onkeyup = getTotal;
discount.onkeyup = getTotal;

function getTotal () {
  if (price.value != "") {

    total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.style.backgroundColor = "green";

  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(136, 5, 5)";

  }
  
}

let productsList;

if (localStorage.product != null) {
  productsList = JSON.parse(localStorage.product);

} else {
  productsList = [];
}


submit.onclick = function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  }

  if (title.value != "" && price.value != "" && category.value !="" && count.value < 100) {
      if(mode === "create") {
    if (newProduct.count > 1) {
    for (let i=0 ; i < newProduct.count ; i++) {
      productsList.push(newProduct);
    } 
  } else {
      productsList.push(newProduct);

    }

  } else {
    productsList[tmp] = newProduct;
    mode = "create";
    count.style.display = "block";
    submit.innerHTML= "Create";
    
  }
  clearData();

  }


  
  localStorage.setItem ("product", JSON.stringify(productsList));
  
  showData();

}


function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}


function showData() {
  getTotal();
  let table =" ";
  for (let i=0 ; i < productsList.length ; i++) {
  
    table +=`
      <tr>
            <td>${i+1}</td>
            <td>${productsList[i].title}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].taxes}</td>
            <td>${productsList[i].ads}</td>
            <td>${productsList[i].discount}</td>
            <td>${productsList[i].total}</td>
            <td>${productsList[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
    `
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAlldiv = document.querySelector (".output .delete-all");

  if (productsList.length > 0) {
    deleteAlldiv.innerHTML = ` <button onclick="deleteAll()">Delete All (${productsList.length})</button> `

  } else {
    deleteAlldiv.innerHTML = "";
  }
  
}

showData();


function deleteData(i) {
  productsList.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(productsList));
  showData();

}


function deleteAll () {
  localStorage.clear();
  productsList.splice(0);
  showData();

}


function updateData (index) {
  
  tmp = index;
  title.value = productsList[index].title;
  price.value = productsList[index].price;
  taxes.value = productsList[index].taxes;
  ads.value = productsList[index].ads;
  discount.value = productsList[index].discount;
  total.innerHTML = productsList[index].total;
  getTotal();
  category.value = productsList[index].category;
  count.style.display="none";
  submit.innerHTML = "Update";
  mode="update";
  window.scrollTo({ top: 0, behavior: 'smooth' });


}
  

let searchMode = "title";

function searchEngine (id) {
  if (id === "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }

  search.focus()
  search.value="";
  showData();




}

function searchData (value) {
  let table = " ";
  if (searchMode === "title") {
    for (let i=0 ; i < productsList.length ; i++) {
      if (productsList[i].title.toLowerCase().includes(value.toLowerCase())) {
        table +=`
      <tr>
            <td>${i+1}</td>
            <td>${productsList[i].title}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].taxes}</td>
            <td>${productsList[i].ads}</td>
            <td>${productsList[i].discount}</td>
            <td>${productsList[i].total}</td>
            <td>${productsList[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
    `


      }
    
    }

  } else {

    for (let i=0 ; i < productsList.length ; i++) {
      if (productsList[i].category.toLowerCase().includes(value.toLowerCase())) {
        table +=`
      <tr>
            <td>${i+1}</td>
            <td>${productsList[i].title}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].taxes}</td>
            <td>${productsList[i].ads}</td>
            <td>${productsList[i].discount}</td>
            <td>${productsList[i].total}</td>
            <td>${productsList[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
    `


      }
    
    }

  }
    document.getElementById("tbody").innerHTML = table;


}
