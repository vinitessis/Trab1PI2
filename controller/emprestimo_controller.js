const emprestimoRepository = require('../repository/emprestimo_repository');

exports.listarEmprestimos = (req, res) => {
    emprestimoRepository.listar((err, listaEmprestimos) => {
        if (err) {
            res.status(500).json({msg:err.msg})
        }
        else {
            res.json(listaEmprestimos);
        }
    })
};

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

    emprestimoRepository.buscarPorId (id, (err, emprestimoEncontrado) => {
        if (err) {
            res.status(500).json({msg: err});
        }
        else if (emprestimoEncontrado) {
            res.json(emprestimoEncontrado);
        }
        else {
            res.status(404).json({msg: "Empréstimo não encontrado!"})
        }
    });
};

exports.inserirEmprestimo = (req, res) => {
    let emprestimo = req.body;
    if(emprestimo && emprestimo.id_livro && emprestimo.id_associado) {
        emprestimoRepository.inserir (emprestimo, (err, emprestimoInserido) => {
            if (err) {
                res.status(500).json({msg: err.msg});
            }
            else {
                res.status(201).send(emprestimo);
            }
        });
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados inválida!"});
    }
};

exports.atualizarEmprestimo = (req, res) => {
    const id = req.params.id;
    const emprestimoAtualizar = req.body;

    emprestimoRepository.atualizar(id, emprestimoAtualizar, (err, emprestimoAtualizado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(emprestimoAtualizado);
        }
    })
};


exports.deletarEmprestimo = (req, res) => {
    const id = req.params.id;
    const emprestimoDeletado = req.body;

    emprestimoRepository.deletar(id, (err, emprestimoDeletado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(emprestimoDeletado);
        }
    })
};