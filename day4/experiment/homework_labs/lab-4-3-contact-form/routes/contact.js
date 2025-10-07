const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { validateContact } = require('../middleware/validation');
const { readJSON, writeJSON } = require('../middleware/fileManager');

const contactFile = path.join(__dirname, '..', 'data', 'contacts.json');

// POST /api/contact
router.post('/', validateContact, async (req, res) => {
    try {
        const contacts = await readJSON(contactFile);
        const newContact = { id: Date.now(), ...req.body };
        contacts.push(newContact);
        await writeJSON(contactFile, contacts);
        res.status(201).json({ success: true, data: newContact });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Could not save contact' });
    }
});

// GET /api/contact?page=1&limit=10
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const contacts = await readJSON(contactFile);
        const start = (page - 1) * limit;
        const end = start + parseInt(limit);
        res.json({
            success: true,
            page: parseInt(page),
            limit: parseInt(limit),
            total: contacts.length,
            data: contacts.slice(start, end)
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to load contacts' });
    }
});

module.exports = router;
