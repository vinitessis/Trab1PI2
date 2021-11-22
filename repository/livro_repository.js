const { Client } = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'trab1PI2',
    user: 'postgres',
    password: 'postgres'
};

exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect()
    cliente.query('SELECT * FROM livro', (err, res) => {
        callback(err, res.rows);
        cliente.end()
    })
}

exports.inserir = (livro, callback) => {
    const sql = "INSERT INTO livro (isbn, titulo, id_autor, editora, ano, disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [livro.isbn, livro.titulo, livro.id_autor, livro.editora, livro.ano, livro.disponivel];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM livro WHERE id = $1";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        }
        else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
           const error = "Livro não encontrado!";
           callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, livro, callback) => {
    const sql = "UPDATE livro SET isbn=$1, titulo=$2, id_autor=$3, editora=$4, ano=$5, disponivel=$6 WHERE id=$7 RETURNING *";
    const values = [livro.isbn, livro.titulo, livro.id_autor, livro.editora, livro.ano, livro.disponivel, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM livro WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}