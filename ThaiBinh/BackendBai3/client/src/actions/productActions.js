import axios from 'axios'
import { GET_PRODUCTS,ADD_PRODUCT,DELETE_PRODUCT,PRODUCTS_LOADING,ADD_TO_CART,GET_PRODUCT_BY_ID,EDIT_PRODUCT } from "./type";
import {tokenConfig} from './authActions'
import {returnErrors} from './errorActions'

export const getProducts=()=> dispatch =>{
   dispatch(setProductsLoading());
   axios.get('api/products')
        .then(res=>
            dispatch({
                type:GET_PRODUCTS,
                payload:res.data
            })
        )
        .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)))
}
export const deleteProduct=(id)=>(dispatch,getState)=>{

   axios.delete(`/api/products/${id}`,tokenConfig(getState))
        .then(res=>
            dispatch({
                type:DELETE_PRODUCT,
                payload:id
            })
        )
        .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)))
}
export const addProduct=(newProduct)=>(dispatch,getState)=>{
    axios.post('/api/products',newProduct,tokenConfig(getState))
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
 export const editProduct=(product)=>(dispatch,getState)=>{

    axios.put(`/api/products/${product._id}`,product,tokenConfig(getState))
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