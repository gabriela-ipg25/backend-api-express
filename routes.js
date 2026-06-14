const express = require("express");
const router = express.Router();

const tareas = require("./data");

// GET: listar todas las tareas
router.get("/", (req, res) => {
  res.status(200).json(tareas);
});

// POST: crear una nueva tarea
router.post("/", (req, res) => {
  const { titulo, descripcion, completada } = req.body;

  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({
      error: "El campo titulo es obligatorio y debe ser texto"
    });
  }

  if (typeof completada !== "boolean") {
    return res.status(400).json({
      error: "El campo completada es obligatorio y debe ser true o false"
    });
  }

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    descripcion: descripcion || "",
    completada
  };

  tareas.push(nuevaTarea);

  res.status(201).json({
    mensaje: "Tarea creada correctamente",
    tarea: nuevaTarea
  });
});

// PUT: actualizar una tarea
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({
      error: "Tarea no encontrada"
    });
  }

  const { titulo, descripcion, completada } = req.body;

  if (titulo !== undefined && typeof titulo !== "string") {
    return res.status(400).json({
      error: "El campo titulo debe ser texto"
    });
  }

  if (completada !== undefined && typeof completada !== "boolean") {
    return res.status(400).json({
      error: "El campo completada debe ser true o false"
    });
  }

  if (titulo !== undefined) tarea.titulo = titulo;
  if (descripcion !== undefined) tarea.descripcion = descripcion;
  if (completada !== undefined) tarea.completada = completada;

  res.status(200).json({
    mensaje: "Tarea actualizada correctamente",
    tarea
  });
});

// DELETE: eliminar una tarea
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tareas.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Tarea no encontrada"
    });
  }

  const tareaEliminada = tareas.splice(index, 1);

  res.status(200).json({
    mensaje: "Tarea eliminada correctamente",
    tarea: tareaEliminada[0]
  });
});

module.exports = router;