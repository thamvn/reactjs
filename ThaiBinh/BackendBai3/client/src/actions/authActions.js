import axios from 'axios'
import {returnErrors} from './errorActions'
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    } from './type'

//Check for token and load user
export const loadUser=()=>(dispatch,getState)=>{
    //User Loading
    dispatch({type:USER_LOADING});

   

    return axios.get('/api/auth/user',tokenConfig(getState))
        .then(res=>dispatch({
            type:USER_LOADED,
            payload:res.data

        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({
                type:AUTH_ERROR
            })
        })
}
//Register user
export const register=({name,email,password})=>dispatch=>{
    
    //headers
    const config={
        headers:{
            "Content-type":"application/json"
        }
    }
    //Request body
    const body=JSON.stringify({name,email,password});
    axios.post('api/users/register',body,config)
        .then(res=>{
            window.location.reload()
            dispatch({
            type: REGISTER_SUCCESS,
            payload :res.data,
        })})
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
            dispatch({
                type:REGISTER_FAIL,

            })})
}
export const logout=()=>{
    window.location.reload()
    return {
        
        type:LOGOUT_SUCCESS,
    };
   
};
//Login user
export const login=({email,password})=>dispatch=>{
     //headers
     const config={
        headers:{
            "Content-type":"application/json"
        }
    }
    //Request body
    const body=JSON.stringify({email,password});
    axios.post('api/auth/login',body,config)
        .then(res=>{
            window.location.reload()
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            
        }
        )
        .catch(err=>{
            if(err.response){
                dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
            }
            
            dispatch({
                type:LOGIN_FAIL,

            })})
}
//Setup config/headers and token
export const tokenConfig=getState=>{
     //get token from localStorage
     const token=getState().auth.token
    
     //Headers
     const config={
         headers:{
             "Content-type":"application/json"
         }
     }
     //If token, add to headers
     if(token){
         config.headers['x-auth-token']=token;
 
     }
     return config
}