// Importando o módulo Express
const express = require ('express');
const mongoose = require ('mongoose');
const routes = require ('./routes');

// Colocando o servidor no ar
const app = express();

// Conectando o mongoose ao banco do MONGODB
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-nwgmj.mongodb.net/week10?retryWrites=true&w=majority', {
    // PARA RETIRAR O DEPRECATION WARNING
    useUnifiedTopology: true, 
    useNewUrlParser: true,
})
;

// Cadastrando no express a interpretação de JSON
app.use(express.json()); //precisa vir antes das rotas
app.use(routes);

// Setando a porta que a aplicação vai rodar
app.listen(3333);

// Métodos HTTP
// GET -> Receber uma informação (Listar usuários)
// POST -> Criar alguma informação (Ex: Salvar um produto, cadastrar um usuário)
// PUT -> Editar alguma informação
// DELETE -> Deletar alguma informação

// Tipos de parâmetros
// Query Params -> na maioria das vezes utilizando nos métodos GET , req.query (Filtros, ordenação e paginação)
// Route Params -> request.params (Identificar um recurso na alteração ou remoção)
// Body -> request.body



