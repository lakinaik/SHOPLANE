

// =============Humbergur===============
let Humbergur = document.querySelector(".hamburger");
let sidebar = document.querySelector(".navlist");
Humbergur.addEventListener("click", () => {
  Humbergur.classList.toggle("active");
  sidebar.classList.toggle("open");
});


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
// console.log(productId);

let productDetailsUrl = `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}`;
let http = new XMLHttpRequest();
http.open("GET", productDetailsUrl, true);
http.send();
http.onreadystatechange = function () {
  document.querySelector(".loader").style.display = "none"
  if (this.status == 200 && this.readyState == 4) {
    let productData = JSON.parse(this.responseText);
    // console.log(productData)
    var previewContainer = document.createElement("div");
    previewContainer.className = "preview";
    var DescriptionSection = document.createElement("div");
    DescriptionSection.className = "description_section";
    document.querySelector("main").appendChild(previewContainer);
    document.querySelector("main").appendChild(DescriptionSection);

    for (var i in productData) {
      if (i == "preview") {
        var img = document.createElement("img");
        img.src = productData[i];
        img.className = "mainImg";
        previewContainer.appendChild(img);
      } else if (i == "name") {
        var productName = document.createElement("h1");
        productName.className = "name";
        productName.innerHTML = productData[i];
      } else if (i == "brand") {
        var productBrand = document.createElement("h3");
        productBrand.className = "brand";
        productBrand.innerHTML = productData[i];
      } else if (i == "price") {
        var productPrice = document.createElement("h4");
        productPrice.className = "Price";
        productPrice.innerHTML = "Price : Rs ";
        var Amount = document.createElement("span");
        Amount.className = "amount";
        Amount.innerHTML = productData[i];
        productPrice.appendChild(Amount);
      } else if (i == "description") {
        var Desc_Section = document.createElement("div");
        Desc_Section.className = "Desc";
        var h3_tag = document.createElement("h3");
        h3_tag.innerHTML = "Description";
        var p_tag = document.createElement("p");
        p_tag.className = "description";
        p_tag.innerHTML = productData[i];
        Desc_Section.appendChild(h3_tag);
        Desc_Section.appendChild(p_tag);
      } else if (i == "photos") {
        var preview_div_tag = document.createElement("div");
        preview_div_tag.className = "preview_img";
        for (var j = 0; j < productData[i].length; j++) {
          var img_tag = document.createElement("img");
          img_tag.src = productData[i][j];
          preview_div_tag.appendChild(img_tag);
        }
      }
      var div_tag = document.createElement("div");
      var h3_tag = document.createElement("h3");
      h3_tag.innerHTML = "Product Review";
      div_tag.appendChild(h3_tag);
    }
    var btn_tag = document.createElement("button");
    btn_tag.innerHTML = "Add to Cart";
    btn_tag.className = "btn";

    DescriptionSection.appendChild(productName);
    DescriptionSection.appendChild(productBrand);
    DescriptionSection.appendChild(productPrice);
    DescriptionSection.appendChild(Desc_Section);
    DescriptionSection.appendChild(div_tag);
    DescriptionSection.appendChild(preview_div_tag);
    DescriptionSection.appendChild(btn_tag);

    // product preview 

var mainImg = document.querySelector('.mainImg')
var images = document.querySelectorAll('.preview_img img')
images[0].classList.add('active')
var mainImg = document.querySelector('.mainImg')
 document.querySelector("body").onload = function(){
  mainImg.src = images[0].src
 }
  
  document.addEventListener("click", function(event) {
    var clickedImg = event.target.closest(".preview_img img");
    
    if (clickedImg) {
      var siblings = clickedImg.parentNode.querySelectorAll(".preview_img img");
      
      for (var i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove("active");
      }
      
      clickedImg.classList.add("active");
      mainImg.src = clickedImg.src;
    }
  });

    var addToCartBtn = document.querySelector(".btn");

    var cart = document.querySelector(".cart-count");
    var cartData = [];
    var cartIntialValue;

    if (localStorage.getItem('cart-count') == null) {
      localStorage.setItem('cart-count', '0');
    } else {
      var cartValue = localStorage.getItem('cart-count');
      localStorage.setItem('cart-count', cartValue);
    }


    // ---------------- Increase Cart Count -----------------------
    function cartCount() {
      if (window.localStorage.getItem("cart-count") === null) {
        cartIntialValue = 0;
      } else {
        cartIntialValue = JSON.parse(window.localStorage.getItem("cart-count"));
        cart.innerHTML = cartIntialValue;
      }
      var cartCurrentValue = cartIntialValue + 1;
      window.localStorage.setItem("cart-count", cartCurrentValue);
      cart.innerHTML = window.localStorage.getItem("cart-count");
    }
    cart.innerHTML = window.localStorage.getItem("cart-count");


    function addData(productData) {
      if (window.localStorage.getItem("product-list") === null) {
        cartData = [];
      }
      else {
        cartData = JSON.parse(window.localStorage.getItem("product-list"));
      }

      if (cartData.length === 0) {
        var myObj = {
          id: productData.id,
          title: productData.name,
          quantity: 1,
          price: productData.price,
          preview: productData.preview
        };
        cartData.push(myObj);
      }
      else if (cartData.length != 0) {
        var a = 0;
        for (var i = 0; i < cartData.length; i++) {
          if (cartData[i].id == productData.id) {
            cartData[i].quantity = parseInt(cartData[i].quantity) + 1;
            a += 1;
          }
        }
        if (a == 0) {
          var myObj = {
            id: productData.id,
            title: productData.name,
            quantity: 1,
            price: productData.price,
            preview: productData.preview
          };
          cartData.push(myObj);
        }
      }
      window.localStorage.setItem("product-list", JSON.stringify(cartData));
    }


    addToCartBtn.addEventListener("click", function () {
      var productId = window.location.search.split("=")[1];
      var urlLink =
        "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId;

      function getData() {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status === 200) {
              var productData = JSON.parse(this.responseText);
              addData(productData);
            }
          }
        };
        http.open("GET", urlLink, true);
        http.send();
      }
      cartCount();
      getData();
    });

    //------------------------------------------------------------
  }
}