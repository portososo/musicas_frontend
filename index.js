require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Listar todas
app.get("/musicas", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM musicas");
  res.json(rows);
});

// Buscar por id
app.get("/musicas/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM musicas WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ erro: "Música não encontrada" });
  res.json(rows[0]);
});

// Criar
app.post("/musicas", async (req, res) => {
  const { titulo, artista, album, ano, genero } = req.body;
  if (!titulo || !artista) return res.status(400).json({ erro: "Título e artista são obrigatórios" });
  const [result] = await db.query(
    "INSERT INTO musicas (titulo, artista, album, ano, genero) VALUES (?, ?, ?, ?, ?)",
    [titulo, artista, album, ano, genero]
  );
  res.status(201).json({ id: result.insertId, titulo, artista, album, ano, genero });
});

// Atualizar
app.put("/musicas/:id", async (req, res) => {
  const { titulo, artista, album, ano, genero } = req.body;
  const [result] = await db.query(
    "UPDATE musicas SET titulo = ?, artista = ?, album = ?, ano = ?, genero = ? WHERE id = ?",
    [titulo, artista, album, ano, genero, req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ erro: "Música não encontrada" });
  res.json({ mensagem: "Música atualizada" });
});

// Deletar
app.delete("/musicas/:id", async (req, res) => {
  const [result] = await db.query("DELETE FROM musicas WHERE id = ?", [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ erro: "Música não encontrada" });
  res.json({ mensagem: "Música removida" });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro no servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));