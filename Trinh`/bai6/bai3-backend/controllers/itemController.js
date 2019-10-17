const path = require('path');
const thumb = require('node-thumbnail').thumb;

let ItemService;

export default class ItemController {
    constructor(injectedItemService) {
        ItemService = injectedItemService;
    }

    getItemImage(req, res) {
        res.sendFile(path.join(__dirname, '../public/item-images/', req.params.imageName), err => {
            if (err) {
                console.log(err);
                res.sendFile(path.join(__dirname, '../public/item-images/', 'thumb-mu3.png'));
              }
        });
    }

    uploadImage(req,res) {
        try {
            if(!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                let image = req.files.image;
                
                var imageDir = path.join(__dirname, '../public') + '/item-images/' + image.md5 + image.name.slice(-5);
                var thumbnailDir = path.join(__dirname, '../public') + '/item-images/';
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
    }

    addNewItem(req, res) {
        ItemService.addNewItem(req.body, rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }

    getListItems(req, res) {
        ItemService.getListItems(rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }

    editItem(req, res) {
        ItemService.editItem(req.params.id, req.body, rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }

    deleteItem(req, res) {
        ItemService.deleteItem(req.params.id, rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }

    getItemById(req, res) {
        ItemService.getItemById(req.params.id , rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }
}
