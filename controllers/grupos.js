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

async function createGrupo(req, res) {
  if (
    req.body.nombre == "" ||
    req.body.lider == "" ||
    req.body.integrante1 == "" ||
    req.body.integrante2 == ""
  ) {
    res.send("Error: Campos vacios!");
  } else {
    var datosGrupo = {
      nombre:req.body.nombre,
      lider: req.body.lider,
      integrante1: req.body.integrante1,
      integrante2: req.body.integrante2,
    };

    const grupo = collection(firestore, "Grupos");
    await addDoc(grupo, datosGrupo)
      .then(() => {
        res.send("Notificación: Grupo creado!");
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

async function validacion(req, res) {
  const concursante = collection(firestore, "Concursante");
  const q = query(concursante, where("codigo", "==", req.body.lider));
  const querySnapshot = await getDocs(q);
  var data = "";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    data = doc.data();
  });
  res.send(data);

  if (data.codigo != "lider") {
    return false;
  } else {
    return true;
  }
}

async function readGrupo(req, res) {
  const grupo = collection(firestore, "Grupos");
  const q = query(grupo, where("nombre", "==", req.body.nombre));
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

async function deleteGrupo(req, res) {
  const grupo = collection(firestore, "Grupos");
  const q = query(grupo, where("lider", "==", req.body.lider));
  const querySnapshot = await getDocs(q);
  var id = " ";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    id = doc.id;
  });
  const grupoId = doc(firestore, "Grupos", id);
  await deleteDoc(grupoId)
    .then(() => {
      res.send("Notificación: Grupo eliminado!");
    })
    .catch((error) => {
      res.send(error);
    });
}

export default {
  createGrupo,
  readGrupo,
  deleteGrupo,
  validacion,
};
