const typeorm = require("typeorm");

const connection = typeorm.createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "12345",
    database: "products_db",
    synchronize: true,
    logging: false,
    entities: [
        require("./entity/ProductSchema"),
        require("./entity/CategorySchema"),
        require("./entity/UserSchema")
    ]
})

module.exports = connection