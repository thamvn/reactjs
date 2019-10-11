const productItemName = 'items';

export const productService = {
    getProducts
}

function getProducts(){
    let products = JSON.parse(window.localStorage.getItem(productItemName));
    // console.log("product" + products);

    if(!products ){
        
        products = 
            [
              {
                name: "book",
                price: 3,
                file: '',
                imagePreviewUrl: ''
              },
              {
                name: "clothes",
                price: 5,
                file: '',
                imagePreviewUrl: ''
              },
              {
                name: "hat",
                price: 2,
                file: '',
                imagePreviewUrl: ''
              },
              {
                name: "shoe",
                price: 4,
                file: '',
                imagePreviewUrl: ''
              },
              {
                name: "toy",
                price: 6,
                file: '',
                imagePreviewUrl: ''
              }
            ]
          ;
          window.localStorage.setItem(productItemName, JSON.stringify(products));
        }
    return products;
}

// function newProduct(product){
//     let products = this.getProducts();
//     product.id = products.length + 1;
//     product.price = parseInt(product.price);
//     products.push(product);
//     window.localStorage.setItem(productItemName, JSON.stringify(products));
// }

