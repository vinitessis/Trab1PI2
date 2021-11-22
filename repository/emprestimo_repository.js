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
    cliente.query('SELECT * FROM emprestimo', (err, res) => {
        callback(err, res.rows);
        cliente.end()
    })
}

exports.inserir = async (emprestimo, callback) => {
    const sql = "INSERT INTO emprestimo (id_livro, id_associado) VALUES ($1, $2) RETURNING *";
    const values = [emprestimo.id_livro, emprestimo.id_associado];
    const cliente = new Client(conexao);

    try{
        await cliente.connect();

        //const sqlLivroEstaDisponivel = "SELECT * FROM livro WHERE id=$1 AND disponivel='n'";
        //const codigoLivro = [emprestimo.id_livro];
        //const resLivroDisponivel = await cliente.query(sqlLivroEstaDisponivel, codigoLivro);
        //if (resLivroDisponivel.rows !== undefined || resLivroDisponivel.rows.length > 0) {
            //throw new Error("Livro não disponível");
            //callback({"msg": "Deu ruim"});
        //}
        //else {
        //}
        const res = await cliente.query(sql, values);
        
        if (res.rows && res.rows.length > 0) {
            const sqlDisponibilidadeLivro = "UPDATE livro SET disponivel='n' WHERE id=$1 RETURNING *";
            const valuesDisponibilidadeLivro = [emprestimo.id_livro];
            await cliente.query(sqlDisponibilidadeLivro, valuesDisponibilidadeLivro);
        };

        callback(null, res.rows[0]);
    } catch(err) {
        const erro = "Erro ao tentar inserir empréstimo!";
        callback(erro, null);
    } finally {
        await cliente.end();
    }
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM emprestimo WHERE id = $1";
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
           const error = "Empréstimo não encontrado!";
           callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, emprestimo, callback) => {
    const sql = "UPDATE emprestimo SET id_livro=$1, id_associado=$2 WHERE id=$3 RETURNING *";
    const values = [emprestimo.id_livro, emprestimo.id_associado, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM emprestimo WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            const error = "ID de empréstimo inválido!"
            callback(error, null);
        }
        else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
           const error = "Empréstimo não encontrado!";
           callback(error, null);
        }
        cliente.end();
    });
}