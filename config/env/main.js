const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');

const app = express();
const port = 3000;

// Configuração do servidor
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Conexão com o banco de dados
const db = new sqlite3.Database('usuarios.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado ao banco de dados.');
});

// Cria o banco de dados
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
)`);

// Rota para página inicial
app.get('/', (req, res) => {
  res.sendFile('/home/guilherme/Documents/ProjetoEspecializado/views/login.html');
});

// Rota para página de cadastro de usuários
app.get('/register', (req, res) => {
  res.sendFile('/home/guilherme/Documents/ProjetoEspecializado/views/register.html');
});

// Rota para cadastrar um novo usuário
app.post('/register', (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifica se todos os campos foram preenchidos
  if (!nome || !email || !senha) {
    res.status(400).send('Todos os campos são obrigatórios!');
    return;
  }

  // Verifica se o email já foi cadastrado
  db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar usuário!');
      return;
    }
    if (row) {
      res.status(400).send('Este email já foi cadastrado!');
      return;
    }

    // Criptografa a senha antes de salvar no banco de dados
    bcrypt.hash(senha, saltRounds, (err, hash) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao criar hash da senha!');
        return;
      }

      // Insere o novo usuário no banco de dados
      db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash], (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Erro ao cadastrar usuário!');
          return;
        }
        res.redirect('/');
      });
    });
  });
});

// Rota para realizar o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Verifica se todos os campos foram preenchidos
  if (!email || !senha) {
    res.status(400).send('Todos os campos são obrigatórios!');
    return;
  }

  // Busca o usuário no banco de dados pelo email
  db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar usuário!');
      return;
    }
    if (!row) {
      res.status(401).send('Email ou senha incorretos!');
      return;
    }

    // Compara a senha digitada com a senha armazenada no banco de dados
    bcrypt.compare(senha, row.senha, (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erro ao comparar senhas!');
        return;
      }
      if (!result) {
        res.status(401).send('Email ou senha incorretos!');
        return;
      }
      res.redirect('/');
    });
    });

    // Fecha a conexão com o banco de dados ao finalizar o processo
    process.on('SIGINT', () => {
        db.close((err) => {
        if (err) {
        console.error(err.message);
        }
        console.log('Conexão com o banco de dados fechada.');
        process.exit(0);
        });
    });
});    

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
  });
