# Tic Tac Toe - Server

The backend server for the Tic Tac Toe game.
Built with Node.js, Express, and Redis.

## What this server does
- Saves a win to the database when a player wins
- Returns the leaderboard with all players and their win counts

## Live Server URL
https://tic-tac-toe-server-3mou.onrender.com

## API Routes
- `POST /wins` — saves a win for a username
- `GET /leaderboard` — returns all players sorted by wins

## Technologies Used
- **Node.js** — runs JavaScript on the server
- **Express** — handles the API routes
- **ioredis** — connects to the Redis database
- **dotenv** — keeps the database password out of the code

## Environment Variables
The database credentials are stored securely as environment variables, not in the code.

| Variable | Description |
|----------|-------------|
| `REDIS_HOST` | Redis server address |
| `REDIS_PORT` | Redis server port |
| `REDIS_PASSWORD` | Redis server password |

## Project Author
**Shachar Cohen Sharon**
GitHub: [@Shachar1207](https://github.com/Shachar1207)
Email: Shachari07sharon@gmail.com