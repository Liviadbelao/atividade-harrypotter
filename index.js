const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

//conexão banco de dados

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harrypotter',
    password: 'ds564',
    port: 7007,
});
app.use(express.json());

//rota de teste
app.get('/', (req, res)=>{
    res.send('a rota esta funcionando');
});
// rota de todos os bruxos

app.get('/bruxos', async (req, res)=>{
    try {
        const resultado = await pool.query('SELECT * FROM bruxos');
        res.json({
            total: resultado.rowCount,
            varinhas: resultado.rows,
        });
    } catch (error) {
        console.error('erro a obter todos os bruxos', error);
        res.status(500).send('erro ao obter os bruxos');
    }
});

//pegar todas as varinhas
app.get('/varinhas', async (req, res)=>{
    try {
        const resultado = await pool.query('SELECT * FROM varinhas');
        res.json({
            total: resultado.rowCount,
            varinhas: resultado.rows,
        });
    } catch (error) {
        console.error('erro a obter todos as varinhas', error);
        res.status(500).send('erro ao obter as varinhas');
    }
});

//criar bruxos

app.post('/bruxos', async (req, res) => {
    try {
        const { nome, idade, casa_hogwarts, habilidade, status_sangue, patrono } = req.body;
        
        await pool.query('INSERT INTO bruxos (nome, idade, casa_hogwarts, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa_hogwarts, habilidade, status_sangue, patrono]);
        res.status(201).send({ mensagem: 'bruxo criado com sucesso' });
    } catch (error) {
        console.error('erro ao inserir bruxo', error);
        res.status(500).send('erro ao inserir bruxo');
    }
});

//criar varinhas
app.post('/varinhas', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
        
        await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
        res.status(201).send({ mensagem: 'Varinha criada com sucesso' }); // Corrigido para "Varinha"
    } catch (error) {
        console.error('Erro ao inserir varinha', error); // Corrigido para "varinha"
        res.status(500).send('Erro ao inserir varinha'); // Corrigido para "varinha"
    }
});
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}⚡`);
});