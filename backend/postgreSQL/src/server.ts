import express from 'express';

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
  res.send('Well done postgreSQL!');
});

app.listen(PORT, HOST, () => console.log(`✅ The server is up and running on http://${HOST}:${PORT}`))
