const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

var fs = require('fs');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
const port = 8080;
const ImageDir = path.join(path.resolve(__dirname), 'ImageDir/');


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234567890',
    database: 'reactJSdb'
});


connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});


app.get('/products', function (req, res) {
    connection.query('select * from Products', function (error, results, fields) {
        results.forEach(element => {
            var pathImg = element.image ? path.join(ImageDir, element.image) : null;
            var imageAsBase64 = pathImg ? 'data:image/png;base64,' + fs.readFileSync(pathImg, 'base64') : null;
            element.image = imageAsBase64;
        });
        res.send({ 'products': results })
    });
})

app.get('/products/:id', function (req, res) {
    var id = req.params.id;
    connection.query('select * from Products where id=?', [id], function (error, results, fields) {
        results.forEach(element => {
            var pathImg = element.image ? path.join(ImageDir, element.image) : null;
            var imageAsBase64 = pathImg ? 'data:image/png;base64,' + fs.readFileSync(pathImg, 'base64') : null;
            element.image = imageAsBase64;
        });
        res.send({ 'product': results[0] })
    });
})

app.post('/products/add', function (req, res) {
    var fileStore = req.files.productImage ? Date.now() + req.files.productImage.name : null;
    if (fileStore !== null) req.files.productImage.mv(path.join(ImageDir, fileStore), function (err) {
        console.log(err);
    })
    var prod_name = req.body.prod_name, price = req.body.price;
    connection.query('insert into Products (prod_name,price,image) value (?,?,?)', [prod_name, price, fileStore], function (err, resp, fields) {
        console.log("err: ", err, " resp: ", resp);
        err ? res.send({ "err": err }) : res.send({ "response": "suscess" })
    })
})

app.post('/products/edit/:id', function (req, res) {
    var fileStore = req.files.productImage ? Date.now() + req.files.productImage.name : null;
    if (fileStore !== null) req.files.productImage.mv(path.join(ImageDir, fileStore), function (err) {
        console.log(err);
    })
    var prod_name = req.body.prod_name, price = req.body.price, id = req.params.id;
    connection.query("update Products set prod_name = ?, price = ?, image = ? where id=?", [prod_name, price, fileStore, id], function (err, resp, fields) {
        err ? res.send({ "err": err }) : res.send({ "response": "suscess" })
    })
})

app.post('/products/delete/:id', function (req, res) {
    var id = req.params.id;
    connection.query("delete from Products where id=?", [id], function (err, resp, fields) {
        err ? res.send({ "err": err }) : res.send({ "response": "suscess" })
    })
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

