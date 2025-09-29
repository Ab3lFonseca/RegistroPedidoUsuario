const express = require("express");
const router = express.Router();
const db = require("../db");

// Criar pedido
router.post("/", (req, res) => {
  const { cliente_id, descricao, valor } = req.body;
  db.query(
    "INSERT INTO pedidos (cliente_id, descricao, valor) VALUES (?, ?, ?)",
    [cliente_id, descricao, valor],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, cliente_id, descricao, valor });
    }
  );
});

// Consulta 1: JOIN (pedidos com cliente)
router.get("/", (req, res) => {
  db.query(
    `SELECT p.id, p.descricao, p.valor, p.data_cadastro, c.nome, c.email
     FROM pedidos p
     JOIN clientes c ON p.cliente_id = c.id
     ORDER BY p.data_cadastro DESC`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// Consulta 2: GROUP BY (total por cliente)
router.get("/resumo", (req, res) => {
  db.query(
    `SELECT c.nome, SUM(p.valor) AS total_gasto
     FROM pedidos p
     JOIN clientes c ON p.cliente_id = c.id
     GROUP BY c.id, c.nome`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});


module.exports = router;
