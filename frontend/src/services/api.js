// pasta services: cuidará da comunicação com o externo

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333' // URL que aparece em todas as chamadas
})

export default api; // permite importação por outros arquivos