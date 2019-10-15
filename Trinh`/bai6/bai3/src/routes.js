import Items from './pages/Items';
import Checkout from './pages/Checkout';
import Home from './pages/Home'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'

const routes = [
    { path: '/', name: 'Home', component: Home, exact: true},
    { path: '/items', name: 'Items', component: Items, exact: true },
    { path: '/checkout', name: 'Checkout', component: Checkout, exact: true},
    { path: '/add', name: 'Add Item', component: AddItem, exact: true},
    { path: '/edit/:itemId', name: 'Edit' , component: EditItem, exact: true}
];

export default routes;
