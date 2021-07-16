const Product = require("../model/Product").Product;
const Category  = require("../model/Category").Category;
const client = require('../redisdb')
const {getRepository, Like} = require('typeorm')


const productsCtrl = {}


//GET all Products
productsCtrl.getProducts = async (req, res) => {
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
    const resultado = await client.keys(`product_${id}`)
    if (resultado.length === 0){
        return res.status(404).json({error:"NOT FOUND"})
    }
    product = await client.get(resultado[0])
    product_json = JSON.parse(product)
    return res.json(product_json)
}

//Update one Product
productsCtrl.updateProduct = async (req, res) => {
    const {id} = req.params
    const {category, price, inventory } = req.body
    const oldProduct = await getRepository(Product).findOne(id)
    if(oldProduct){
        getRepository(Product).merge(oldProduct, req.body)
        const newProduct = await getRepository(Product).save(oldProduct)
        var find_category = await getRepository(Category).findOne(
            { where:
                { name: category }
        })
        
        if(!find_category){
            hcategory={
                name: category
            }
            const newCategory = getRepository(Category).create(hcategory)
            find_category = await getRepository(Category).save(newCategory)
        }

        newProduct.categories = [find_category]
        const resultado = await client.keys(`product_${id}`)
        client.set(resultado[0],JSON.stringify(newProduct))
        return res.json(newProduct)
    }
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
    const {category, price, inventory } = req.body
    const newProduct = await getRepository(Product).create(req.body)
    var find_category = await getRepository(Category).findOne(
        { where:
            { name: category }
        })
    
    if(!find_category){
            hcategory={
                name: category
            }
            const newCategory = getRepository(Category).create(hcategory)
            find_category = await getRepository(Category).save(newCategory)
    }
    newProduct.categories = [find_category]
    const product = await getRepository(Product).save(newProduct)
    
    client.set(`product_${product.id}`,JSON.stringify(product))
    return res.status(201).json(product)
}

module.exports = productsCtrl;
