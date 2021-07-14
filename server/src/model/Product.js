class Product {
    constructor(id, name, price, inventory) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.inventory = inventory;
    }
}

module.exports = {
    Product: Product
};