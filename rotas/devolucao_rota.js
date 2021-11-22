//Rota: /devolucoes (localhost:3000/devolucoes)

const express = require('express');
const devolucao_controller = require('../controller/devolucao_controller');
const rota = express.Router();

rota.get('/', devolucao_controller.listarDevolucoes)
rota.post('/', devolucao_controller.inserirDevolucao)
rota.get('/:id', devolucao_controller.buscarPorId)
rota.put('/:id', devolucao_controller.atualizarDevolucao)
rota.delete('/:id', devolucao_controller.deletarDevolucao)

module.exports = rota;