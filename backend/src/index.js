// importa funcionalidades de express
const express = require('express'); 

// importa módulo de proteção
const cors = require('cors');

// importa rotas do arquivo routes.js
// "./" no parâmetro indicam posição relativa do arquivo, indicando que não é pacote 
const routes = require('./routes') 

const app = express();

app.use(cors()); // será capaz de colocar o endereço que acessará a aplicação
app.use(express.json());
app.use(routes); // este comando deve sempre vir abaixo do use(express.json)

// porta na qual será rodado o node
app.listen(3333);



