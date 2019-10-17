let itemRoute = (router, itemMethods) => {
    router.get('/image/:imageName', itemMethods.getItemImage);
    router.post('/image/add', itemMethods.uploadImage);
    router.post('/add', itemMethods.addNewItem);
    router.get('/', itemMethods.getListItems);
    router.post('/edit/:id', itemMethods.editItem);
    router.get('/delete/:id', itemMethods.deleteItem);
    router.get('/:id', itemMethods.getItemById);
    return router;
}

exports.itemRoute = itemRoute;