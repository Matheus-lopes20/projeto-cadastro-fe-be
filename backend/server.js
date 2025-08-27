const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota de cadastro
app.post("/api/cadastro", (req, res) => {
  const { nome, login, senha } = req.body;

  if (!nome || !login || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos!" });
  }

  const query = `INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)`;
  db.run(query, [nome, login, senha], function (err) {
    if (err) {
      return res.status(500).json({ message: "Erro ao cadastrar", error: err.message });
    }
    res.json({ message: "Cadastro realizado com sucesso!", id: this.lastID });
  });
});

// Iniciando servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
