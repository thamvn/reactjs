import {commonConstants} from '../common/constants';

export const cartService = {
    getCart,
    addToCart,
    removeFormCart,
    isExistInCart
}

function getCart(){
    let cart = JSON.parse(window.localStorage.getItem(commonConstants.cartItemName));

    return cart||[];
}

function addToCart(product){
    let cart = this.getCart();

    cart.push(product);
    window.localStorage.setItem(commonConstants.cartItemName, JSON.stringify(cart));
    return cart;
}


function removeFormCart(id){
    let cart = getCart();
    let newCart = [];
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id != id){
            newCart.push(cart[i]);
        }
    }

    window.localStorage.setItem(commonConstants.cartItemName, JSON.stringify(newCart));
    return cart;
}

function isExistInCart(id){
    let cart = getCart();

    return cart.findIndex(item => { return item.id == id }) >= 0;
}