
import { GET_PRODUCTS,ADD_PRODUCT,DELETE_PRODUCT,PRODUCTS_LOADING ,ADD_TO_CART,GET_PRODUCT_BY_ID,EDIT_PRODUCT, COUNT_PRODUCTS,GET_PRODUCTS_BY_PAGE   } from "../actions/type";


const initialState={
    products:[],
    product:null,
    cart:[],
    loading:false,
    productsNum:null,
    
}
export default function(state=initialState,action){
    switch(action.type){
        case GET_PRODUCTS:
        case GET_PRODUCTS_BY_PAGE:
            return{
                ...state,
                products:action.payload,
                loading:false
            }
        case COUNT_PRODUCTS:
            return {
                ...state,
                productsNum: action.payload,
               
            } 
        case GET_PRODUCT_BY_ID:
            return{
                ...state,
                products:action.payload,
                loading:false
            }
        case DELETE_PRODUCT:
            return{
                ...state,
                products:state.products.filter(product =>product._id!==action.payload)
            }
        case ADD_PRODUCT:
            return{
                ...state,
                products:[action.payload,...state.products]
            }
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading:true
            }
        case ADD_TO_CART:
            return{
                ...state,
                cart:[action.payload,...state.cart],
                loading:false
            }
        case EDIT_PRODUCT:
            return{
                ...state,
                products:action.payload
            }
        default:
            return state
    }
}