const livroRepository = require('../repository/livro_repository');

exports.listarLivros = (req, res) => {
    livroRepository.listar((err, listaLivros) => {
        if (err) {
            res.status(500).json({msg:err.msg})
        }
        else {
            res.json(listaLivros);
        }
    })
};

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

    livroRepository.buscarPorId (id, (err, livroEncontrado) => {
        if (err) {
            res.status(500).json({msg: err});
        }
        else if (livroEncontrado) {
            res.json(livroEncontrado);
        }
        else {
            res.status(404).json({msg: "Livro não encontrado!"})
        }
    });
};

exports.inserirLivro = (req, res) => {
    let livro = req.body;
    if(livro && livro.isbn && livro.titulo && livro.id_autor && livro.editora && livro.ano && livro.disponivel) {
        livroRepository.inserir (livro, (err, livroInserido) => {
            if (err) {
                res.status(500).json({msg: err.msg});
            }
            else {
                res.status(201).send(livro);
            }
        });
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados inválida!"});
    }
};

exports.atualizarLivro = (req, res) => {
    const id = req.params.id;
    const livroAtualizar = req.body;

    livroRepository.atualizar(id, livroAtualizar, (err, livroAtualizado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(livroAtualizado);
        }
    })
};


exports.deletarLivro = (req, res) => {
    const id = req.params.id;
    const livroDeletado = req.body;

    livroRepository.deletar(id, (err, livroDeletado) => {
        if (err) {
            res.status(500).json({msg:err});
        }
        else {
            res.json(livroDeletado);
        }
    })
};