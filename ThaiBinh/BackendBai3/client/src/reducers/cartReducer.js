import {GET_CART,REMOVE_FROM_CART,EDIT_CART} from '../actions/type'
const initialState={
    cart:[],
    loading:false
    
}
export default function(state=initialState,action){
    switch(action.type){
        case GET_CART:
            return{
                ...state,
                cart:action.payload,
                loading:false
            }
            case EDIT_CART:
                return{
                    ...state,
                    cart:action.payload,
                    
            }
            case REMOVE_FROM_CART:
                return{
                    ...state,
                    cart:state.cart.filter(product =>product._id!==action.payload)
                    
            }
            
            
        
        default:
            return state
    }
}