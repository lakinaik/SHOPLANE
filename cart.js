
// =============Humbergur===============
let Humbergur = document.querySelector(".hamburger");
let sidebar = document.querySelector(".navlist");
Humbergur.addEventListener("click", () => {
  Humbergur.classList.toggle("active");
  sidebar.classList.toggle("open");
});


var  data = JSON.parse(window.localStorage.getItem("product-list"));
document.querySelector(".cart-count").innerHTML = window.localStorage.getItem("cart-count");
var cartCount = JSON.parse(window.localStorage.getItem("cart-count"));
var orderBtn = document.querySelector(".order");

orderBtn.addEventListener("click", ()=>{
  window.localStorage.setItem("cart-count", "0")
  window.localStorage.setItem("product-list", JSON.stringify([]))
  // window.location.reload();
})

if(cartCount== 0){
  document.querySelector(".cart-section").style.display = "none"
  document.querySelector(".empty-cart").style.display = "flex"
}
else{
  document.querySelector(".cart-section").style.display = "block"
  document.querySelector(".empty-cart").style.display = "none"
}
var totalAmount = [];
data.map((item)=>{
  var items = `<li class="cart-item">
  <div class="product-img">
    <img
      src=${item.preview}
      alt="img">
  </div>
  <div class="details">
    <h3>${item.title}</h3>
    <p>X${item.quantity}</p>
    <p>Amout: Rs ${item.price}</p>
  </div>
</li>`;
var Tamount = item.quantity*item.price
totalAmount.push(Tamount)
document.getElementById("items-box").innerHTML += items
})
console.log(totalAmount)
document.getElementById("sum-amount").innerHTML = totalAmount.reduce((total, value) => total + value, 0);

document.getElementById("total-items").innerHTML = data.length;