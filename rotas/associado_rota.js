//Rota: /associado (localhost:3000/associado)

const express = require('express');
const associado_controller = require('../controller/associado_controller');
const rota = express.Router();

rota.get('/', associado_controller.listarAssociados)
rota.post('/', associado_controller.inserirAssociado)
rota.get('/:id', associado_controller.buscarPorId)
rota.put('/:id', associado_controller.atualizarAssociado)
rota.delete('/:id', associado_controller.deletarAssociado)

module.exports = rota;