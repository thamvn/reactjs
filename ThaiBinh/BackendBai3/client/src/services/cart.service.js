export const cartService={
    addToLocalCart,
    removeFromLocalCart,
    getLocalCart,
    editQuantityLocalCart
}
const keyName='cart'
function getLocalCart(){
    let cart=JSON.parse(localStorage.getItem(keyName));
    return cart||[];
}
function addToLocalCart(product){
  let cart=this.getLocalCart();
  cart.push(product);
  localStorage.setItem(keyName,JSON.stringify(cart));
  
  
}
function removeFromLocalCart(id){
    let cart=this.getLocalCart();
    let newCart=[];
    newCart=cart.filter(product=>product._id!==id);
    localStorage.setItem(keyName,JSON.stringify(newCart));
    return newCart
}
function editQuantityLocalCart(product){
    let cart=this.getLocalCart();
    for(let i=0;i<cart.length;i++){
        if(cart[i]._id===product._id){
            cart[i].quantity=product.quantity
        }
    }
    localStorage.setItem(keyName,JSON.stringify(cart));
    return cart
}
