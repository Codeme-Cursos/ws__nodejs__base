const express = require("express");
const http = require("http");
const data = require("./db.json");
const app = express();
const prefix = "/api";
const { PORT } = process.env;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a mi primera API</h1>");
});

app.get(`${prefix}/tasks`, (req, res) => {
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      error: "No hay tareas registradas",
    });
  }
});

app.get(`${prefix}/task/:id`, (req, res) => {
  const { params } = req;
  const taskFound = data.filter((item) => item.id === parseInt(params.id));
  if (taskFound.length > 0) {
    res.status(200).json(taskFound[0]);
  } else {
    res.status(404).json({
      error: "Tarea no encontrada",
    });
  }
});

app.post(`${prefix}/task`, (req, res) => {
  const { body } = req;
  const idCheck = data.some((item) => item.id === body.id);
  if (idCheck) {
    res.status(500).json({
      error: "EL ID ya se encuentra registrado",
    });
  } else {
    data.push(body);
    res.status(201).json({
      success: "Tarea creada con éxito",
    });
  }
});

app.patch(`${prefix}/task/:id`, (req, res) => {
  const { body, params } = req;
  const index = data.findIndex((item) => item.id === parseInt(params.id));
  if (index < 0) {
    res.status(404).json({
      error: "Tarea no encontrada",
    });
  } else {
    data[index].description = body.description;
    data[index].responsable = body.responsable;
    res.status(201).json({
      success: "Tarea actualizada con éxito",
    });
  }
});

app.delete(`${prefix}/task/:id`, (req, res) => {
  const { params } = req;
  const index = data.findIndex((item) => item.id === parseInt(params.id));
  if (index < 0) {
    res.status(404).json({
      error: "Tarea no encontrada",
    });
  } else {
    data.splice(index, 1);
    res.status(200).json({
      success: "Tarea borrada con éxito",
    });
  }
});

const server = http.createServer(app);
server.listen(PORT || 4000, () => {
  console.log(`Server on port ${PORT || 4000}`);
});
