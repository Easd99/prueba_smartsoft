const { Router } = require('express')
const router = Router()

const productsCtrl = require('../controllers/products.controller')


//api/v1/products/
router.get('/', productsCtrl.getProducts)
router.get('/:id', productsCtrl.getProduct)
router.put('/:id', productsCtrl.updateProduct)
router.delete('/:id', productsCtrl.deleteProduct)
router.post('/', productsCtrl.createProduct)


module.exports = router;