import {
  connection,
  DataTypes,
} from "/home/milene/Documents/Desafio-Tecnico-Monks-Media/app.js";

const Marca = connection.define("Marca", {
  id_marca: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
  },
});

const Venda = connection.define("Venda", {
  data: {
    type: DataTypes.DATEONLY,
  },
  id_marca: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  vendas: {
    type: DataTypes.INTEGER,
  },
  valor_do_veiculo: {
    type: DataTypes.INTEGER,
  },
  nome: {
    type: DataTypes.STRING,
  },
});

// Relacionamento entre as tabelas
Marca.hasMany(Venda, { foreignKey: "id_marca" });
Venda.belongsTo(Marca, { foreignKey: "id_marca" });

export { Marca, Venda };
