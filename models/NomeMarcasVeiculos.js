const Sequelize = require("sequelize")
require("dotenv").config();
const sequelize = new Sequelize(process.env.MYSQL_DATABASE || "dados", process.env.MYSQL_USER || "myuser", process.env.MYSQL_PASSWORD || "root", {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  dialect: "mysql",
});
const nomeMarcasVeiculosSchema = (sequelize) => {
  const NomeMarcasVeiculos = sequelize.define(
    "NomeMarcasVeiculos",
    {
      id_marca: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_marca",
      },
      marca: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "nome_marcas_veiculos",
      underscored: true,
      timestamps: false,
    }
  );
  return NomeMarcasVeiculos;
};


module.exports = {
  sequelize,
  NomeMarcasVeiculos: nomeMarcasVeiculosSchema(sequelize),
}
