import axios from 'axios';

export const itemService={
    // setDataToStore,
    getProducts,
    addNewItem,
    editItem,
    deleteItem,
    getProductbyId,
    changeStyleStatus
}

function getProducts(){
    return axios.get('/api/products')
        .then(res => res.data)
        .catch(err =>console.log(err));
}

function addNewItem(newItem){
    return axios.post('/api/products/add',newItem)
        .then(res =>{return res.data})
        .catch(err=>{return console.log(err)});
}

function changeStyleStatus(id){
    return axios.post(`/api/products/changestatus/${id}`)
                .then(res => {return res.data})
                .catch(err=>{return console.log(err)});
}

function deleteItem(id){
    return axios.delete(`/api/products/remove/${id}`)
        .then(res=>{return res.data})
        .catch(err=>{return console.log(err)})
}

function editItem(id){
    let products = this.getProducts();
    let i = products.findIndex(d => d.id === id);
    const price = Number(products.price);
    products[i].name = products.name;
    products[i].price = price;
    localStorage.setItem("products",JSON.stringify(products));
}

function getProductbyId(productId){
    let products=this.getProducts();
   
    let product={name:"",price:0};
    for(let i=0;i<products.length;i++){
        if(products[i].id===productId){
            product.id=products[i].id;
            product.name=products[i].name;
            product.price=products[i].price;
        }
    }
    
    return product;
}


