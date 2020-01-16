const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// FUNCOES -> INDEX (MOSTRAR UMA LISTA), SHOW (MOSTRAR UM UNICO), STORE (CRIAR), UPDATE (ALTERAR), DESTROY (DELETAR)

module.exports = {

    // mostra a lista de devs
    async index(request, response){
        const devs = await Dev.find(); //buscando a lista de devs no banco
        
        return response.json(devs);
    },

    // criando um Dev
    async store(request, response) {

        const {
            github_username,
            techs,
            latitude,
            longitude
        } = request.body;

        let dev = await Dev.findOne({
            github_username
        });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const {
                name = login, avatar_url, bio
            } = apiResponse.data;

            const techsArray = parseStringAsArray(techs); // metodo utilizado para converter as string de tech em um array de techs

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({

                github_username, //short syntaxe JS
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }

        return response.json(dev);
    },
    
    // TODO: atualizar os dados do dev
    async update (request, response) {
        
        return response.json({});
    },

    //  TODO: deletar o registro do dev
    async destroy (request, response) {
        
        return response.json({});
    }
}