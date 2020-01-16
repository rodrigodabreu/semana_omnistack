const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        // buscar todos os devs no raio de 10km 
        // filtrar por tech

        const {
            latitude,
            longitude,
            techs
        } = request.query;

        const techsArray = ParseStringAsArray(techs); // metodo utilizado para converter as string de tech em um array de techs

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //10km
                },
            },
        });

        return response.json({
            devs
        });
    }
}