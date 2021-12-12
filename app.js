const express = require('express');
const cors = require('cors');
const app = express();
const porta = 3000;

app.use(cors());

app.use(express.json()); //Trata o body do request como JSON
app.use(express.urlencoded({extended: true}));

const autorRota = require('./rotas/autor_rota');
app.use('/autores', autorRota);

const associadoRota = require('./rotas/associado_rota');
app.use('/associados', associadoRota);

const livroRota = require ('./rotas/livro_rota');
app.use('/livros', livroRota);

const emprestimoRota = require ('./rotas/emprestimo_rota');
app.use('/emprestimos', emprestimoRota);

const devolucaoRota = require ('./rotas/devolucao_rota');
app.use('/devolucoes', devolucaoRota);

app.listen(porta,() =>
    console.log(`Iniciando o servidor na porta ${porta}`)
    );