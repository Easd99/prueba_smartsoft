const { Router } = require('express')
const router = Router()

const categoriesCtrl = require('../controllers/categories.controller.js')


//api/v1/categories/
router.get('/', categoriesCtrl.getCategories)


module.exports = router;