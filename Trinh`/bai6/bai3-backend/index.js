import {
    checkoutRoute,
    checkoutController,
    itemRoute,
    itemController
} from './controllers';

import {
    ItemService,
    CheckoutService
} from './services';

const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const mySqlConnection = require('./services/db');

const itemSer = new ItemService(mySqlConnection);
const checkoutSer = new CheckoutService(mySqlConnection);

const app = express();

// Serve the static files from the React app
let frontendDir = path.join(__dirname, '../bai3/public');
app.use(express.static(frontendDir));
app.use('/home/trinhdn/temp/bai3/public/item-images', express.static(path.resolve("/public/item-images")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(morgan('dev'));
// app.use(cors);

let itemMethods = new itemController(itemSer);
app.use('/items', itemRoute(express.Router(), itemMethods));

let checkoutMethods = new checkoutController(checkoutSer);
app.use('/checkout', checkoutRoute(express.Router(), checkoutMethods));

const port = process.env.PORT || 9091;
app.listen(port);

console.log('App is listening on port ' + port);
