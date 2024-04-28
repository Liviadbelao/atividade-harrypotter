CREATE DATABASE harrypotter;

\\criando tabela

CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    casa_hogwarts VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    status_sangue VARCHAR(100) NOT NULL,
    patrono VARCHAR(100)
);
CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento DECIMAL NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_fabricacao DATE NOT NULL
);


