import ListItems from './ListItems'
import Checkout from './Checkout'
import AddItem from './AddItem'
import Home from './home'

const routes = [
    { path: '/', name: 'Home', component: Home, exact:true},
    { path: '/items', name: 'List Items', component: ListItems, exact:true },
    { path: '/checkout', name: 'Checkout', component: Checkout, exact:true},
    { path: '/add', name: 'Add Item', component: AddItem, exact:true},
]
export default routes