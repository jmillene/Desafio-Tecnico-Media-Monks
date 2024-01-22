const fs = require("fs");
const {
  NomeMarcaVeiculos,
} = require("/home/milene/Desafio-Tecnico-Monks-Media/Model/NomeMarcaVeiculos.js");
const {
  DadosVendasVeiculos,
} = require("/home/milene/Desafio-Tecnico-Monks-Media/Model/DadosVendaVeiculo.js");

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

async function lendo_Database_2() {
  try {
    let data2 = await fs.promises.readFile(
      "databases/broken_database_2.json",
      "utf8"
    );
    return JSON.parse(data2);
  } catch (error) {
    console.error("Erro ao carregar JSON:", error);
    return null;
  }
}

async function corrigir_e_salvar() {
  let dados1, dados2;

  let jsonData1 = await lendo_Database_1();
  let jsonData2 = await lendo_Database_2();

  if (jsonData1) {
    let json_nome_veiculo_corrigido_1 = jsonData1.map((item) => {
      if (item && item.nome && typeof item.nome === "string") {
        item.nome = item.nome.replace(/æ/g, "a").replace(/ø/g, "o");
      }
      if (item && item.vendas && typeof item.vendas === "string") {
        item.vendas = Number(item.vendas);
      }
      return item;
    });

    await DadosVendasVeiculos.sync();
    dados1 = await fs.promises.writeFile(
      "arquivos corrigidos/broken_database_1_corrigido.json",
      JSON.stringify(json_nome_veiculo_corrigido_1),
      "utf-8"
    );

    for (let item of json_nome_veiculo_corrigido_1) {
      if (item !== undefined && item.id_marca !== undefined) {
        try {
          const resultadoCreate1 = await DadosVendasVeiculos.create({
            data: item.data,
            id_marca: item.id_marca,
            id_venda: item.id_venda,
            vendas: item.vendas,
            valor_do_veiculo: item.valor_do_veiculo,
            nome: item.nome,
          });
          console.log(
            "Dados das vendas dos veículos com sucesso!: ",
            resultadoCreate1
          );
        } catch (error) {
          console.error("Erro ao criar e salvar dados das vendas!: ", error);
        }
      }
    }
  }

  if (jsonData2) {
    let json_marca_veiculo_corrigido_2 = jsonData2.map((item) => {
      if (item.marca && typeof item.marca === "string") {
        item.marca = item.marca.replace(/æ/g, "a").replace(/ø/g, "o");
      }
      return item;
    });

    await NomeMarcaVeiculos.sync();
    dados2 = await fs.promises.writeFile(
      "arquivos corrigidos/broken_database_2_corrigido.json",
      JSON.stringify(json_marca_veiculo_corrigido_2),
      "utf-8"
    );

    for (let item of json_marca_veiculo_corrigido_2) {
      if (item !== undefined && item.id_marca !== undefined) {
        try {
          const resultadoCreate2 = await NomeMarcaVeiculos.create({
            id_marca: item.id_marca,
            nome: item.marca,
          });
          console.log(
            "Dados das marcas criados com sucesso!: ",
            resultadoCreate2
          );
        } catch (error) {
          console.error(
            "Erro ao criar e salvar dados das marcas dos veículos!:",
            error
          );
        }
      }
    }
  }

  return {
    salvando_dados_modificados_1: dados1,
    salvando_dados_modificados_2: dados2,
  };
}

async function main() {
  let sincronizar_dados;
  try {
    sincronizar_dados = await corrigir_e_salvar();
    console.log("Dados salvos no Banco de dados");
  } catch (error) {
    console.error("Erro ao sincronizar e corrigir dados:", error);
  }

  return sincronizar_dados;
}

main();
