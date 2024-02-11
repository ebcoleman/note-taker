
const router = require('express').Router();
const path = require('path');

// routes to the homepage "index.html"
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// routes to the note page "notes.html"
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// makes available for use in other places(modules)
module.exports = router;
