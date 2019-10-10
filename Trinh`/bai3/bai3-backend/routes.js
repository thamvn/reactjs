const path = require('path');

module.exports = function(app) {
    let frontendDir = path.join(__dirname, '../bai3/public');

    app.route('/addItem')
        .post((req, res) => {
            try {
                if(!req.files) {
                    res.send({
                        status: false,
                        message: 'No file uploaded'
                    });
                } else {
                    // console.log(req.files);
                    let image = req.files.image;
                    
                    var imageDir = frontendDir + '/item-images/' + image.md5 + image.name.slice(-4);
                    image.mv(imageDir);
    
                    //push file details
                    let data = {
                        name: image.md5 + image.name.slice(-4),
                        mimetype: image.mimetype
                    };
            
                    //return response
                    res.send({
                        status: true,
                        message: 'Files are uploaded',
                        data: data
                    });
                }
            } catch (err) {
                res.status(500).send(err);
            }
        });

    // Handles any requests that don't match the ones above
    app.get('/public/item-images/:imageName', (req,res) =>{
        res.sendFile(path.join(__dirname, '../bai3/public/item-images', req.params.imageName));
    });
}