const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./config/users.db');

function redirectInicial(){
  window.location.href = "/views/telaInicial.html";
}

function redirectCad(){
  window.location.href = "/views/cadastroResp.html";
}

// Inicializa o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

function salvarDados(){
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Rota para a página de cadastro
  app.get('./views', (req, res) => {
    res.sendFile('/cadastroResp.html');
  });

  // Rota para o cadastro de usuários
  app.post('./views/cadastroResp.html', (req, res) => {
    const { nome, matricula, email, curso, senha } = req.body;

    db.run(
      'INSERT INTO usuarios (nome, matricula, email, curso, senha) VALUES (?, ?, ?, ?, ?)',
      [nome, matricula, email, curso, senha],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erro ao cadastrar usuário');
        } else {
          res.send('Usuário cadastrado com sucesso!');
        }
      }
    );
  });

  // Cria tabela de usuários no banco de dados
  db.serialize(() => {
    db.run(
      'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, matricula TEXT, email TEXT, curso TEXT, senha TEXT)'
    );
  });
}


