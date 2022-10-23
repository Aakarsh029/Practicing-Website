// let carticon = document.querySelector('#cart-icon');
// let cart = document.querySelector('.cart');
// let closecart = document.querySelector('#close-cart');

// carticon.onclick = () => {
//     cart.classList.add("active");
// };
// closecart.onclick = () => {
//     cart.classList.remove("active");
// };
// if(document.readyState == "loading"){
//     document.addEventListener("DOMContentLoaded",ready);
// }  else {
//     ready();
// }
// function ready(){
//     var removecartbuttons = document.getElementsByClassName('cart-remove')
//     console.log(removecartbuttons)
//     for(var i=0 ; i < removecartbuttons.length;i++){
//         var  button = removecartbuttons[i];
//         button.addEventListener("click" ,  removecartitem);
//     }
//     var quantityinputs = document.getElementsByClassName('cart-quantity')
//     for(var i=0 ; i < quantityinputs.length;i++)
//     {
//         var input = quantityinputs[i];
//         input.addEventListener('change',quantitychanged);
//     }
//     // Add
//     var addcart=document.getElementsByClassName('add-cart')
//     for(var i=0 ; i < addcart.length;i++)
//     {
//         var button = addcart[i];
//         button.addEventListener(click,'addcartclicked');
//     }
// }
// function removecartitem(event){
//     var buttonclicked = event.target;
//     buttonclicked.parentElement.remove() ;
//     updatetotal();
// }
// function quantitychanged(event){
//     var input = event.target
//     if(isNaN(input.value)|| input.value<=0){
//         input.value = 1
//     }
//     updatetotal();
// }
// function addcartclicked(event){
//     var button = event.target;
//     var shopproduct = button.parentElement;
//     var title = shopproduct.getElementsByClassName("product-title")[0].innerText;
//     var price = shopproduct.getElementsByClassName("price")[0].innerText;
//     var pimg = shopproduct.getElementsByClassName("product-img")[0].src;
//     addproducttocart(title,price,pimg);
//     updatetotal();
// }
// function addproducttocart(title,price,pimg)
// {
//     var cartshopbox = document.createElement("div");
//     cartshopbox.classList.add("cart-box")
//     var cartitems = document.getElementsByClassName("cart-content")[0];
//     var cartitemsname = cartitems.getElementsByClassName("cart-product-title");
//     for(var i=0;i<cartitemsname.length;i++)
//     {if(cartitemsname[i]==title){
//         alert("you have already added this item to cart");
//         return;
//     }
// }

// var cartboxcontent = `
//                         <img src="${pimg}" alt="" class="cart-img">
//                         <div class="detail-box">
//                             <div class="cart-product-title">${title}</div>
//                             <div class="cart-price">${price}</div>
//                             <input type="number" value="1" class="cart-quantity" >
//                         </div>
//                         <i class="bx bxs-trash-alt cart-remove "></i>
// `;
// cartshopbox.innerHTML = cartboxcontent
// cartitems.append(cartshopbox)
// cartshopbox.getElementsByClassName('cart-remove')[0].addEventListener('click', removecartitem)
// cartshopbox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantitychanged)
// }
// function updatetotal(){
//     var cartboxes = cartcontent.getElementsByClassName("cart-box");
//     for(var i=0 ; i < cartboxes.length;i++)
//     {
//         var cartbox = cartboxes[i];
//         var priceelement = cartbox.getElementsByClassName("cart-price")[0];
//         var quantityelement = cartbox.getElementsByClassName("cart-quantity")[0];
//         var price = parseFloat(priceelement.innerText.replace("$",""));
//         var quantity = quantityelement.value  
//         total= total + (price * quantity);
//         total = Math.round(total*100)/100

//         document.getElementsByClassName("total-price")[0].innerText = "$" + total;
//     }
// }
const carticon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closecart = document.querySelector("#close-cart");

carticon.addEventListener("click",()=>{
    cart.classList.add("active");
});
closecart.addEventListener("click",()=>{
    cart.classList.remove("active");
});

if(document.readyState=="loading")
{
    document.addEventListener('DOMContentLoaded',start);

}
else
{
    start();
}
function start(){
    addevents();
}
function update(){
    addevents();
    updatetotal();
}
function addevents(){
    let cartremovebtns = document.querySelectorAll('.cart-remove');
    console.log(cartremovebtns);
    cartremovebtns.forEach((btn) => {
        btn.addEventListener("click",handleremovecartitem);
    });

    let cartquantityinputs=document.querySelectorAll('.cart-quantity');
    cartquantityinputs.forEach(input => {
        input.addEventListener("change",handlechangeitemquantity);
    });

    let addcartbtns = document.querySelectorAll(".add-cart");
    addcartbtns.forEach((btn) => {
        btn.addEventListener("click" , handleaddcartitem);
    });


    const buybtn= document.querySelectorAll(".btn-buy");
    buybtn.addEventListener("click", handlebuyorder);
}
let itemsadded=[]
function handleaddcartitem()
{
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".price").innerHTML;
    let imgsrc = product.querySelector(".product-img").src;
    console.log(title,price,imgsrc);
    let newtoadd={
        title,price,imgsrc,
    };
    if(itemsadded.find((el) => el.title == newtoadd.title))
    {
        alert("you have already added this item to cart");
        return;
    }
    else{
        itemsadded.push(newtoadd);
    }
    let cartboxElement = cartboxcomponent(title,price,imgsrc);

    let newnode = document.createElement("div");
    newnode.innerHTML = cartboxElement;
    const cartcontent = cart.querySelector(".cart-content");
    cartcontent.appendChild(newnode);
    update();
}
function handleremovecartitem(){
    this.parentElement.remove();
    itemsadded = itemsadded.filter(el=>el.title != this.parentElement.querySelector(".cart-product-title").innerHTML)
    update();
}
function handlechangeitemquantity(){
    if(isNaN(this.value) ||  this.value<1)
    {
        this.value=1;
    }
    this.value=Math.floor(this.value);
    update();
}
function handlebuyorder(){
    if(itemsadded.length <= 0){
        alert("there is no order to place yet! \nPlease make an order first...");
        return;
    }
    const cartContent=cart.querySelector(".cart-content");
    cartContent.innerHTML='';
   alert("Your Order is placed Successfully:");
   update(); 
}
function updatetotal()
{
    let cartboxes=document.querySelectorAll('.cart-box');
    const totalelement = cart.querySelector(".total-price");
    let total = 0;
    cartboxes.forEach((cartbox) => {
        let priceelement = cartbox.querySelector(".cart-price");
        let price = parseFloat(priceelement.innerHTML.replace("$",""));
        let quantity = cartbox.querySelector(".cart-quantity").value;
        total+= price*quantity;
    });
    total=total.toFixed(2);
    total=Math.round(total*100)/100
    totalelement.innerHTML="$"+total;
}
function cartboxcomponent(title,price,imgsrc){
    return          `
                    <div class="cart-box">
                        <img src="${imgsrc}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity" >
                        </div>
                        <i class="bx bxs-trash-alt cart-remove "></i>
                    </div>`;
}