import db from "/Users/nicolasrodriguez/Downloads/maraton_back/databases/firebases.js";
import { collection, addDoc } from "firebase/firestore";

async function createCustomer(req, res) {
  const firestore = db.database;

  const concursante = collection(firestore, "Concursante");

  if (
    req.body.nombre == "" ||
    req.body.apellido == "" ||
    req.body.codigo == "" ||
    req.body.carrera == "" ||
    req.body.nivel == "" ||
    req.body.correo == ""
  ) {
    res.send("Error: Campos vacios!");
  } else {
    var datosConcursante = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      codigo: req.body.codigo,
      carrera: req.body.carrera,
      nivel: req.body.nivel,
      correo: req.body.correo,
    };

    await addDoc(concursante, datosConcursante)
      .then(() => {
        res.send("Notificación: Usuario creado!");
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

export default { createCustomer };
