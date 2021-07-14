const EntitySchema = require("typeorm").EntitySchema; 
const Product = require("../model/Product.js").Product

module.exports = new EntitySchema({
    name: "Product",
    target: Product,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        price: {
            type: "real"
        },
        inventory: {
            type: "int"
        }
    },
    relations: {
        categories: {
            target: "Category",
            type: "many-to-many",
            joinTable: true,
            cascade: true
        }
    }
});