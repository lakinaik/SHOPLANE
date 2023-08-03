$(document).ready(function () {
  $(".image-slider").slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  });
});

// =============Humbergur===============
let Humbergur = document.querySelector(".hamburger");
let sidebar = document.querySelector(".navlist");
Humbergur.addEventListener("click", () => {
  Humbergur.classList.toggle("active");
  sidebar.classList.toggle("open");
});

// =============products=============

var clothes = document.getElementById("cloths");
var accessory = document.getElementById("accessory");
var clothBox = document.createElement("div");
var accessoryBox = document.createElement("div");
clothBox.className = "box";
accessoryBox.className = "box";
clothes.appendChild(clothBox);
accessory.appendChild(accessoryBox);

let loadProduc = () => {
  let http = new XMLHttpRequest();
  http.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
  http.send();
  http.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
    document.querySelector(".loader").style.display = "none"
      var products = JSON.parse(this.responseText);
      // console.log(products)

      products.map((items) => {
      
        if (items.isAccessory === false) {
          let box = `<div class="item" onclick="productDetails(${items.id})">
            <img src= ${items.preview} alt="">
            <h3 class="item-name">${items.name}</h3>
            <h5 class="item-brand">${items.brand}</h5>
            <h2 class="item-price">Rs ${items.price}</h2>
          </div>`;
      
          clothBox.innerHTML += box;
        }
      
        if (items.isAccessory === true) {
          let box = `<div class="item" onclick="productDetails(${items.id})">
            <img src= ${items.preview} alt="">
            <h3 class="item-name">${items.name}</h3>
            <h5 class="item-brand">${items.brand}</h5>
            <h2 class="item-price">Rs ${items.price}</h2>
          </div>`;
      
          accessoryBox.innerHTML += box;
        }
      });
    }
  };
};
loadProduc();


function productDetails(id){
  let productDetailsUrl = `productDetails.html?id=${id}`;
  window.location.href = productDetailsUrl;
}


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
        DescriptionSection.appendChild(btn_tag)
      
      }
      }
      
      var data = JSON.parse(window.localStorage.getItem("product-list"));
      document.querySelector(".cart-count").innerHTML = window.localStorage.getItem("cart-count");