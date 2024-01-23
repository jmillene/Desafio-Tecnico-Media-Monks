const databasePath = "/home/milene/Desafio-Tecnico-Monks-Media/app.js";
const vendaModelPath = "/home/milene/Desafio-Tecnico-Monks-Media/Model/DadosVendaVeiculos.js";
const marcaModelPath = "/home/milene/Desafio-Tecnico-Monks-Media/Model/NomeMarcaVeiculos.js";

const syncDatabase = async (modelPath) => {
    try {
        const database = require(databasePath);
        const Model = require(modelPath);

        if (database && database.sync) {
            const resultado = await database.sync();
            console.log(resultado);
        } else {
            console.log("Banco de dados ou método sync não encontrado.");
        }
    } catch (error) {
        console.log(error);
    }
};

// Exemplo de uso para Venda
syncDatabase(vendaModelPath);

// Exemplo de uso para Marca
syncDatabase(marcaModelPath);
