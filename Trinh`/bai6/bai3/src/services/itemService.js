import axios from 'axios';

export const ItemService = {
    getListItems,
    addNewItem,
    editItem,
    deleteItem,
    getItemById
}

function getListItems() {
    return axios.get('/items/')
        .then(rs => {
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}

function addNewItem(item) {
    return axios.post('/items/add', item)
        .then(rs => {
            alert('Add new item successfully');
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}

function editItem(itemId, item) {
    return axios.post('/items/edit/' + itemId, item)
        .then(rs => {
            alert(`Edit item ${item.name} successfully`);
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}

function deleteItem(itemId) {
    return axios.get('/items/delete/' + itemId)
        .then(rs => {
            alert('Delete item successfully');
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}

function getItemById(itemId) {
    return axios.get('/items/' + itemId)
        .then(rs => {
            return rs.data.results;
        })
        .catch(err => {
            console.log('err: ');
            console.log(err);
        })
}