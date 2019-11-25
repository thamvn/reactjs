import axios from 'axios';

export const cartService={
    addToCart,
    removeFromCart,
    getCart
}

function getCart(){
    return axios.get('/api/cart')
    .then(res => res.data)
    .catch(err =>console.log(err));
}

function addToCart(item){
    // let cart = this.getCart();
    // cart.push(item);
    return axios.post('/api/cart/add', item)
    .then(res=>{return res.data})
    .catch(function (error) {
      console.log(error);
    });

    // localStorage.setItem("cart",JSON.stringify(cart));
}

function removeFromCart(id){
    console.log(id)
    // let cart = this.getCart();
    // let newCart = cart.filter(p => p.id !== id+1);
    // localStorage.setItem("cart",JSON.stringify(newCart));
    // axios.delete(`http://localhost:5000/api/cart/remove/${id}`)
    axios.delete(`/api/cart/remove/${id}`)
    .then(res=>{return console.log(res.data)})
    .catch(function (error) {
      console.log(error);
    });
}