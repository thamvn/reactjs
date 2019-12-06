import axios from 'axios'
import { GET_CART,REMOVE_FROM_CART,CART_LOADING,EDIT_CART,GET_USER_CART,GET_PRODUCT_IN_CART_OF_SPECIFIC_USER } from "./type";


export const getCart=()=> dispatch =>{
    dispatch(setCartLoading());
    return axios.get('/api/cart')
         .then(res=>
             dispatch({
                 type:GET_CART,
                 payload:res.data
             })
         ).catch(err=>dispatch(console.log(err)))
 }
 export const getUserCart=(userId)=>dispatch=>{
    
    return axios.get(`/api/cart/${userId}`)
                .then(res=>
                    dispatch({
                        type:GET_USER_CART,
                        payload:res.data
                    })
                ).catch(err=>console.log(err))
 }
 export const getProductInCartOfSpecificUser=(userId,productId)=>dispatch=>{
     return axios.get(`/api/cart/${userId}/${productId}`)
                    .then(res=>
                        dispatch({
                            type:GET_PRODUCT_IN_CART_OF_SPECIFIC_USER,
                            payload:res.data
                        })
                    ).catch(err=>console.log(err))
 }
 export const editCart=(product)=>dispatch=>{
    axios.put(`/api/cart/${product._id}`,product)
    .then(res=>
        dispatch({
            type:EDIT_CART,
            payload:res.data
        })
       
    )
    .catch(err=>console.log(err))
    
 }
 export const removeFromCart=(id)=>dispatch=>{
    return axios.delete(`/api/cart/${id}`)
    .then(res=>
        dispatch({
            type:REMOVE_FROM_CART,
            payload:res.data
        })
        
    )
    .catch(err=>console.log(err))
    
 }
 export const setCartLoading=()=>{
    return {
        type:CART_LOADING
    }
}