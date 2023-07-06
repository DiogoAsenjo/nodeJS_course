const fs = require("fs");

/*
const hello = "Hello World"; //Para rodar o arquivo no terminal basta digitar nome 'arquivo.extensão' no terminal.
console.log(hello);
*/

//Forma síncrona de ler e escrever arquivos, depende da execução da linha anterior. Blocking.
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); //Lendo arquivos em node. Atenção no local dos arquivos.
console.log(textIn);

const textOut = `This is what we know about avocado: ${textIn} .\n Created on ${Date.now}`;
fs.writeFileSync("./txt/output.txt", textOut); //Escrevendo em arquivos com node.
console.log("File Writen");
*/

//Fomra assíncrona de ler e escrever arquivos.Non Blocking.
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR!");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written");
      });
    });
  });
});
console.log("Will read file!"); //Aqui como não depende da linha anterior, enquanto a linha 19 roda, a linha 22 irá aparecer primeiro no console e depois a linha 20, isso é o Non Blocking.
