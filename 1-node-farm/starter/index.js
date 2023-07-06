const fs = require("fs");

/*const hello = "Hello World"; ///Para rodar o arquivo no terminal, basta abrir o terminal e dar o comando node 'nome.extensão' do arquivo.
console.log(hello);*/

const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
console.log(textIn);
