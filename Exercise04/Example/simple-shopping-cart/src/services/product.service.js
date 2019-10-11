import {commonConstants} from '../common/constants';

export const productService = {
    getProducts,
    newProduct
}

function getProducts(){
    let products = JSON.parse(window.localStorage.getItem(commonConstants.productItemName));

    if(!products || products.length == 0){
        products = [];
        const basePrice = 9;
        for(var i = 0; i < 10; i++){
            products.push({id: i+1, 
                            name: `Lesson ${i+1}`, 
                            isAdded: false, 
                            price: basePrice*i
                        });
        }
        window.localStorage.setItem(commonConstants.productItemName, JSON.stringify(products));
    }
    return products;
}

function newProduct(product){
    let products = this.getProducts();
    product.id = products.length + 1;
    product.price = parseInt(product.price);
    products.push(product);
    window.localStorage.setItem(commonConstants.productItemName, JSON.stringify(products));
}
