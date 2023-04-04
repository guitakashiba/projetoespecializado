const readline = require('readline');

// Cria um objeto usuário com as informações de cadastro
let usuario = {
  nomeCompleto: '',
  matricula: '',
  tipo: ''
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Solicita as informações do usuário através do terminal
rl.question('Digite seu nome completo: ', (nomeCompleto) => {
  usuario.nomeCompleto = nomeCompleto;

  rl.question('Digite sua matrícula: ', (matricula) => {
    usuario.matricula = matricula;

    rl.question('Você é um aluno ou um administrador? Digite "aluno" ou "administrador": ', (tipoUsuario) => {
      // Verifica o tipo de usuário e atribui um identificador distinto
      if (tipoUsuario.toLowerCase() === 'aluno') {
        usuario.tipo = 'A';
      } else if (tipoUsuario.toLowerCase() === 'administrador') {
        usuario.tipo = 'B';
      } else {
        console.log('Tipo de usuário inválido.');
      }

      // Imprime as informações do usuário cadastrado
      console.log('Usuário cadastrado:');
      console.log('Nome completo: ' + usuario.nomeCompleto);
      console.log('Matrícula: ' + usuario.matricula);
      console.log('Tipo: ' + usuario.tipo);

      rl.close();
    });
  });
});
