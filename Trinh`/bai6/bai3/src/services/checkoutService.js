import axios from 'axios';

export const CheckoutService = {
    getCart,
    addToCart,
    removeFromCart,
    isExistInCart,
    getTotalPrice
}

function getCart(){
    return axios.get('/checkout/')
        .then(rs => {
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}

function addToCart(item){
    return axios.post('/checkout/add', item)
        .then(rs => {
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}


function removeFromCart(itemId){
    return axios.get('/checkout/delete/' + itemId)
        .then(rs => {
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}

function isExistInCart(itemId){
    return axios.get('/checkout/incart/' + itemId)
        .then(rs => {
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}

function getTotalPrice() {
    return axios.get('/checkout/total')
        .then(rs => {
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}