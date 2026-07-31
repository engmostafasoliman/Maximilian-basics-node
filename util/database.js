const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete","root","devmostafasoliman@01",{
    dialect:"mysql",
    host:"localhost"
});
module.exports = sequelize;