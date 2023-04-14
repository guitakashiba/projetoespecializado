
function redirect(){
  window.location.href = "/views/cadastroResp.html";
}

function salvarDados(){
  // captura os dados do formulário
  const nome = document.getElementById("nome").value;
  const matricula = document.getElementById("matricula").value;
  const email = document.getElementById("email").value;
  const curso = document.getElementById("curso").value;
  const senha = document.getElementById('senha').value;

  // cria uma conexão com o banco de dados
  var db = new sqlite3.Database('usuarios.db');

  // cria a tabela se ela não existir
  db.run('CREATE TABLE IF NOT EXISTS usuarios (nome TEXT, matricula TEXT, curso TEXT,email TEXT, senha TEXT)');

  // insere os dados na tabela
  db.executeSql(
    "INSERT INTO usuarios (nome, matricula, email, curso, senha) VALUES (?, ?, ?, ?, ?)",
    [nome, matricula, email, curso, senha],
    () => console.log("Dados inseridos com sucesso!"),
    (error) => console.error("Erro ao inserir dados: " + error.message)
  );

  // fecha a conexão com o banco de dados
  db.close();

  // redireciona o usuário para outra página
  window.location.href = "/views/telaInicial.html";
}

function redirectInicial(){
  window.location.href = "/views/telaInicial.html";
}
