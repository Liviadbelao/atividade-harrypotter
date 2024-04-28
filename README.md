# API Harry Potter

Esta é uma API simples para gerenciar informações sobre bruxos e varinhas do mundo de Harry Potter.

## Instalação

1. Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.
2. Clone este repositório.
  ``  git clone  ``
  
4. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências:


5. Configure o banco de dados PostgreSQL. Você pode usar o arquivo `database.sql` fornecido para criar o esquema do banco de dados e as tabelas necessárias.

6. Renomeie o arquivo `.env.example` para `.env` e atualize as variáveis de ambiente com as configurações do seu banco de dados PostgreSQL.

7. Inicie o servidor com o seguinte comando:


Agora você pode acessar a API em `http://localhost:3000`.

## Uso

A API oferece as seguintes rotas:

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


Você pode fazer requisições HTTP para estas rotas utilizando um cliente HTTP, como o Postman ou o cURL.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas ou enviar solicitações pull.
