import sqlite3

# Conecta ao banco de dados
conn = sqlite3.connect('database.db')
"""
# Cria a tabela Aluno
conn.execute('''CREATE TABLE Aluno
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  Nome TEXT NOT NULL,
                  Matricula TEXT NOT NULL,
                  Curso TEXT NOT NULL);''')

# Cria a tabela Curso
conn.execute('''CREATE TABLE Curso
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  Nome TEXT NOT NULL);''')

# Cria a tabela Disciplina
conn.execute('''CREATE TABLE Disciplina
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  Nome TEXT NOT NULL,
                  Tipo TEXT NOT NULL,
                  HorasTotal INTEGER NOT NULL);''')

# Cria a tabela Matéria
conn.execute('''CREATE TABLE Materia
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  Nome TEXT NOT NULL,
                  Tipo TEXT NOT NULL,
                  CargaHora INTEGER NOT NULL);''')

# Cria a tabela bridge Curso-Disciplina
conn.execute('''CREATE TABLE Curso_Disciplina
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  Curso_id INTEGER NOT NULL,
                  Disciplina_id INTEGER NOT NULL,
                  FOREIGN KEY (Curso_id) REFERENCES Curso(id),
                  FOREIGN KEY (Disciplina_id) REFERENCES Disciplina(id));''')

# Cria a tabela bridge Disciplina-Matéria
conn.execute('''CREATE TABLE Disciplina_Materia
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  Disciplina_id INTEGER NOT NULL,
                  Materia_id INTEGER NOT NULL,
                  FOREIGN KEY (Disciplina_id) REFERENCES Disciplina(id),
                  FOREIGN KEY (Materia_id) REFERENCES Materia(id));''')

# Cria a tabela bridge Matéria-Aluno
conn.execute('''CREATE TABLE Materia_Aluno
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  Materia_id INTEGER NOT NULL,
                  Aluno_id INTEGER NOT NULL,
                  FOREIGN KEY (Materia_id) REFERENCES Materia(id),
                  FOREIGN KEY (Aluno_id) REFERENCES Aluno(id));''')

"""

# Insere dados na tabela Aluno
conn.execute("INSERT INTO Aluno (Nome, Matricula, Curso) VALUES ('Aluno Teste', '1234', 'Engenharia de Controle e Automação')")

# Insere dados na tabela Curso
conn.execute("INSERT INTO Curso (Nome) VALUES ('Engenharia de Controle e Automação')")

# Insere dados na tabela Disciplina
conn.execute("INSERT INTO Disciplina (Nome, Tipo, HorasTotal) VALUES ('Obrigatoria', 0)")
conn.execute("INSERT INTO Disciplina (Nome, Tipo, HorasTotal) VALUES ('Especializada', 396)")
conn.execute("INSERT INTO Disciplina (Nome, Tipo, HorasTotal) VALUES ('Engenharia CA', 144)")
conn.execute("INSERT INTO Disciplina (Nome, Tipo, HorasTotal) VALUES ('Engenharia Livre', 144)")
conn.execute("INSERT INTO Disciplina (Nome, Tipo, HorasTotal) VALUES ('Complementar', 108)")

# Insere dados na tabela Matéria
conn.execute("INSERT INTO Materia (Codigo, Nome, Tipo, CargaHora) VALUES ('BLU6001','Cálculo I', 'Obrigatoria', 108)")


# Salva as alterações e fecha a conexão
conn.commit()
conn.close()
