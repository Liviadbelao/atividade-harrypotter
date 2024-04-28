# API Harry Potter
![Imagem principal](./images/hogwarts.jpg)

Esta é uma API simples para gerenciar informações sobre bruxos e varinhas do mundo de Harry Potter.

## Instalação

1. Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.
2. Clone este repositório.
  ```
    git clone https://github.com/Liviadbelao/atividade-harrypotter.git
  ```
  
4. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências:
## Instalações de dependências
```
 npm install
```
## Configurações banco de dados
5. Certifique-se de ter o PostgreSQL instalado e em execução em sua máquina.
6. Crie um banco de dados chamado `exercusuarios` (nome da database).
7. Execute o script `scripts.sql` fornecido na pasta `sql` (no VScode) crie a tabela usuarios em seu banco.
8. Abra o arquivo `index.js`.
9. Altere as configurações de conexão do banco de dados (`user`, `host`, `password`, `port`, etc.) conforme necessário para corresponder à sua configuração local.

## Iniciando servidor 
1. Abrir o arquivo package.json e dentro de 'scripts:' adicionar a linha  "dev": "nodemon index.js".
2. Insira o comando no terminal:
```
npm run dev
```


Agora você pode acessar a API em `http://localhost:3000`.

## Uso

A API oferece as seguintes rotas:


![foto representativa de hogwarts](./images/fenixHarryPotter.jpg)

- `GET /bruxos`: Retorna todos os bruxos cadastrados.
- `GET /bruxos/:id`: Retorna um bruxo específico com base no ID fornecido.
- `GET /bruxos/nomes/:nome`: Retorna bruxos cujo nome contenha a substring fornecida.
- `GET /bruxos/sangue/:status_sangue`: Retorna bruxos com base no tipo de sangue fornecido.
- `POST /bruxos`: Cria um novo bruxo com os detalhes fornecidos no corpo da requisição.
- `PUT /bruxos/:id`: Atualiza os detalhes de um bruxo específico com base no ID fornecido.
- `DELETE /bruxos/:id`: Exclui um bruxo com base no ID fornecido.
- `GET /varinhas`: Retorna todos os varinhas cadastrados.
- `GET /varinhas/:id`: Retorna um bruxo específico com base no ID fornecido.
- `GET /varinhas/nucleo/:nucleo`: Retorna varinhas com base no seu nucleo.
- `POST /varinhas`: Cria uma nova varinha com os detalhes fornecidos no corpo da requisição.
- `PUT /varinhas/:id`: Atualiza os detalhes de uma varinha específica com base no ID fornecido.
- `DELETE /varinhas/:id`: Exclui uma varinha com base no ID fornecido.


Você pode fazer requisições HTTP para estas rotas utilizando um cliente HTTP, como o Postman ou insomnia.

.
