const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const feedbackFile = path.join(__dirname, '..', 'data', 'feedback.json');

// สร้าง route handler สำหรับการใช้ใน server.js
router.post('/', async (req, res) => {
    const feedbackData = req.body;
    try {
        const data = await fs.readFile(feedbackFile, 'utf8');
        const feedbacks = JSON.parse(data);
        feedbacks.push(feedbackData);
        await fs.writeFile(feedbackFile, JSON.stringify(feedbacks, null, 2));
        res.status(200).json({ success: true, message: 'Feedback saved successfully' });
    } catch (err) {
        console.error('Error processing feedback data:', err);
        res.status(500).json({ success: false, message: 'Error saving feedback' });
    }
});

// ✅ GET /api/feedback/stats
router.get('/stats', async (req, res) => {
    try {
        const data = await fs.readFile(feedbackFile, 'utf8');
        const feedbacks = JSON.parse(data);
        const stats = {
            totalFeedback: feedbacks.length,
        };
        res.status(200).json(stats);
    } catch (err) {
        console.error('Error reading feedback stats:', err);
        res.status(500).json({ error: 'Failed to load feedback stats' });
    }
});

module.exports = router;  // ส่งออก router ที่ถูกต้อง
