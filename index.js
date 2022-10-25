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


    // const buybtn= document.querySelectorAll(".btn-buy");
    // buybtn.addEventListener("click", handlebuyorder);


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