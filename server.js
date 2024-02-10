const express = require('express');
const fs = require('fs');
const path = require('path');



const app = express();
const PORT = 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET for notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
