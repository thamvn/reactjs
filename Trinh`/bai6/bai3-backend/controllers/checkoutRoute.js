let checkoutRoute = (router, checkoutMethods) => {
    router.get('/', checkoutMethods.getCart);
    router.post('/add', checkoutMethods.addToCart);
    router.get('/delete/:id', checkoutMethods.removeFromCart);
    router.get('/incart/:id', checkoutMethods.isExistInCart);
    router.get('/total', checkoutMethods.getTotalPrice);
    return router;
}

exports.checkoutRoute = checkoutRoute;