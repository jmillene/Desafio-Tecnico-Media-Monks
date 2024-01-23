const fs = require("fs");
const {
  DadosVendasVeiculos,
  database,
} = require("/home/milene/Desafio-Tecnico-Monks-Media/Model/DadosVendaVeiculos.js");

async function lendo_Database_1() {
  try {
    let data1 = await fs.promises.readFile(
      "databases/broken_database_1.json",
      "utf8"
    );
    return JSON.parse(data1);
  } catch (error) {
    console.error("Erro ao carregar JSON:", error);
    return null;
  }
}

async function corrigir_e_salvar_json_1() {
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

    try {
      await database.sync(); // Sincroniza os modelos com o banco de dados
      console.log("Modelos sincronizados com o banco de dados");

      await fs.promises.writeFile(
        "arquivos corrigidos/broken_database_1_corrigido.json",
        JSON.stringify(json_nome_veiculo_corrigido_1),
        "utf-8"
      );

      for (let item of json_nome_veiculo_corrigido_1) {
        try {
          // Verifica se a chave id_marca existe no objeto
          if ("id_marca_" in item) {
            const resultadoCreate1 = await DadosVendasVeiculos.create({
              data: item.data,
              id_venda: item.id_venda,
              id_marca: item.id_marca_,
              vendas: item.vendas,
              valor_do_veiculo: item.valor_do_veiculo,
              nome: item.nome,
            });
            console.log(
              "Dados das vendas dos veículos criados e salvos com sucesso!: ",
              resultadoCreate1.toJSON()
            );
          } else {
            console.error(
              "Erro: A chave id_marca está ausente no objeto:",
              item
            );
          }
        } catch (error) {
          console.error(
            "Erro ao criar e salvar dados das vendas dos veículos: ",
            error
          );
        }
      }
    } catch (error) {
      console.error("Erro ao sincronizar modelos com o banco de dados:", error);
    }
  }
}

async function main() {
  try {
    await corrigir_e_salvar_json_1();
    console.log("Dados salvos no Banco de dados");
  } catch (error) {
    console.error("Erro ao sincronizar e corrigir dados:", error);
  }
}

main();
