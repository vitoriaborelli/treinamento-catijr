const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        // paginação (divisão do conteúdo em páginas com 5 registros em cada)
        const { page = 1 } = request.query;
        
        // colchetes indicam pegar apenas o primeiro valor. contando total de casos
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // relacionando dados das 2 tabelas (mostrando dados que estão nas duas)
            .limit(5)
            .offset((page - 1) * 5)
            // não seleciona tudo de uma vez para não ter sobreposição de dados
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },


    async create(request, response) {
       const { title, description, value } = request.body;
       const ong_id = request.headers.authorization;
       
       const [id] = await connection('incidents').insert({
           title,
           description,
           value,
           ong_id,
       });

    return response.json({ id });
    },

    async delete (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
           .where('id', id)
           .select('ong_id')
           .first();
        
        // checando se a ong tentando deletar é a proprietária do incidente
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();
    
        return response.status(204).send();
    }
}; 

// status 204: resposta bem sucedida mas sem conteúdo para apresentar
// headers: dados que caracterizam o contexto da requisição