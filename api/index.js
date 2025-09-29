const express = require("express");
const cors = require("cors");
const app = express();

const clientesRoutes = require("./routes/clientes");
const pedidosRoutes = require("./routes/pedidos");

app.use(cors());
app.use(express.json());

app.use("/clientes", clientesRoutes);
app.use("/pedidos", pedidosRoutes);

app.listen(3000, () => {
  console.log("API rodando na porta 3000 🚀");
});
