const fs = require("fs");
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");
const DadosVendasVeiculos =
  require("../model/DadosVendasVeiculos.js")(
    database
  );

async function lendo_Database_1() {
  try {
    let data1 = await fs.promises.readFile(
      "/home/milene/Desafio-Tecnico-Monks-Media/databases/broken_database_1.json",
      "utf8"
    );
    return JSON.parse(data1);
  } catch (error) {
    console.error("Erro ao carregar JSON:", error);
    return null;
  }
}

async function corrigir_json() {
  let jsonData1 = await lendo_Database_1();

  if (jsonData1) {
    let json_nome_veiculo_corrigido_1 = jsonData1.map((item) => {
      if (item.nome && typeof item.nome === "string") {
        item.nome = item.nome.replace(/æ/g, "a").replace(/ø/g, "o");
      }
      if (item.vendas && typeof item.vendas === "string") {
        item.vendas = Number(item.vendas);
      }
      return item;
    });
    await fs.promises.writeFile(
      "arquivos corrigidos/broken_database_1_corrigido.json",
      JSON.stringify(json_nome_veiculo_corrigido_1),
      "utf-8"
    );
  }
  // Promise é um objeto usado para processamento assíncrono. 
  // Um Promise (de "promessa") representa um valor que pode estar disponível agora, no futuro ou nunca.
}
async function salvar_dados_myqsl(){



}
corrigir_json();
