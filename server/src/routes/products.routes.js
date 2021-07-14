const { Router } = require('express')
const router = Router()

const productsCtrl = require('../controllers/products.controller')


//api/v1/products/
router.get('/', productsCtrl.getProducts)
router.post('/', productsCtrl.createProduct)


module.exports = router;