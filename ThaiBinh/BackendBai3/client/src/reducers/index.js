import { combineReducers } from 'redux'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'



export default combineReducers({
    products: productReducer,
    cart: cartReducer,
    error:errorReducer,
    auth:authReducer,
    
})