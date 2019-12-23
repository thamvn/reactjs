export const cartService={
    addToLocalCart,
    removeFromLocalCart,
    getLocalCart,
    editQuantityLocalCart,
    findProductInLocalCart,
    setLocalCart
}
const keyName='cart'
function setLocalCart(cart){
    localStorage.setItem(keyName,JSON.stringify(cart))
}
function getLocalCart(){
    let cart=JSON.parse(localStorage.getItem(keyName));
    return cart||[];
}
function addToLocalCart(product){
  let cart=this.getLocalCart();
  cart.push(product);
  localStorage.setItem(keyName,JSON.stringify(cart));
  
  
}
function findProductInLocalCart(id){
    let cart=this.getLocalCart();
    let product=cart.filter(item=>item.productId===id)
    return product[0]

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
