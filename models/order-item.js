const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const OrderItem = sequelize.define(
    "oderItem",
    {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
            unique:true
        },
        quantity:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    }
)

module.exports = OrderItem;