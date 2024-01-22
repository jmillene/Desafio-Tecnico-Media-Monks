(async () => {
    const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");
    const Venda = require("/home/milene/Desafio-Tecnico-Monks-Media/Model/VendaVeiculo.js");
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

(async () => {
    const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");
    const Marca = require("/home/milene/Desafio-Tecnico-Monks-Media/Model/MarcaVeiculo.js");
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();