const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
// const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const routes = require('./routes');
const app = express();

// Serve the static files from the React app
let frontendDir = path.join(__dirname, '../bai3/public');
app.use(express.static(frontendDir));
app.use('/home/trinhdn/temp/bai3/public/item-images', express.static(path.resolve("/public/item-images")))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(morgan('dev'));
// app.use(cors);

routes(app);

const port = process.env.PORT || 9091;
app.listen(port);

console.log('App is listening on port ' + port);