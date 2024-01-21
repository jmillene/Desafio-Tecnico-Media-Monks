import fs from "fs";
import {
  Venda,
  Marca,
} from "/home/jessica/Documentos/DESAFIO TECH MEDIA MONKS/model/model.js";
import { connection_sync } from "/home/jessica/Documentos/DESAFIO TECH MEDIA MONKS/app.js";

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

    for (const item of json_nome_veiculo_corrigido) {
      await Venda.create(item);
    }

    return dados1;
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

    for (const item of json_nome_veiculo_corrigido) {
      await Marca.create(item);
    }
    return dados2;
  }
}
async function main() {
  let sincronizar_dados;

  try {
    await connection_sync;
    sincronizar_dados = await corrigir_e_salvar();
  } catch (error) {
    console.error("Erro ao sincronizar e corrigir dados:", error);
  }

  return sincronizar_dados;
}

main();
