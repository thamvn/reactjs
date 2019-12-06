const keyName='size'
export const productService={
    setProductsPerPageToLocal,
    getProductsPerPageFromLocal

}
function setProductsPerPageToLocal(size){
    localStorage.setItem(keyName,JSON.stringify(size))
}
function getProductsPerPageFromLocal(){
    let size=Number(JSON.parse(localStorage.getItem(keyName)));
    return size
}