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
    cliente.query('SELECT * FROM autor', (err, res) => {
        callback(err, res.rows);
        cliente.end()
    })
}

exports.inserir = (autor, callback) => {
    const sql = "INSERT INTO autor (nome, nacionalidade) VALUES ($1, $2) RETURNING *";
    const values = [autor.nome, autor.nacionalidade];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM autor WHERE id = $1";
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
           const error = "Autor não encontrado!";
           callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, autor, callback) => {
    const sql = "UPDATE autor SET nome=$1, nacionalidade=$2 WHERE id=$3 RETURNING *";
    const values = [autor.nome, autor.nacionalidade, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM autor WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}