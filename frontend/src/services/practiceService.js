import api from './api';

const getModules = async () => {
    const response = await api.get('/practice/modules');
    return response.data;
};

const getQuestions = async (module, difficulty) => {
    const response = await api.get(`/practice/questions?module=${module}&difficulty=${difficulty}`);
    return response.data;
};

const getQuestionById = async (id) => {
    const response = await api.get(`/practice/questions/${id}`);
    return response.data;
};

const submitCode = async (questionId, code, language) => {
    const response = await api.post('/practice/submit', { questionId, code, language });
    return response.data;
};

const markSolved = async (questionId) => {
    const response = await api.post('/practice/mark-solved', { questionId });
    return response.data;
};

const getUserProgress = async () => {
    const response = await api.get('/practice/progress');
    return response.data;
};

const practiceService = {
    getModules,
    getQuestions,
    getQuestionById,
    submitCode,
    markSolved,
    getUserProgress
};

export default practiceService;
