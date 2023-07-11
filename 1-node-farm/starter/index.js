const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate"); //Aqui eu criei um module e estou usando no meu código.
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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data); //Aqui e na linha de cima foi criada uma API para ler o arquivo .json e conseguir usar ele em javascript.

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(""); //Aqui ele está basicamente lendo qual dos cards que irá aparecer. Entender melhor.
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    //Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });

    //Not found
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
