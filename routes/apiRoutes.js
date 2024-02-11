const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const dbFilePath = path.join(__dirname, '../db/db.json');

// GET route to get notes from db file
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

// adds new notes to db file
router.post('/notes', (req, res) => {
    const newNote = req.body;
    // uft8 tells Node.js that this is encoded text, not raw binary data
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

// deletes note from db
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        let notes = JSON.parse(data);
        // Filter out the note using the id
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.sendStatus(204); 
        });
    });
});

function generateUniqueId() {
    // turns the timestamp into a string to create a unique id
    return Date.now().toString(); 
}

module.exports = router;
