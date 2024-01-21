import { Sequelize, DataTypes } from 'sequelize';

// Configuração da instância do Sequelize
const connection = new Sequelize('root', 'root', 'root', {
  host: '172.18.0.2',
  dialect: 'mysql',
});

// este de conexão
const conexao = connection.authenticate()
  .then(() => {
    console.log('Conexão com o banco bem-sucedida');

    //modelo
    const DataModel = connection.define('Data', {
      jsonData: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    });

    // Sincronize o modelo com o banco de dados
    return connection.sync();
  })
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados');
  })
  .catch((err) => {
    console.log('Não foi possível estabelecer uma conexão:', err);
  });

export default DataModel;