import fs from "fs";
import DataModel from "../app.js";

async function lendo_Database_1() {
  try {
    const data1 = await fs.promises.readFile(
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
    const data2 = await fs.promises.readFile(
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

  const jsonData1 = await lendo_Database_1();
  const jsonData2 = await lendo_Database_2();

  if (jsonData1) {
    const json_nome_veiculo_corrigido = jsonData1.map((item) => {
      if (item && item.nome && typeof item.nome === "string") {
        item.nome = item.nome.replace(/æ/g, "a").replace(/ø/g, "o");
      }
      if (item && item.vendas && typeof item.vendas === "string") {
        item.vendas = Number(item.vendas);
      }
      return item;
    });

    dados1 = await fs.promises.writeFile(
      "arquivos corrigidos/broken_database_1_corrigido.json",
      JSON.stringify(json_nome_veiculo_corrigido, null, 2),
      "utf8"
    );
    await DataModel.bulkCreate(json_nome_veiculo_corrigido);
  }

  if (jsonData2) {
    const json_marca_veiculo_corrigido = jsonData2.map((item) => {
      if (item.marca && typeof item.marca === "string") {
        item.marca = item.marca.replace(/æ/g, "a").replace(/ø/g, "o");
      }
      return item;
    });

    dados2 = await fs.promises.writeFile(
      "arquivos corrigidos/broken_database_2_corrigido.json",
      JSON.stringify(json_marca_veiculo_corrigido, null, 2),
      "utf8"
    );
    await DataModel.bulkCreate(json_marca_veiculo_corrigido);
  }
}

corrigir_e_salvar();
