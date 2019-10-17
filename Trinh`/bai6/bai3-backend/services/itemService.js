const path = require('path');
const thumb = require('node-thumbnail').thumb;

let mySqlConnection;

export default class ItemService {
    constructor(injectedSqlConnection) {
        mySqlConnection = injectedSqlConnection;
    }

    getListItems(callback) {
        let selectQuery = `SELECT * FROM items`;

        mySqlConnection.query(selectQuery, [], rs => {
            callback(rs);
        })
    }
    
    addNewItem(item, callback) {
        let insertQuery = `INSERT INTO items (name, price, image) VALUES (?,?,?);`

        mySqlConnection.query(insertQuery, [item.name, item.price, (item.image) ? (item.image) : (null)], rs => {
            callback(rs);
        })
    }
    
    editItem(itemId, item, callback) {
        let selectQuery = `SELECT * FROM items WHERE id = ?;`;
        let updateQuery = `UPDATE items SET name = ?, price = ?, image = ? WHERE id = ?;`;

        mySqlConnection.query(selectQuery, [itemId], selectRs => {
            console.log(selectRs.results);
            let tmpItem = selectRs.results;
            mySqlConnection.query(updateQuery, 
                [(item.name) ? (item.name) : (tmpItem.name),
                (item.price) ? (item.price) : (tmpItem.price),
                (item.image) ? (item.image) : (tmpItem.image),
                itemId], rs => {
                    callback(rs);
            })
        })
    }
    
    deleteItem(itemId, callback) {
        let deleteQuery = `DELETE FROM items WHERE id = ?;`

        mySqlConnection.query(deleteQuery, [itemId], rs => {
            callback(rs);
        })
    }
    
    getItemById(itemId, callback) {
        let selectQuery = `SELECT * FROM items WHERE id = ?;`;

        mySqlConnection.query(selectQuery, [itemId], rs => {
            callback(rs);
        })
    }
}
