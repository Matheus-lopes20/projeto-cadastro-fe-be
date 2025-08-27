import React, { useState } from "react";
import axios from "axios";

function CadastroForm() {
  const [form, setForm] = useState({ nome: "", login: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/cadastro", form);
      setMensagem(res.data.message);
      setForm({ nome: "", login: "", senha: "" });
    } catch (err) {
      setMensagem("Erro ao cadastrar: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <label>Nome:</label><br />
        <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Login:</label><br />
        <input type="text" name="login" value={form.login} onChange={handleChange} required />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Senha:</label><br />
        <input type="password" name="senha" value={form.senha} onChange={handleChange} required />
      </div>
      <button type="submit">Cadastrar</button>
      {mensagem && <p style={{ marginTop: "15px", color: "green" }}>{mensagem}</p>}
    </form>
  );
}

export default CadastroForm;
