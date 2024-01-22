const fs = require("fs");
const database = require("/home/milene/Desafio-Tecnico-Monks-Media/app.js");

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
    let json_nome_veiculo_corrigido = jsonData1.map((item) => {
      if (item && item.nome && typeof item.nome === "string") {
        item.nome = item.nome.replace(/æ/g, "a").replace(/ø/g, "o");
      }
      if (item && item.Venda && typeof item.Venda === "string") {
        item.Venda = Number(item.Venda);
      }
      console.log(item.Venda, "Oiiiiiiiiii");
      return item;
    });

    dados1 = await fs.promises.writeFile(
      "arquivos corrigidos/broken_database_1_corrigido.json",
      JSON.stringify(json_nome_veiculo_corrigido, null, 2),
      "utf8"
    );

    for (let item of json_nome_veiculo_corrigido) {
      if (item !== undefined) {
        try {
          const resultadoCreate1 = await database.create(item);
          console.log(resultadoCreate1);
        } catch (error) {
          console.error("Erro ao criar e salvar Venda:", error);
        }
      }
    }

    return dados1;
  }

  if (jsonData2) {
    let json_marca_veiculo_corrigido = jsonData2.map((item) => {
      if (item.Marca && typeof item.Marca === "string") {
        item.Marca = item.Marca.replace(/æ/g, "a").replace(/ø/g, "o");
      }
      console.log(item.Marca, "Marcaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      return item;
    });

    dados2 = await fs.promises.writeFile(
      "arquivos corrigidos/broken_database_2_corrigido.json",
      JSON.stringify(json_marca_veiculo_corrigido, null, 2),
      "utf8"
    );

    for (let item of json_marca_veiculo_corrigido) {
      try {
        const resultadoCreate2 = await database.create(item);
        console.log(resultadoCreate2);
      } catch (error) {
        console.error("Erro ao criar e salvar Marca:", error);
      }
    }

    return dados2;
  }
}

async function main() {
  let sincronizar_dados;
  try {
    await database;
    sincronizar_dados = await corrigir_e_salvar();
  } catch (error) {
    console.error("Erro ao sincronizar e corrigir dados:", error);
  }

  return sincronizar_dados;
}

main();
