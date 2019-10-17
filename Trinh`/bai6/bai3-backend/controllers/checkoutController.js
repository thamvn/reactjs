let CheckoutService;

export default class CheckoutController {
    constructor(injectedCheckoutService) {
        CheckoutService = injectedCheckoutService;
    }

    getCart(req, res) {
        CheckoutService.getCart(rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }

    addToCart(req, res) {
        CheckoutService.addToCart(req.body, rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }

    removeFromCart(req, res) {
        CheckoutService.removeFromCart(req.params.id, rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }

    isExistInCart(req, res) {
        CheckoutService.isExistInCart(req.params.id, rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results});
        })
    }

    getTotalPrice(req, res) {
        CheckoutService.getTotalPrice(rs => {
            res.status(!rs.error ? 200 : (rs.error.code || 400)).send({error: rs.error, results: rs.results[0].totalPrice});
        })
    }
}