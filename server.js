const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'routes')))
// Define the path to the db.json file
const dbFilePath = path.join(__dirname, '/db/db.json');

// GET for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET for notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request to retrieve all notes
app.get('/api/notes', (req, res) => {
    // Read the contents of db.json file
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading notes');
            return;
        }
        // Parse the JSON data
        const notes = JSON.parse(data);
        // Respond with the notes data as JSON
        res.json(notes);
    });
});

// POST request to add a new note
app.post('/api/notes', (req, res) => {
    // Read the contents of db.json file
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading notes');
            return;
        }
        // Parse the JSON data
        const notes = JSON.parse(data);
        // Generate a unique ID for the new note
        const newNote = {
            id: notes.length + 1,
            title: req.body.title,
            text: req.body.text
        };
        // Add the new note to the array
        notes.push(newNote);
        // Write the updated notes array back to the db.json file
        fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing note to file');
                return;
            }
            // Respond with the updated notes data as JSON
            res.json(notes);
        });
    });
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
