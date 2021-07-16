const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const User = require("../model/User").User; // import {Category} from "../model/Category";

module.exports = new EntitySchema({
    name: "User",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "varchar",
            unique: true
        },
        password: {
            type: "varchar"
        }
    }
});