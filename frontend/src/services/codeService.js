import api from './api';

const analyzeCode = async (code, language) => {
    const response = await api.post('/code/analyze', { code, language });
    return response.data;
};

const codeService = {
    analyzeCode,
};

export default codeService;
