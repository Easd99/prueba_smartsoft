const Category = require("../model/Category").Category;

const {getRepository} = require('typeorm')

const categoriesCtrl = {}

categoriesCtrl.getCategories = async (req, res) => {
    const repositories = await getRepository(Category).find()
    return res.json(repositories)
}

module.exports = categoriesCtrl;
