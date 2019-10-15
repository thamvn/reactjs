export const CheckoutService = {
    getCart,
    addToCart,
    removeFormCart,
    isExistInCart,
    getTotalPrice
}

function getCart(){
    let cart = JSON.parse(window.localStorage.getItem('cart'));

    return cart || [];
}

function addToCart(item){
    let cart = this.getCart();

    cart.push(item);
    window.localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
}


function removeFormCart(itemId){
    let cart = getCart();
    let newCart = [];
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id !== itemId){
            newCart.push(cart[i]);
        }
    }

    window.localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
}

function isExistInCart(id){
    let cart = getCart();

    return cart.findIndex(item => { return item.id === id }) >= 0;
}

function getTotalPrice() {
    let cart = getCart(), ret = 0;
    
    for (var el in cart) {
        ret += cart[el].price;
    }

    return ret;
}