CREATE TABLE livro (
	id SERIAL NOT NULL,
	isbn VARCHAR(13) NOT NULL,
	titulo VARCHAR(40) NOT NULL,
	id_autor INT NOT NULL,
	editora VARCHAR(20),
	ano INT,
	disponivel VARCHAR(1) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_autor) REFERENCES autor (id)
);

CREATE TABLE autor (
	id SERIAL NOT NULL,
	nome varchar(30) NOT NULL,
	nacionalidade varchar(20) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE emprestimo (
	id SERIAL NOT NULL,
	id_livro INT NOT NULL,
	id_associado INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_livro) REFERENCES livro (id),
	FOREIGN KEY (id_associado) REFERENCES associado (id)
)

CREATE TABLE devolucao (
	id SERIAL NOT NULL,
	id_livro INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_livro) REFERENCES livro (id)
)

CREATE TABLE associado (
	id SERIAL NOT NULL,
	nome VARCHAR(40) NOT NULL,
	telefone VARCHAR(12),
	endereco VARCHAR(40),
	PRIMARY KEY (id)
)