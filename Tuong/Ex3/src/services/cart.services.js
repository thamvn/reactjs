const cartItemName = 'cart';

export const cartService = {
    getCart

}

function getCart(){
    let cart = JSON.parse(window.localStorage.getItem(cartItemName));
    if (cart === [] || !cart) return [];
    else return cart;
}