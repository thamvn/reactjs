const path = require('path');
const thumb = require('node-thumbnail').thumb;

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
                    let image = req.files.image;
                    
                    var imageDir = frontendDir + '/item-images/' + image.md5 + image.name.slice(-5);
                    var thumbnailDir = frontendDir + '/item-images/';
                    image.mv(imageDir);
                    
                    // generate thumbnail in item-images folder
                    thumb({
                        source: imageDir,
                        destination: thumbnailDir,
                        prefix: 'thumb-',
                        suffix: '',
                        width: 150,
                        concurrency: 4
                      }, function(files, err, stdout, stderr) {
                        console.log('Convert to thumbnail done!');
                      });
    
                    let data = {
                        name: image.md5 + image.name.slice(-5),
                        mimetype: image.mimetype
                    };                    
                    
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

    app.get('/public/item-images/:imageName', (req,res) =>{
        res.sendFile(path.join(__dirname, '../bai3/public/item-images', req.params.imageName));
    });
}
