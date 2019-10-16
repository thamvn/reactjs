import axios from 'axios'
export const handleReq = {
    getProducts,
    getProductById,
    updateProduct,
    delProduct,
    addProduct
}
function getProducts() {
    var config = {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:8080/products'
    }
    return axios(config)
}
function getProductById(id) {
    var config = {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:8080/products/' + id.toString()
    }
    return axios(config)
}
function updateProduct(product,id) {
    var config = {
        method: 'POST',
        header: {
            'Content-Type': 'multipart/form-data'
        },
        data:product,
        url: 'http://localhost:8080/products/edit/' + id.toString()
    }
    return axios(config)
}
function delProduct(id) {
    var config = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:8080/products/delete/' + id.toString()
    }
    return axios(config)
}
function addProduct(product) {
    var config = {
        method: 'POST',
        header: {
            'Content-Type': 'multipart/form-data'
        },
        data: product,
        url: 'http://localhost:8080/products/add'
    }
    return axios(config)
}