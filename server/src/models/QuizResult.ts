import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
    quizId: {
        type: String,
        required: true
    },
    answers: {
        type: [Number],
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const QuizResult = mongoose.model('QuizResult', quizResultSchema); 