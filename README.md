# Tic Tac Toe - Server

Backend server for the Tic Tac Toe final project.
Built with Node.js, Express, and Redis.

## What this server does

This is the backend (server side) of the Tic Tac Toe game.
It receives requests from the browser (client), saves wins to a Redis database, and returns leaderboard data.

## API Routes

| Method | Route | What it does |
|--------|-------|-------------|
| POST | `/wins` | Records a win for a username. Creates the user if they don't exist, or adds 1 to their count if they do. |
| GET | `/leaderboard` | Returns all players and their win counts, sorted from most to least wins. |

## Technologies Used

- **Node.js** – The runtime that lets us run JavaScript on the server
- **Express** – A framework that makes it easy to create API routes
- **ioredis** – A library that connects Node.js to Redis
- **cors** – Allows the browser client (on a different URL) to talk to this server
- **dotenv** – Loads secret credentials from the .env file

## How to run locally

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root folder with your Redis credentials:
   ```
   REDIS_HOST=your-redis-host
   REDIS_PORT=your-redis-port
   REDIS_PASSWORD=your-redis-password
   ```
4. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:3000`

## Environment Variables

This project uses environment variables to keep credentials secure and out of GitHub.

| Variable | Description |
|----------|-------------|
| `REDIS_HOST` | The Redis server hostname |
| `REDIS_PORT` | The Redis server port number |
| `REDIS_PASSWORD` | The Redis server password |
| `PORT` | The port this server listens on (set automatically by Render) |

On Render, these are entered in the "Environment Variables" section of your service dashboard.

## Deployment

This server is deployed on [Render](https://render.com).
It is connected to this GitHub repository — every push to `main` triggers an automatic redeploy.

## Project Author

**Shachar Cohen Sharon**
- GitHub: [@Shachar1207](https://github.com/Shachar1207)
- Email: Shachari07sharon@gmail.com