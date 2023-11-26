import db from "/Users/nicolasrodriguez/Downloads/maraton_back/databases/firebases.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

const firestore = db.database;

async function createNivel(req, res) {
  if (
    req.body.dificultad == "" ||
    req.body.nombre == "" 
  ) {
    res.send("Error: Campos vacios!");
  } else {
    var datosNivel = {
      nombre: req.body.nombre,
      dificultad: req.body.dificultad,
    };

    const nivel = collection(firestore, "Niveles");
    await addDoc(nivel, datosNivel)
      .then(() => {
        res.send("Notificación: Nivel creado!");
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

async function updateNivel(req, res) {
  const nivel = collection(firestore, "Niveles");
  var variableCambiare = "";

  if (req.body.nombreN != undefined) {
    variableCambiare = req.body.nombreN;
    const q = query(nivel, where("nombre", "==", req.body.nombreA));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const nivelId = doc(firestore, "Niveles", id);
    updateDoc(nivelId, {
      nombre: variableCambiare,
    })
      .then(() => {
        res.send("Notificación: nivel actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (req.body.dificultadN != undefined) {
    variableCambiare = req.body.dificultadN;
    const q = query(nivel, where("dificultad", "==", req.body.dificultadA));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const nivelId = doc(firestore, "Niveles", id);
    updateDoc(nivelId, {
      dificultad: variableCambiare,
    })
      .then(() => {
        res.send("Notificación: nivel actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
  } 

}

async function readNivel(req, res) {
  const nivel = collection(firestore, "Niveles");
  const q = query(nivel, where("nombre", "==", req.body.nombre));
  const querySnapshot = await getDocs(q);
  var data = "";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    data = doc.data();
  });
  res.send(data);
}

async function readNivels(req, res) {
  const nivel = collection(firestore, "Niveles");
  const q = query(
    nivel,
    where(req.body.parametro, "==", req.body.variable)
  );
  const querySnapshot = await getDocs(q);
  var data = [];
  var i = 0;
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    data[i] = doc.data();
    i++;
  });
  res.send(data);
}

async function deleteNivel(req, res) {
  const nivel = collection(firestore, "Niveles");
  const q = query(nivel, where("nombre", "==", req.body.nombre));
  const querySnapshot = await getDocs(q);
  var id = " ";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    id = doc.id;
  });
  const nivelId = doc(firestore, "Niveles", id);
  await deleteDoc(nivelId)
    .then(() => {
      res.send("Notificación: nivel eliminado!");
    })
    .catch((error) => {
      res.send(error);
    });
}

export default {
  createNivel,
  updateNivel,
  readNivel,
  readNivels,
  deleteNivel,
};
