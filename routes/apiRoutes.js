const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const dbFilePath = path.join(__dirname, '../db/db.json');

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

router.post('/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const notes = JSON.parse(data);
        newNote.id = generateUniqueId();
        notes.push(newNote);
        fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json(newNote); // Send back the newly added note as a response
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        let notes = JSON.parse(data);
        // Filter out the note with the given ID
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.sendStatus(204); // Send No Content status to indicate successful deletion
        });
    });
});

function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
    const randomStr = Math.random().toString(36).substr(2, 5); // Generate random string (remove '0.' prefix)
    return timestamp + randomStr; // Combine timestamp and random string
}

module.exports = router;
