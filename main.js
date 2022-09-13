//call inputs
let title = document.getElementById("title");
let author = document.getElementById("author");

let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");

let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

// console.log(title, price, taxes, discount, total, count, category, submit);

// get total
function getTotal() {
  //   console.log("done");
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
//create product
let dataProd;
if (localStorage.product != null) {
  dataProd = JSON.parse(localStorage.product);
} else {
  dataProd = [];
}

submit.onclick = function () {
  let newProd = {
    title: title.value.toLowerCase(),
    author: author.value.toLowerCase(),

    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  //mood update
  if (
    title.value != "" &&
    author.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProd.count < 100
  ) {
    if (mood === "create") {
      //count

      if (newProd.count > 1) {
        for (let i = 0; i < newProd.count; i++) {
          dataProd.push(newProd);
        }
      } else {
        dataProd.push(newProd);
      }
    } else {
      dataProd[tmp] = newProd;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  // save localstorage

  localStorage.setItem("product", JSON.stringify(dataProd));
  showData();
  console.log(dataProd);
};
// clear inputs
function clearData() {
  title.value = "";
  author.value = "";

  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read data in table
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProd.length; i++) {
    table += ` <tr>
  <td>${i + 1}</td>
  <td>${dataProd[i].title}</td>
  <td>${dataProd[i].author}</td>

  <td>${dataProd[i].price}</td>
  <td>${dataProd[i].taxes}</td>
  <td>${dataProd[i].ads}</td>
  <td>${dataProd[i].discount}</td>
  <td>${dataProd[i].total}</td>
  <td>${dataProd[i].category}</td>
  <td><button onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
</tr>`;
    // console.log(table);
    // console.log(table.title);
  }
  document.getElementById("tbody").innerHTML = table;
  // count more than product one step

  let btnDelete = document.getElementById("deleteAll");
  if (dataProd.length > 0) {
    btnDelete.innerHTML = `<button onclick = "deleteAll()" >delete All(${dataProd.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();

// delete
function deleteData(i) {
  // console.log(i);
  // delete from array
  dataProd.splice(i, 1);
  //from local
  localStorage.product = JSON.stringify(dataProd);
  // to refresh data in main page
  showData();
}
//delete all
function deleteAll() {
  //from local
  localStorage.clear();
  // delete from array
  dataProd.splice(0);
  showData();
}

// update
function updateData(i) {
  // console.log(i);
  title.value = dataProd[i].title;
  author.value = dataProd[i].author;

  price.value = dataProd[i].price;
  taxes.value = dataProd[i].taxes;
  ads.value = dataProd[i].ads;
  discount.value = dataProd[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProd[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  // console.log(id);
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;

  search.focus();
  search.value = "";
  showData();
  // console.log(searchMood);
}

function searchData(value) {
  // console.log(value);
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataProd.length; i++) {
      if (dataProd[i].title.includes(value.toLowerCase())) {
        // console.log(i);
        table += ` <tr>
        <td>${i}</td>
        <td>${dataProd[i].title}</td>
        <td>${dataProd[i].author}</td>

        <td>${dataProd[i].price}</td>
        <td>${dataProd[i].taxes}</td>
        <td>${dataProd[i].ads}</td>
        <td>${dataProd[i].discount}</td>
        <td>${dataProd[i].total}</td>
        <td>${dataProd[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataProd.length; i++) {
      if (dataProd[i].category.includes(value.toLowerCase())) {
        // console.log(i);
        table += ` <tr>
      <td>${i}</td>
      <td>${dataProd[i].title}</td>
      <td>${dataProd[i].author}</td>

      <td>${dataProd[i].price}</td>
      <td>${dataProd[i].taxes}</td>
      <td>${dataProd[i].ads}</td>
      <td>${dataProd[i].discount}</td>
      <td>${dataProd[i].total}</td>
      <td>${dataProd[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// clean data
