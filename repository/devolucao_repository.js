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
    cliente.query('SELECT * FROM devolucao', (err, res) => {
        callback(err, res.rows);
        cliente.end()
    })
}

exports.inserir = async (devolucao, callback) => {
    const sql = "INSERT INTO devolucao (id_emprestimo) VALUES ($1) RETURNING *";
    const values = [devolucao.id_emprestimo];
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
            const sqlDisponibilidadeLivro = "UPDATE livro SET disponivel='s' WHERE id=$1 RETURNING *";
            const valuesDisponibilidadeLivro = [devolucao.id_emprestimo];
            await cliente.query(sqlDisponibilidadeLivro, valuesDisponibilidadeLivro);
        };

        callback(null, res.rows[0]);
    } catch(err) {
        const erro = "Erro ao tentar inserir devolução!";
        callback(erro, null);
    } finally {
        await cliente.end();
    }
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM devolucao WHERE id = $1";
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
           const error = "Devolução não encontrada!";
           callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, devolucao, callback) => {
    const sql = "UPDATE devolucao SET id_emprestimo=$1 WHERE id=$2 RETURNING *";
    const values = [devolucao.id_emprestimo, id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM devolucao WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => {
        if (err) {
            const error = "ID de devolucao inválida!"
            callback(error, null);
        }
        else if (res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
           const error = "Devolução não encontrado!";
           callback(error, null);
        }
        cliente.end();
    });
}