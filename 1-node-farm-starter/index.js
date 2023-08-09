const fs = require('fs');
//Conforme a documentação do fs, podemos importar de dois modos:
//import * as fs from 'node:fs/promises'; - To use the promise-based APIs;
//import * as fs from 'node:fs'; - To use the callback and sync APIs;
//Como não sei exatamente qual usar, vou chamar do jeito que está na linha 1, caso de dê merda eu corro atrás de arrumar rs;

//Lendo o arquivod e forma síncrona
const lendoArquivo = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(lendoArquivo);

const escrevendoNoArquivo = `Escrevendo em um arquivo já existente: ${lendoArquivo}\nCriando diretamente no JS!\nTeste pra ver se muda o arquivo sempre!`;

fs.writeFileSync(`./txt/escrevendoEmCimaDeUmArquivo.txt`, escrevendoNoArquivo);

//Lendo arquivo de forma assíncrona
//Aqui temos uma amostra de um callback hell, forma esse triângulo com vários callback um chamando o outro;
fs.readFile('./txt/start.txt', 'utf-8', (erro, retorno1) => {
    if (erro) return console.log(`Erro!`);
    fs.readFile(`./tx/${retorno1}.txt`, 'utf-8', (erro, retorno2) => {
        if (erro) return console.log(`Erro2!`);
        console.log(retorno2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (erro, retorno3) => {
            if (erro) return console.log(`Erro3!`);
            console.log(retorno3);

        fs.writeFile(`./txt/final.txt`,`${retorno2}\n${retorno3}`, 'utf-8', (erro) => {
            if (erro) return console.log(`Erro4!`);
            console.log(`Arquivo escrito!`)
        });
        })
    })
})