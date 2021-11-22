//Rota: /emprestimos (localhost:3000/emprestimos)

const express = require('express');
const emprestimo_controller = require('../controller/emprestimo_controller');
const rota = express.Router();

rota.get('/', emprestimo_controller.listarEmprestimos)
rota.post('/', emprestimo_controller.inserirEmprestimo)
rota.get('/:id', emprestimo_controller.buscarPorId)
rota.put('/:id', emprestimo_controller.atualizarEmprestimo)
rota.delete('/:id', emprestimo_controller.deletarEmprestimo)

module.exports = rota;