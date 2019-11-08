const  keyName="cart";
export const cartService={
    addToCart,
    removeFromCart,
    getCart,
    

}

function getCart(){
    let cart=JSON.parse(localStorage.getItem(keyName));
    return cart||[];
}
function addToCart(product){
  let cart=this.getCart();
  cart.push(product);
  localStorage.setItem(keyName,JSON.stringify(cart));
  
  
}
function removeFromCart(id){
    let cart=this.getCart();
    let newCart=[];
    newCart=cart.filter(product=>product.id!==id);
    localStorage.setItem(keyName,JSON.stringify(newCart));
   
    

    
}