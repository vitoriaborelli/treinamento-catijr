const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*'); // seleciona todos os campos de todos os registros da tabela ong (lista)
    
        return response.json(ongs);
    },



    async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    // função para gerar valor aleatório de id
    const id = crypto.randomBytes(4).toString('HEX');
    
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })
        
     return response.json({ id });
    }
};