let mySqlConnection;

export default class CheckoutService {
    constructor(injectedSqlConnection) {
        mySqlConnection = injectedSqlConnection;
    }

    getCart(callback){
        let selectQuery = `SELECT * FROM cart;`;

        mySqlConnection.query(selectQuery, [], rs => {
            callback(rs);
        })
    }
    
    addToCart(item, callback){
        let insertQuery = `INSERT INTO cart(item_id, item_name, item_price, item_image) VALUES (?,?,?,?);`;

        mySqlConnection.query(insertQuery, [item.id, item.name, item.price, (!item.image) ? null : item.image], rs => {
            callback(rs);
        });
    }
    
    
    removeFromCart(itemId, callback){
        let deleteQuery = `DELETE FROM cart WHERE item_id = ?;`;

        mySqlConnection.query(deleteQuery, [itemId], rs => {
            callback(rs);
        })
    }
    
    isExistInCart(itemId, callback){
        let selectQuery = `SELECT * FROM cart WHERE item_id = ?`;
        mySqlConnection.query(selectQuery, [itemId], rs => {
            if (!rs.results || rs.results.length === 0)
                callback({results: false, error: null});
            else callback({results: true, error: null});
        })
    }
    
    getTotalPrice(callback) {
        let selectQuery = `SELECT SUM(item_price) as totalPrice FROM cart;`;
        
        mySqlConnection.query(selectQuery, [], rs => {
            callback(rs);
        })
    }
}
