const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');
const app = express();

// These two lines let the server understand JSON data sent from the browser
app.use(express.json());

// CORS allows the browser (running on a different URL) to talk to this server.
// Without this, the browser would block the connection for security reasons.
app.use(cors());

// Connect to Redis using environment variables (process.env.VARIABLE_NAME)
// This means the actual values are stored in a .env file that is NOT uploaded to GitHub
const client = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: 'default',
    password: process.env.REDIS_PASSWORD,
});

// This runs when the connection to Redis is successful
client.on('connect', () => {
    console.log('Connected to Redis successfully');
});

// This runs if there is a connection error
client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// ─────────────────────────────────────────────
// ROUTE 1: POST /wins
// Called when a player wins a game.
// The browser sends: { username: "Shachar" }
// The server adds 1 to that player's win count in Redis.
// If the player doesn't exist yet, Redis starts them at 1.
// ─────────────────────────────────────────────
app.post('/wins', async (req, res) => {
    const { username } = req.body;

    // Basic validation - make sure a username was actually sent
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    // Redis HINCRBY: increments a field inside a hash by a number.
    // Think of "leaderboard" as a table, and username as a row.
    // If "Shachar" doesn't exist, Redis creates it and sets it to 1.
    // If "Shachar" already exists, Redis adds 1 to their current count.
    await client.hincrby('leaderboard', username, 1);

    console.log(`Win recorded for: ${username}`);
    res.status(200).json({ message: `Win recorded for ${username}` });
});

// ─────────────────────────────────────────────
// ROUTE 2: GET /leaderboard
// Called when the browser wants to show the leaderboard screen.
// Returns all players and their win counts, sorted highest first.
// ─────────────────────────────────────────────
app.get('/leaderboard', async (req, res) => {
    // Redis HGETALL returns everything in the "leaderboard" hash
    // as an object like: { "Shachar": "5", "Dana": "3" }
    const data = await client.hgetall('leaderboard');

    if (!data) {
        // No players yet - return empty array
        return res.json([]);
    }

    // Convert the Redis object into an array of { username, wins } objects
    // and sort by wins from highest to lowest
    const leaderboard = Object.entries(data)
        .map(([username, wins]) => ({
            username,
            wins: parseInt(wins) // Redis stores numbers as strings, so convert to number
        }))
        .sort((a, b) => b.wins - a.wins); // Sort: highest wins first

    res.json(leaderboard);
});

// ─────────────────────────────────────────────
// Start the server
// On Render, the PORT is provided automatically via environment variable.
// Locally, we fall back to port 3000.
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});