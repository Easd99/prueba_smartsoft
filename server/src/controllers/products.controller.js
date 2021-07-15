const Product = require("../model/Product").Product;
const Category   = require("../model/Category").Category;
const client = require('../redisdb')
const {getRepository} = require('typeorm')


const productsCtrl = {}


//GET all Products
productsCtrl.getProducts = async (req, res) => {
    //const products = await getRepository(Product).find({ relations: ["categories"] })

    var products = []
    const resultado = await client.keys(`product_*`)

    resultado.forEach(async function (data, indice_, array_) {
        product = await client.get(data)
        product_json = JSON.parse(product)
        products.push(product_json)
    })

    const prod_ = await client.get(resultado[0])

    return res.json(products)
}

//GET one Product by id
productsCtrl.getProduct = async (req, res) => {
    const {id} = req.params
    //const product = await getRepository(Product).findOne(id, { relations: ["categories"] })
    // if (!product){
    //     return res.status(404).json({error:"NOT FOUND"})
    // }
    const resultado = await client.keys(`product_${id}`)
    if (resultado.length === 0){
        return res.status(404).json({error:"NOT FOUND"})
    }
    product = await client.get(resultado[0])
    product_json = JSON.parse(product)
    return res.json(product_json)
}

//DELETE one Product by id
productsCtrl.deleteProduct = async (req, res) => {
    const {id} = req.params
    const product = await getRepository(Product).delete(id)
    if(product.affected == 0){
        return res.status(404).json({error:"NOT FOUND"})
    }
    const resultado = await client.keys(`product_${id}`)
    client.del(resultado[0])
    return res.status(204).json({ok:"ok"})
}

//Create new Product
productsCtrl.createProduct = async (req, res) => {
    //const {name, price, inventory } = req.body
    const {category, price, inventory } = req.body
    const newProduct = await getRepository(Product).create(req.body)
    const find_category = await getRepository(Category).findOne(
        { where:
            { name: category }
        })
    newProduct.categories = [find_category]
    const product = await getRepository(Product).save(newProduct)
    
    client.set(`product_${product.id}`,JSON.stringify(product))
    return res.status(201).json(product)
}

module.exports = productsCtrl;
