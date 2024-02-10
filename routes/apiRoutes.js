const fs = require('fs');
const path = require('parth');
const router = require('express').Router();
const dbFilePath = path.join(__dirname, '../db/db.json');

// Route to read notes from db.json and return as JSON
router.get('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Route to save a new note to db.json
router.post('/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const notes = JSON.parse(data);
        newNote.id = generateUniqueId(); // Function to generate a unique ID
        notes.push(newNote);
        fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json(newNote);
        });
    });
});

// Function to generate a unique ID
function generateUniqueId() {
    // Logic to generate a unique ID
}

module.exports = router;