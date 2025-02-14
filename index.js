// const { element } = require("three/tsl");

let tittle = document.getElementById("tittle");
let price = document.getElementById("price");
let url = document.getElementById("url");
let category = document.getElementById("category");
let btn = document.getElementById("btn");
let cointainer = document.getElementById("cointainer");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let search = document.getElementById("searchbar");
let search_btn = document.getElementById("search_btn");
let selection = document.getElementById("Selection");

let data = JSON.parse(localStorage.getItem("products")) || [];

function storedata() {
  data.push({
    proTittle: tittle.value,
    proPrice: price.value,
    proUrl: url.value,
    proCategory: category.value,
  });

  localStorage.setItem("products", JSON.stringify(data));
  console.log(data);
}

function show() {
  cointainer.innerHTML = "";
  data.forEach((element, index) => {
    let card = document.createElement("div");
    let cat_p = document.createElement("p");
    let imgdiv = document.createElement("div");
    let image = document.createElement("img");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let btndiv = document.createElement("div");
    let edit = document.createElement("button");
    let delet = document.createElement("button");
    let editDiv = document.createElement("div");
    let eTittle = document.createElement("input");
    let ePrice = document.createElement("input");
    let eUrl = document.createElement("input");
    let eCagetory = document.createElement("input");
    let update = document.createElement("button");

    card.id = "card";
    cat_p.id = "cat_p";
    imgdiv.id = "imgdiv";
    image.id = "image";
    p2.id = "p2";
    p3.id = "p3";
    btndiv.id = "btndiv";
    edit.id = "edit";
    delet.id = "delet";
    edit.innerText = "Edit";
    delet.innerText = "Delete";
    editDiv.id = "editDiv";
    eTittle.id = "editInput";
    ePrice.id = "editInput";
    eUrl.id = "editInput";
    eCagetory.id = "editInput";
    update.id = "update";
    update.innerText = "Update";

    //css
    eTittle.style.type = "text";
    eTittle.value = `${element.proTittle}`;
    ePrice.style.type = "text";
    ePrice.value = `${element.proPrice}`;
    eUrl.style.type = "text";
    eUrl.value = `${element.proUrl}`;
    eCagetory.style.type = "text";
    eCagetory.value = `${element.proCategory}`;

    cat_p.innerText = `${element.proCategory}`;
    image.src = element.proUrl;
    p2.innerText = `${element.proTittle}`;
    p3.innerText = `$${element.proPrice}`;

    //edit button
    edit.addEventListener("click", () => {
      editDiv.style.display = "grid";
    });

    update.addEventListener("click", () => {
      if (
        eTittle.value === "" ||
        ePrice.value === "" ||
        eUrl.value === "" ||
        eCagetory.value === ""
      ) {
        alert("please enter some value");
        return;
      } else {
        element.proTittle = eTittle.value;
        element.proPrice = ePrice.value;
        element.proUrl = eUrl.value;
        element.proCategory = eCagetory.value;
        localStorage.setItem("products", JSON.stringify(data));
        select();
      }
      show();
      editDiv.style.display = "none";
    });

    //delete button
    delet.addEventListener("click", () => {
      data = data.filter((e, i) => i != index);
      localStorage.setItem("products", JSON.stringify(data));
      select();
      show();
    });

    editDiv.append(eTittle, ePrice, eUrl, eCagetory, update);
    imgdiv.append(image);
    btndiv.append(edit, delet);
    card.append(cat_p, imgdiv, p2, p3, btndiv, editDiv);
    cointainer.append(card);
  });
}

btn.addEventListener("click", () => {
  if (
    tittle.value === "" ||
    price.value === "" ||
    url.value === "" ||
    category.value === ""
  ) {
    alert("enter the value");
    return;
  } else {
    storedata();
    select();
    show();
    tittle.value = "";
    url.value = "";
    price.value = "";
    category.value = "";
  }
});

btn2.addEventListener("click", () => {
  data = data.sort((a, b) => a.proPrice - b.proPrice);
  show();
});

btn3.addEventListener("click", () => {
  data = data.sort((a, b) => b.proPrice - a.proPrice);
  show();
});

let a = [];
a = data;
// console.log(a);
function searchfun() {
  data = a;
  if (search.value === "") {
    data = a;
  } else {
    data = data.filter((element, index) => {
      return element.proTittle
        .toLowerCase()
        .includes(search.value.toLowerCase());
    });
  }
  show();
}

function select() {
  selection.innerHTML = "";
  let c = [];
  data.forEach((e, i) => {
    c.push(e.proCategory.toLowerCase());
  });
  c = new Set(c);
  console.log(c);
  let opt1 = document.createElement("option");
  opt1.innerText = "All Categories";
  opt1.value = "All Categories";
  opt1.selected = "All Categories";
  selection.append(opt1);

  if (opt1.selected) {
    search.addEventListener("keyup", searchfun);
  }

  c.forEach((e, i) => {
    let opt = document.createElement("option");

    opt1.style.color = "white";
    opt.innerText = `${e}`;
    // opt.select = `${e[i]}`;
    opt.value = `${e}`;
    opt.style.color = "white";
    selection.append(opt);
  });

  selection.addEventListener("change", (event) => {
    data = a;
    console.log(event.target.value);
    data = data.filter((element, index) => {
      if (
        element.proCategory.toLowerCase() === event.target.value.toLowerCase()
      ) {
        return element;
      }

      if (event.target.value.toLowerCase() === "all categories") {
        console.log(element);
        return element;
      }
    });
    show();
    let b = [];
    b = data;
    let c = [];
    c = b;
    // console.log(c);
    search.addEventListener("keyup", () => {
      c = b;
      if (search.value === "") {
        data = b;
        show();
      } else {
        data = c.filter((element, index) => {
          return element.proTittle
            .toLowerCase()
            .includes(search.value.toLowerCase());
        });
      }
      console.log(data);
      show();
    });
  });
}
select();

show();
