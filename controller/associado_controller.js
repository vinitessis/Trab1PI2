const associadoRepository = require('../repository/associado_repository');

exports.listarAssociados = (req, res) => {
    associadoRepository.listar((err, listaAssociados) => {
        if (err) {
            res.status(500).json({msg:err.msg})
        }
        else {
            res.json(listaAssociados);
        }
    })
};

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

    associadoRepository.buscarPorId (id, (err, associadoEncontrado) => {
        if (err) {
            res.status(500).json({msg: err});
        }
        else if (associadoEncontrado) {
            res.json(associadoEncontrado);
        }
        else {
            res.status(404).json({msg: "Associado não encontrado!"})
        }
    });
};

exports.inserirAssociado = (req, res) => {
    let associado = req.body;
    if(associado && associado.nome && associado.telefone && associado.endereco) {
        associadoRepository.inserir (associado, (err, associadoInserido) => {
            if (err) {
                res.status(500).json({msg: err.msg});
            }
            else {
                res.status(201).send(associado);
            }
        });
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados inválida!"});
    }
};

exports.atualizarAssociado = (req, res) => {
    const id = req.params.id;
    const associadoAtualizar = req.body;

    associadoRepository.atualizar(id, associadoAtualizar, (err, associadoAtualizado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(associadoAtualizado);
        }
    })
};


exports.deletarAssociado = (req, res) => {
    const id = req.params.id;
    const associadoDeletado = req.body;

    associadoRepository.deletar(id, (err, associadoDeletado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(associadoDeletado);
        }
    })
};