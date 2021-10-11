import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Well done!');
});

app.listen(3000, () => console.log('✅ The server is up and running on port 3000!'))
