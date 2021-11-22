const devolucaoRepository = require('../repository/devolucao_repository');

exports.listarDevolucoes = (req, res) => {
    devolucaoRepository.listar((err, listadevolucoes) => {
        if (err) {
            res.status(500).json({msg:err.msg})
        }
        else {
            res.json(listadevolucoes);
        }
    })
};

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

    devolucaoRepository.buscarPorId (id, (err, devolucaoEncontrada) => {
        if (err) {
            res.status(500).json({msg: err});
        }
        else if (devolucaoEncontrada) {
            res.json(devolucaoEncontrada);
        }
        else {
            res.status(404).json({msg: "Devolução não encontrada!"})
        }
    });
};

exports.inserirDevolucao = (req, res) => {
    let devolucao = req.body;
    if(devolucao && devolucao.id_emprestimo) {
        devolucaoRepository.inserir (devolucao, (err, devolucaoInserido) => {
            if (err) {
                res.status(500).json({msg: err.msg});
            }
            else {
                res.status(201).send(devolucao);
            }
        });
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados inválida!"});
    }
};

exports.atualizarDevolucao = (req, res) => {
    const id = req.params.id;
    const devolucaoAtualizar = req.body;

    devolucaoRepository.atualizar(id, devolucaoAtualizar, (err, devolucaoAtualizado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(devolucaoAtualizado);
        }
    })
};


exports.deletarDevolucao = (req, res) => {
    const id = req.params.id;
    const devolucaoDeletado = req.body;

    devolucaoRepository.deletar(id, (err, devolucaoDeletado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(devolucaoDeletado);
        }
    })
};