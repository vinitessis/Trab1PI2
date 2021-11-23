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
    cliente.query('SELECT * FROM associado', (err, res) => {
        callback(err, res.rows);
        cliente.end()
    })
}

exports.inserir = (associado, callback) => {
    const sql = "INSERT INTO associado (nome, telefone, endereco) VALUES ($1, $2, $3) RETURNING *";
    const values = [associado.nome, associado.telefone, associado.endereco];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM associado WHERE id = $1";
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
           const error = "Associado não encontrado!";
           callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, associado, callback) => {
    const sql = "UPDATE associado SET nome=$1, telefone=$2, endereco=$3 WHERE id=$4 RETURNING *";
    const values = [associado.nome, associado.telefone, associado.endereco, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM associado WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            const error = "ID de associado inválido!"
            callback(error, null);
        }
        else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
           const error = "Associado não encontrado!";
           callback(error, null);
        }
        cliente.end();
    });
}