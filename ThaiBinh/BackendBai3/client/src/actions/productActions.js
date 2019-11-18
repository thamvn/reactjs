import axios from 'axios'
import { GET_PRODUCTS,ADD_PRODUCT,DELETE_PRODUCT,PRODUCTS_LOADING,ADD_TO_CART,GET_PRODUCT_BY_ID,EDIT_PRODUCT } from "./type";


export const getProducts=()=> dispatch =>{
   dispatch(setProductsLoading());
   axios.get('api/products')
        .then(res=>
            dispatch({
                type:GET_PRODUCTS,
                payload:res.data
            })
        )
}
export const deleteProduct=(id)=>dispatch=>{
   axios.delete(`/api/products/${id}`)
        .then(res=>
            dispatch({
                type:DELETE_PRODUCT,
                payload:id
            })
        )
}
export const addProduct=(newProduct)=>dispatch=>{
    axios.post('/api/products',newProduct)
        .then(res=>
            dispatch({
                type:ADD_PRODUCT,
                payload:res.data
            })
        )
}
export const addToCart=(product)=>dispatch=>{
    dispatch(setProductsLoading());
    axios.post('/api/cart',product)
    .then(res=>
        dispatch({
            type:ADD_TO_CART,
            payload:res.data
        })
        
    )
    .catch(err=>console.log(err))
    
 }
 
 export const getProductById=(id)=>dispatch=>{
    dispatch(setProductsLoading());
     axios.get(`/api/products/${id}`)
        .then(res=>
            dispatch({
                type:GET_PRODUCT_BY_ID,
                payload:res.data
            }))
        

 }
 export const editProduct=(product)=>dispatch=>{

    axios.put(`/api/products/${product._id}`,product)
    .then(res=>
        dispatch({
            type:EDIT_PRODUCT,
            payload:res.data
        })
        .then(alert("Editting Successfully"))
    )
    .catch(err=>console.log(err))
 }
export const setProductsLoading=()=>{
    return {
        type:PRODUCTS_LOADING
    }
}