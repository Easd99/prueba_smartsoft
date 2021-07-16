const { Router } = require('express')
const router = Router()

const userCtrl = require('../controllers/users.controllers')


//api/v1/products/
router.post('/signin', userCtrl.getUser)
router.post('/signup', userCtrl.createUser)


module.exports = router;