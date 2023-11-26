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

async function createReto(req, res) {
  if (
    req.body.equipoA == "" || req.body.equipoB == "" 
  ) {
    res.send("Error: Campos vacios!");
  } else {
    var datosReto = {
      equipoA: req.body.equipoA,
      equipoB: req.body.equipoB
    };

    const reto = collection(firestore, "Retos");
    await addDoc(reto, datosReto)
      .then(() => {
        res.send("Notificación: Reto creado!");
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

async function readRetoA(req, res) {
  const reto = collection(firestore, "Retos");
  const q = query(
    reto,
    where("equipoA", "==", req.body.equipoA)
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

async function readRetoB(req, res) {
  const reto = collection(firestore, "Retos");
  const q = query(
    reto,
    where("equipoB", "==", req.body.equipoB)
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

async function deleteReto(req, res) {
  const grupo = collection(firestore, "Retos");
  const q = query(grupo, where("lider", "==", req.body.lider));
  const querySnapshot = await getDocs(q);
  var id = " ";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    id = doc.id;
  });
  const retoId = doc(firestore, "Retos", id);
  await deleteDoc(nivelId)
    .then(() => {
      res.send("Notificación: reto eliminado!");
    })
    .catch((error) => {
      res.send(error);
    });
}

export default {
  createReto,
  readRetoA,
  readRetoB,
  deleteReto
};
