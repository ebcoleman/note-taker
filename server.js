const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// starts server and listens for requests
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
