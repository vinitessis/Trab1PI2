//Rota: /autores (localhost:3000/autores)

const express = require('express');
const autor_controller = require('../controller/autor_controller');
const rota = express.Router();

rota.get('/', autor_controller.listarAutores)
rota.post('/', autor_controller.inserirAutor)
rota.get('/:id', autor_controller.buscarPorId)
rota.put('/:id', autor_controller.atualizarAutor)
rota.delete('/:id', autor_controller.deletarAutor)

module.exports = rota;