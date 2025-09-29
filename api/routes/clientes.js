const express = require("express");
const router = express.Router();
const db = require("../db");

// Criar cliente
// Criar cliente
router.post("/", (req, res) => {
  const { nome, email } = req.body;
  db.query(
    "INSERT INTO clientes (nome, email) VALUES (?, ?)",
    [nome, email],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Este email já está cadastrado!" });
        }
        return res.status(500).json(err);
      }
      res.json({ id: result.insertId, nome, email });
    }
  );
});


// Listar clientes
router.get("/", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
