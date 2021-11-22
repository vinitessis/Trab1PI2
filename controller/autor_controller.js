const autorRepository = require('../repository/autor_repository');

exports.listarAutores = (req, res) => {
    autorRepository.listar((err, listaAutores) => {
        if (err) {
            res.status(500).json({msg:err.msg})
        }
        else {
            res.json(listaAutores);
        }
    })
};

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

    autorRepository.buscarPorId (id, (err, autorEncontrado) => {
        if (err) {
            res.status(500).json({msg: err});
        }
        else if (autorEncontrado) {
            res.json(autorEncontrado);
        }
        else {
            res.status(404).json({msg: "Autor não encontrado!"})
        }
    });
};

exports.inserirAutor = (req, res) => {
    let autor = req.body;
    if(autor && autor.nome && autor.nacionalidade) {
        autorRepository.inserir (autor, (err, autorInserido) => {
            if (err) {
                res.status(500).json({msg: err.msg});
            }
            else {
                res.status(201).send(autor);
            }
        });
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados inválida!"});
    }
};

exports.atualizarAutor = (req, res) => {
    const id = req.params.id;
    const autorAtualizar = req.body;

    autorRepository.atualizar(id, autorAtualizar, (err, autorAtualizado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(autorAtualizado);
        }
    })
};


exports.deletarAutor = (req, res) => {
    const id = req.params.id;
    const autorDeletado = req.body;

    autorRepository.deletar(id, (err, autorDeletado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(autorDeletado);
        }
    })
};