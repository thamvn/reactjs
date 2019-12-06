import axios from 'axios'
import { GET_PRODUCTS,ADD_PRODUCT,DELETE_PRODUCT,PRODUCTS_LOADING,ADD_TO_CART,GET_PRODUCT_BY_ID,EDIT_PRODUCT,COUNT_PRODUCTS,GET_PRODUCTS_BY_PAGE } from "./type";
import {tokenConfig,tokenProductConfig} from './authActions'
import {returnErrors} from './errorActions'


export const countProducts=()=> dispatch =>{
    
    return axios.get('/api/products/num')
         .then(res=>
             dispatch({
                 type:COUNT_PRODUCTS,
                 payload:res.data
             })
         )
         .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)))
 }
export const getProducts=()=> dispatch =>{
   dispatch(setProductsLoading());
   return axios.get('/api/products')
        .then(res=>
            dispatch({
                type:GET_PRODUCTS,
                payload:res.data
            })
        )
        .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)))
}
export const getProductsByPage=(page,size)=> dispatch =>{
    dispatch(setProductsLoading());
    console.log('page '+page,'size '+size)
    return axios.get(`/api/products/${page}/${size}`)
         .then(res=>
             dispatch({
                 type:GET_PRODUCTS_BY_PAGE,
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
    const data = new FormData();
    data.append('productImage',newProduct.image);
    data.append('name',newProduct.name);
    data.append('price',newProduct.price)
    axios.post('/api/products',data,tokenProductConfig(getState))
        .then(res=>
            dispatch({
                type:ADD_PRODUCT,
                payload:res.data
            })
        )
        .catch(err=>
            alert('Create product failed'))
        
}
export const addToCart=(product)=>dispatch=>{
    dispatch(setProductsLoading());
   return axios.post('/api/cart',product)
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
     return axios.get(`/api/products/${id}`)
        .then(res=>
            dispatch({
                type:GET_PRODUCT_BY_ID,
                payload:res.data
            }))
        

 }
 export const editProduct=(product)=>(dispatch,getState)=>{

   return axios.put(`/api/products/${product._id}`,product,tokenConfig(getState))
    .then(res=>
        dispatch({
            type:EDIT_PRODUCT,
            payload:res.data
        })
        
    )
    .catch(err=>dispatch({payload:err.response.data}))
 }
export const setProductsLoading=()=>{
    return {
        type:PRODUCTS_LOADING
    }
}