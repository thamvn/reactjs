import axios from 'axios';

export const itemService={
    // setDataToStore,
    getProducts,
    addNewItem,
    editItem,
    deleteItem,
    getProductbyId
}

// function setDataToStore(){
//     let products=[];
//         const basePrice = 5;
//         for(var i=0;i<=10;i++){
//             products.push({
//             id:i+1,
//             name:`product ${i+1}`,
//             isAdded: false,
//             price: basePrice*i
//             });
        
//         window.localStorage.setItem("products", JSON.stringify(products));
//     }
//     console.log(products)
//   return products;
// }

function getProducts(){
    // let products = JSON.parse(localStorage.getItem("products")) || [];
    // if(products){
    //     let products=[];
    //     const basePrice = 5;
    //     for(var i=0;i<=20;i++){
    //         products.push({
    //         id:i+1,
    //         name:`product ${i+1}`,
    //         isAdded: false,
    //         price: basePrice*i
    //         });
    //     window.localStorage.setItem("products", JSON.stringify(products));
    //     }
    // return products;
    // }
    return axios.get('http://localhost:5000/api/products')
        .then(res => res.data)
        .catch(err =>console.log(err));
    // fetch.get('api/products')
    // .then(res => res.json())
    // .then(p => console.log(p))
}

function addNewItem(newItem){
//     let products = this.getProducts();
//     newItem.id = products[products.length-1].id +1;
//     newItem.price = Number(newItem.price);
//     products.push(newItem);
//   localStorage.setItem("products",JSON.stringify(products));
    axios.post('http://localhost:5000/api/products/add',newItem)
        .then(res =>{return res.data})
        .catch(err=>{return console.log(err)});
}

function deleteItem(id){
    // let products=this.getProducts();
    // // let newProducts=products.filter(product=>product.id!==id);
    // let newProducts = products.findIndex(item => item.id === id);
    // products.splice(newProducts,1);
    // return newProducts;

    axios.delete(`http://localhost:5000/api/products/remove/${id}`)
        .then(res=>console.log(res.data))
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


