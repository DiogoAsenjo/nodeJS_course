const fs = require("fs");
const http = require("http");
const url = require("url");

///////////////////////////////////////
////FILES
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
/*
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
*/

///////////////////////////////////////
////SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data); //Aqui e na linha de cima foi criada uma API para ler o arquivo .json e conseguir usar ele em javascript.

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview!");
  } else if (pathName === "/product") {
    res.end("This is the product!");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello -world",
    });
    res.end("<h1>Page not found!</h1>");
  }
}); //Começando a entender Routing.

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
}); //Criando um servidor. Para funcionar basta rodar o arquivo index.js e no browser entrar no endereço 127.0.0.1:8000
