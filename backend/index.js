// Importando o módulo Express
const express = require ('express');

// Colocando o servidor no ar
const app = express();

// Cadastrando no express a interpretação de JSON
app.use(express.json());

// Setando a porta que a aplicação vai rodar
app.listen(3333);

// Métodos HTTP
// GET -> Receber uma informação (Listar usuários)
// POST -> Criar alguma informação (Ex: Salvar um produto, cadastrar um usuário)
// PUT -> Editar alguma informação
// DELETE -> Deletar alguma informação

//GET
app.get('/users', (request, response) => {
   console.log(request.query) ;
   return response.json({ message : 'Hello Rodrigo' });
});

// POST
app.post('/users', (request, response) => {
    console.log(request.body) ;
    return response.json({ message : 'Hello Rodrigo' });
 });
// PUT
app.put('/users', (request, response) => {
    console.log(request.query) ;
    return response.json({ message : 'Hello Rodrigo' });
 });
// DELETE
app.delete('/users', (request, response) => {
    console.log(request.query) ;
    return response.json({ message : 'Hello Rodrigo' });
 });

// Tipos de parâmetros
// Query Params -> na maioria das vezes utilizando nos métodos GET , req.query (Filtros, ordenação e paginação)
// Route Params -> request.params (Identificar um recurso na alteração ou remoção)
// Body -> request.body

// Conectando a aplicação com o banco de dados MONGODB


