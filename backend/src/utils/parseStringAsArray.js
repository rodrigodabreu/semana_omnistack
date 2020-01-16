module.exports = function parseStringAsArray (arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim()); // remover espaçamentos e vírgulas para adicionar no array de techs
}