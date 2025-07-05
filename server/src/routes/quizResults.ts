 import express from 'express';
import { QuizResult } from '../models/QuizResult';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { quizId, answers, score, totalQuestions } = req.body;

        const quizResult = new QuizResult({
            quizId,
            answers,
            score,
            totalQuestions
        });

        await quizResult.save();

        res.status(201).json({
            success: true,
            data: quizResult
        });
    } catch (error) {
        console.error('Error saving quiz result:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save quiz result'
        });
    }
});

export default router; 