import axios from 'axios'
import { GET_CART,REMOVE_FROM_CART,CART_LOADING,EDIT_CART } from "./type";


export const getCart=()=> dispatch =>{
    dispatch(setCartLoading());
    axios.get('api/cart')
         .then(res=>
             dispatch({
                 type:GET_CART,
                 payload:res.data
             })
         )
 }
 export const editCart=(product)=>dispatch=>{
    axios.put(`/api/cart/${product._id}`,product)
    .then(res=>
        dispatch({
            type:EDIT_CART,
            payload:res.data
        })
        .then(alert("Edited"))
    )
    .catch(err=>console.log(err))
    
 }
 export const removeFromCart=(id)=>dispatch=>{
    axios.delete(`/api/cart/${id}`)
    .then(res=>
        dispatch({
            type:REMOVE_FROM_CART,
            payload:id
        })
        
    )
    .catch(err=>console.log(err))
    
 }
 export const setCartLoading=()=>{
    return {
        type:CART_LOADING
    }
}