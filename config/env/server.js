const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('./config/data/materias.db', sqlite3.OPEN_READONLY);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/testeBusca.html');
});

app.get('/search', (req, res) => {
  const searchQuery = req.query.query;

  db.all(`SELECT * FROM materias WHERE codigo LIKE '%${searchQuery}%' OR nome LIKE '%${searchQuery}%' OR tipo LIKE '%${searchQuery}%'`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Ocorreu um erro ao realizar a busca' });
      return;
    }

    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
