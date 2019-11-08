
const keyName='products';
export const productService={
    setProductsToStore,
    setProductsToLocalStorage,
    getProducts,
    newProduct,
    deleteProduct,
    editProduct,
    getProductById
}
function setProductsToStore(){
    let products=[];
    const basePrice=1000;
    
    
    for(var i=0;i<4;i++){
        products.push({
            
            id:i+1,
            isClicked:false,
            name:`Product ${i+1}`,
            price:basePrice*(i+1),


        })
    }

    localStorage.setItem(keyName,JSON.stringify(products));
    
    return products;
}
function setProductsToLocalStorage(products){
    localStorage.setItem(keyName,JSON.stringify(products));
    
}
function getProducts(){
    let products=JSON.parse(localStorage.getItem(keyName));
    return products;
}
function newProduct(newProduct){
    let products=this.getProducts();
    newProduct.id=products[products.length-1].id+1;
    newProduct.price=parseInt(newProduct.price);
    products.push(newProduct);
    setProductsToLocalStorage(products);
}
function deleteProduct(id){
    let products=this.getProducts();
    let newProducts=products.filter(product=>product.id!==id)
    return newProducts;
}
function editProduct(productEdited){
    let products=this.getProducts();
    for(let i=0;i<products.length;i++){
        if(productEdited.id===products[i].id){
        console.log(products[i].id)
            
            
            products[i].price=productEdited.price;
            products[i].name=productEdited.name;
        }
    }
    console.log(products);
    setProductsToLocalStorage(products);
   
}
function getProductById(productId){
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
