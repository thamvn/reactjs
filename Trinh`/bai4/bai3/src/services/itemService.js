import {CheckoutService} from './index';

export const ItemService = {
    getListItems,
    addNewItem,
    editItem,
    deleteItem,
    getItemById
}

function getListItems() {
    let itemList = JSON.parse(window.localStorage.getItem('items'));

    if(!itemList || itemList.length === 0){
        itemList = [];
        for(var i = 0; i < 50; i++){
            itemList.push({id: i, 
                            name: `Mũ bảo hiểm ${i+1}`,
                            price: 10*i,
                            image: `mu${(i%3)+1}.${(i%3 === 2) ? ('png') : ('jpg')}`
                        });
        }
        window.localStorage.setItem('items', JSON.stringify(itemList));
    }
    return itemList;
}

function addNewItem(item) {
    let itemList = this.getListItems();
    item.id = itemList.length + 1;
    item.price = parseFloat(item.price);
    itemList.push(item);
    window.localStorage.setItem('items', JSON.stringify(itemList));
    alert('Add new item successfully');
}

function editItem(itemId, item) {
    let itemList = this.getListItems();
    let tmpItemIdx = itemList.findIndex(el => {return el.id == itemId});

    console.log(itemId);
    console.log(item);

    itemList[tmpItemIdx].name = (item.name) ? (item.name) : (itemList[tmpItemIdx].name);
    itemList[tmpItemIdx].price = (item.price) ? (item.price) : (itemList[tmpItemIdx].price);
    itemList[tmpItemIdx].image = (item.image) ? (item.image) : (itemList[tmpItemIdx].image);

    console.log(itemList[tmpItemIdx]);

    window.localStorage.setItem('items', JSON.stringify(itemList));

    if (CheckoutService.isExistInCart(itemId)) {
        CheckoutService.removeFormCart(itemId);
        CheckoutService.addToCart(item);
    }
    alert(`Edit item ${item.name} successfully`);
}

function deleteItem(itemId) {
    let itemList = this.getListItems();
    // console.log(JSON.stringify(itemList));
    let newItemList = [];
    for(let i = 0; i < itemList.length; i++){
        if(itemList[i].id != itemId){
            newItemList.push(itemList[i]);
        }
    }
    window.localStorage.setItem('items', JSON.stringify(newItemList));
    // console.log(JSON.stringify(newItemList));
    CheckoutService.removeFormCart(itemId);
    alert('Delete item successfully');
}

function getItemById(itemId) {
    let itemList = this.getListItems();
    let ret = itemList.find(el => {return el.id == itemId;});

    return ret;
}