const {Router} = require ('express'); //modulo de roteamento
const axios = require ('axios');
const Dev = require ('./model/Dev');

const routes = Router();

//GET
routes.get('/devs', (request, response) => {
    console.log(request.query) ;
    return response.json({ message : 'Hello Omnistack' });
 });
 
 // POST
 routes.post('/devs', async (request, response) => {

     const { github_username, techs } = request.body;

     const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

     const { name = login, avatar_url, bio } = apiResponse.data;

     console.log(name, avatar_url, bio);

     const techsArray = techs.split(',').map(tech => tech.trim()); //remover espaçamentos e vírgulas para adicionar no array de techs

     const dev = await Dev.create({
         github_username, //short syntaxe JS
         name,
         avatar_url,
         bio,
         techs: techsArray,
     });

     return response.json(dev);
  });


 // PUT
 routes.put('/devs', (request, response) => {
     console.log(request.query) ;
     return response.json({ message : 'Hello Omnistack' });
  });
 // DELETE
 routes.delete('/devs', (request, response) => {
     console.log(request.query) ;
     return response.json({ message : 'Hello Omnistack' });
  });

// Exportar as rotas
module.exports = routes;




