const Product = require("../model/Product").Product;
const {getRepository} = require('typeorm')


const productsCtrl = {}

productsCtrl.getProducts = async (req, res) => {
    const repositories = await getRepository(Product).find()
    return res.json(repositories)
    
}
productsCtrl.createProduct = async (req, res) => {
    //const {name, price, inventory } = req.body
    const newProduct = await getRepository(Product).create(req.body)
    const result = await getRepository(Products).save(newProduct)
    return res.json(result)
}

module.exports = productsCtrl;
