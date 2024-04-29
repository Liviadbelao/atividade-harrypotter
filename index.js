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
app.get('/', (req, res) => {
    res.send('a rota esta funcionando');
});
// rota de todos os bruxos

app.get('/bruxos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxos');
        res.json({
            total: resultado.rowCount,
            bruxos: resultado.rows,
        });
    } catch (error) {
        console.error('erro a obter todos os bruxos', error);
        res.status(500).send('erro ao obter os bruxos');
    }
});

//pegar todas as varinhas
app.get('/varinhas', async (req, res) => {
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
// pegar bruxo por id 
app.get('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
        if (resultado.rowCount == 0) {
            res.status(404).send('id não encontrado');
        } else {
            res.json({
                bruxo: resultado.rows[0],
            });
        }
    } catch (error) {
        console.error('erro ao obter bruxo pelo id', error);
        res.status(500).send('erro ao obter bruxo pelo id');
    }
});
// pegar varinha por id
app.get('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
        if (resultado.rowCount == 0) {
            res.status(404).send('id não encontrado');
        } else {
            res.json({
                varinha: resultado.rows[0],
            });
        }
    } catch (error) {
        console.error('erro ao obter varinha pelo id', error);
        res.status(500).send('erro ao obter varinha pelo id');
    }
});
//pegar bruxo por nome 
app.get('/bruxos/nomes/:nome', async (req, res) => {
    try {
        const { nome } = req.params;

        const nomePesquisa = `%${nome}%`;
        const resultado = await pool.query('SELECT * FROM bruxos WHERE LOWER(nome) LIKE LOWER($1)', [nomePesquisa]);
        if (resultado.rowCount == 0) {
            res.status(404).send('nome não encontrado');
        } else {
            res.json({
                total: resultado.rowCount,
                bruxo: resultado.rows
            });
        }
    } catch (error) {
        console.error('Erro ao pesquisar bruxos pelo nome', error);
        res.status(500).send('Erro ao pesquisar bruxos pelo nome');
    }
});
//pegar bruxo por status de sangue 
app.get('/bruxos/sangue/:status_sangue', async (req, res) => {
    try {
        const { status_sangue } = req.params;

        const sangue = `%${status_sangue}%`;
        const resultado = await pool.query('SELECT * FROM bruxos WHERE LOWER(status_sangue) LIKE LOWER($1)', [sangue]);
        if (resultado.rowCount == 0) {
            res.status(404).send('tipo de sangue não encontrado');
        } else {
            res.json({
                total: resultado.rowCount,
                bruxo: resultado.rows
            });
        }
    } catch (error) {
        console.error('Erro ao pesquisar bruxos pelo tipo de sangue', error);
        res.status(500).send('Erro ao pesquisar bruxos pelo tipo de sangue');
    }
});
//pegar varinha por nucleo 
app.get('/varinhas/nucleo/:nucleo', async (req, res) => {
    try {
        const { nucleo } = req.params;

        const nucleoPesquisa = `%${nucleo}%`;
        const resultado = await pool.query('SELECT * FROM varinhas WHERE LOWER(nucleo) LIKE LOWER($1)', [nucleoPesquisa]);
        if (resultado.rowCount == 0) {
            res.status(404).send('tipo de nucleo não encontrado');
        } else {
            res.json({
                total: resultado.rowCount,
                varinha: resultado.rows
            });
        }
    } catch (error) {
        console.error('Erro ao pesquisar varinha pelo nucleo', error);
        res.status(500).send('Erro ao pesquisar varinha pelo nucleo');
    }
});
//criar bruxos

app.post('/bruxos', async (req, res) => {
    try {
        const { nome, idade, casa_hogwarts, habilidade, status_sangue, patrono } = req.body;
        const sangue = status_sangue.toLowerCase()
        const casa = casa_hogwarts.toLowerCase()

        let casa_bruxo = ['lufa-lufa', 'corvinal', 'sonserina', 'grifinória']
        let tipo_sangue = ['puro', 'mestiço', 'trouxa'];
        

        if(!nome || !idade || !casa_hogwarts || !habilidade || !status_sangue ){
            res.status(401).send({ mensagem: 'todos os campos, exceto o de patrono, devem ser preenchidos.' });
        }
        else if (!casa_bruxo.includes(casa)) {
            res.status(401).send({ mensagem: 'casa não existente no mundo de hogwarts, ou escrita incorretamente, tente usar as seguintes opções: "lufa-lufa", "corvinal", "sonserina" ou "grifinória"' });
        }
        else if (!tipo_sangue.includes(sangue)) {
            res.status(401).send({ mensagem: 'status de sangue definido incorretamente, use umas das seguintes opções: "puro", "mestiço" ou "trouxa ' });
        }
        else if (nome.length < 3) {
            res.status(401).send({ mensagem: 'nome inválido' });
        }
        else if (idade <= 0) {
            res.status(401).send({ mensagem: 'esse bruxo não tem idade para estudar em hogwarts' });
        }
      
        else {
            await pool.query('INSERT INTO bruxos (nome, idade, casa_hogwarts, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade, sangue, patrono]);
            res.status(201).send({ mensagem: 'bruxo criado com sucesso' });
        }
    } catch (error) {
        console.error('erro ao inserir bruxo', error);
        res.status(500).send('erro ao inserir bruxo');
    }
});

//criar varinhas
app.post('/varinhas', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_fabricacao } = req.body;

        const data = new Date(data_fabricacao)

        if(!material || !comprimento || !nucleo || !data_fabricacao){
            res.status(401).send({ mensagem: 'preencha todos os campos' });   
        }
        else if (comprimento < 10.0) {
            res.status(401).send({ mensagem: 'varinha muito pequena' });
        }
        else if (comprimento > 50.0) {
            res.status(401).send({ mensagem: 'varinha muito grande' });
        }
        else if (data > new Date()) {
            res.status(401).send({ mensagem: 'impossivel inserir uma varinha com a data de fabricação maior que o dia de hoje!' });
        }
        else {
            await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
            res.status(201).send({ mensagem: 'Varinha criada com sucesso' });
        }
    } catch (error) {
        console.error('Erro ao inserir varinha', error);
        res.status(500).send('Erro ao inserir varinha');
    }
});

//deletar bruxos 
app.delete('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'bruxo deletado' });
    } catch (error) {
        console.error('erro ao excluir bruxo', error);
        res.status(500).send('erro ao excluir bruxo');
    }
});
//deletar varinhas 
app.delete('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'varinha deletado' });
    } catch (error) {
        console.error('erro ao excluir varinha', error);
        res.status(500).send('erro ao excluir varinha');
    }
});
//editar bruxo
app.put('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, casa_hogwarts, habilidade, status_sangue, patrono } = req.body;
        const sangue = status_sangue.toLowerCase()
        const casa = casa_hogwarts.toLowerCase()

        let casa_bruxo = ['lufa-lufa', 'corvinal', 'sonserina', 'grifinória']
        let tipo_sangue = ['puro', 'mestiço', 'trouxa'];

        if(!nome || !idade || !casa_hogwarts || !habilidade || !status_sangue ){
            res.status(401).send({ mensagem: 'todos os campos, exceto o de patrono, devem ser preenchidos.' });
        }
        else if (!casa_bruxo.includes(casa)) {
            res.status(401).send({ mensagem: 'casa não existente no mundo de hogwarts' });
        }
        else if (!tipo_sangue.includes(sangue)) {
            res.status(401).send({ mensagem: 'status de sangue definido incorretamente' });
        }
        else if (nome.length < 3) {
            res.status(401).send({ mensagem: 'nome inválido' });
        }
        else if (idade <= 0) {
            res.status(401).send({ mensagem: 'esse bruxo não tem idade para estudar em hogwarts' });
        }
       
        else {
            await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa_hogwarts = $3, habilidade = $4, status_sangue = $5, patrono = $6 WHERE id = $7', [nome, idade, casa, habilidade, sangue, patrono, id]);
            res.status(200).send({ mensagem: 'bruxo atualizado' });
        }
    } catch (error) {
        console.error('erro ao atualizar bruxo', error);
        res.status(500).send('erro ao atualizar bruxo');
    }
});
//editar varinha
app.put('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_fabricacao } = req.body;

        const data = new Date(data_fabricacao)

        if(!material || !comprimento || !nucleo || !data_fabricacao){
            res.status(401).send({ mensagem: 'preencha todos os campos' });   
        }
        else if (comprimento < 10.0) {
            res.status(401).send({ mensagem: 'varinha muito pequena' });
        }
        else if (comprimento > 50.0) {
            res.status(401).send({ mensagem: 'varinha muito grande' });
        }
        else if (data > new Date()) {
            res.status(401).send({ mensagem: 'impossivel inserir uma varinha com a data de fabricação maior que o dia de hoje' });
        }
        else {
            await pool.query('UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, data_fabricacao, id]);
            res.status(200).send({ mensagem: 'varinha atualizado' });
        }
    } catch (error) {
        console.error('erro ao atualizar varinha', error);
        res.status(500).send('erro ao atualizar varinha');
    }
});
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}⚡`);
});