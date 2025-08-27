const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./cadastro.db");

// Criando tabela se não existir
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    login TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
