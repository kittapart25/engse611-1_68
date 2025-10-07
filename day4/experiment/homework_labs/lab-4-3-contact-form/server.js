const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: import routes
// const contactRoutes = require('./routes/contact');
// const feedbackRoutes = require('./routes/feedback');
const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');




// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', limiter);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// TODO: ใช้ contactRoutes สำหรับ '/api/contact'
// TODO: ใช้ feedbackRoutes สำหรับ '/api/feedback'
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

// API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Contact Form API Documentation',
        version: '1.0.0',
        endpoints: {
            'POST /api/contact': {
                description: 'Submit contact form',
                requiredFields: ['name', 'email', 'subject', 'message'],
                optionalFields: ['phone', 'company']
            },
            'GET /api/contact': {
                description: 'Get all contact submissions (admin)',
                parameters: {
                    page: 'Page number (default: 1)',
                    limit: 'Items per page (default: 10)'
                }
            },
            'POST /api/feedback': {
                description: 'Submit feedback',
                requiredFields: ['rating', 'comment'],
                optionalFields: ['email']
            },
            'GET /api/feedback/stats': {
                description: 'Get feedback statistics'
            }
        }
    });
});

// TODO: สร้าง route GET /api/status
// ส่งสถานะของ API และจำนวนข้อมูลที่เก็บไว้
app.get('/api/status', (req, res) => {
    const contactsPath = path.join(__dirname, 'data', 'contacts.json');
    const feedbackPath = path.join(__dirname, 'data', 'feedback.json');

    const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8') || '[]');
    const feedbacks = JSON.parse(fs.readFileSync(feedbackPath, 'utf8') || '[]');

    res.json({
        success: true,
        status: 'API is running',
        data: {
            totalContacts: contacts.length,
            totalFeedbacks: feedbacks.length
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Contact Form API running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});