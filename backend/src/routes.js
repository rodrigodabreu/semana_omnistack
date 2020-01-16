const {Router} = require('express'); //modulo de roteamento
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// GET
routes.get('/devs', DevController.index); // rota para buscar a lista de devs
routes.get('/search', SearchController.index); //rota para buscar o dev com base na latitude/longitude


// POST
routes.post('/devs', DevController.store);


// PUT
routes.put('/devs', (request, response) => {
    console.log(request.query);
    return response.json({
        message: 'Hello Omnistack'
    });
});
// DELETE
routes.delete('/devs', (request, response) => {
    console.log(request.query);
    return response.json({
        message: 'Hello Omnistack'
    });
});

// Exportar as rotas
module.exports = routes;