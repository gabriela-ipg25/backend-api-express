const express = require("express");
const app = express();

const routes = require("./routes");

app.use(express.json());

app.use("/tareas", routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});