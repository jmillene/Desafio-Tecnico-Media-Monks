import { log } from 'console';
import fs from 'fs';

async function lendo_Database_1() {
    try {
        const data1 = await fs.promises.readFile('databases/broken_database_1.json', 'utf8');
        return JSON.parse(data1);
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        return null;
    }
}

async function lendo_Database_2() {
    try {
        const data2 = await fs.promises.readFile('databases/broken_database_2.json', 'utf8');
        return JSON.parse(data2);
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        return null;
    }
}

async function corrigir_e_salvar() {
    const jsonData1 = await lendo_Database_1();
    const jsonData2 = await lendo_Database_2();

    if (jsonData1) {
        const json_nome_veiculo_corrigido = jsonData1.map((item) => {
            if (item && item.nome && typeof item.nome === 'string') {
                item.nome = item.nome.replace(/æ/g, "a").replace(/ø/g, "o");
            }
            if (item && item.vendas && typeof item.vendas === 'string') {
                item.vendas = Number(item.vendas);
            }
            return item;
        });
        await fs.promises.writeFile('arquivos corrigidos/broken_database_1_corrigido.json', JSON.stringify(json_nome_veiculo_corrigido, null, 2), 'utf8');
        console.log('Arquivo 1 corrigido foi salvo com sucesso.');
        if (jsonData2) {
            const json_marca_veiculo_corrigido = jsonData2.map((item) => {
                if (item.marca && typeof item.marca === 'string') {
                    item.marca = item.marca.replace(/æ/g, "a").replace(/ø/g, "o");
                }
                return item;
            });

            await fs.promises.writeFile('arquivos corrigidos/broken_database_2_corrigido.json', JSON.stringify(json_marca_veiculo_corrigido, null, 2), 'utf8');
            console.log('Arquivo 2 corrigido foi salvo com sucesso.');
        }
    }
}
    corrigir_e_salvar();
