//Rota: /livros (localhost:3000/livros)

const express = require('express');
const livro_controller = require('../controller/livro_controller');
const rota = express.Router();

rota.get('/', livro_controller.listarLivros)
rota.post('/', livro_controller.inserirLivro)
rota.get('/:id', livro_controller.buscarPorId)
rota.put('/:id', livro_controller.atualizarLivro)
rota.delete('/:id', livro_controller.deletarLivro)

module.exports = rota;