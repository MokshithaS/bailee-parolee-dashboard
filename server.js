const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let profiles = []; // In-memory storage for profiles (use a database in production)

// GET endpoint to fetch profiles
app.get('/profiles', (req, res) => {
    res.json(profiles);
});

// POST endpoint to add new profiles
app.post('/profiles', (req, res) => {
    const newProfile = req.body;
    profiles.push(newProfile);
    res.status(201).json(newProfile);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
