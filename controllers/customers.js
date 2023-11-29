import db from "../databases/firebases.js";
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

async function createCustomer(req, res) {
  if (
    req.body.nombre == "" ||
    req.body.apellido == "" ||
    req.body.codigo == "" ||
    req.body.carrera == "" ||
    req.body.nivel == "" ||
    req.body.correo == "" ||
    req.body.cargo == "" 
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
      cargo: req.body.cargo
    };

    const concursante = collection(firestore, "Concursante");
    await addDoc(concursante, datosConcursante)
      .then(() => {
        res.send("Notificación: Usuario creado!");
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

async function updateCustomer(req, res) {
  const concursante = collection(firestore, "Concursante");
  
    var variableCambiare = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      codigo: req.body.codigo,
      carrera: req.body.carrera,
      nivel: req.body.nivel,
      correo: req.body.correo,
      cargo: req.body.cargo
    };
    const q = query(concursante, where("codigo", "==", req.body.codigo));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const concursanteId = doc(firestore, "Concursante", id);
    updateDoc(concursanteId,variableCambiare)
      .then(() => {
        res.send("Notificación: Usuario actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
}

async function readCustomer(req, res) {
  const admin = collection(firestore, "Admins");
  const q1 = query(admin, where("correo", "==", req.body.correo));
  const querySnapshot1 = await getDocs(q1);
  var dataAdmin = [];
  var i = 0;
  querySnapshot1.forEach((doc1) => {
    
    dataAdmin[i] = doc1.data();
    i++;
  });

  if (dataAdmin.length==0){
    res.send("Error: No eres admin!");
  } else{
    const q = query(collection(db.database, "Concursante"));
    const querySnapshot = await getDocs(q);
    var data = [];
    var i=0;
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data[i] = doc.data();
      i++;
    });
    res.send(data);
  }
  
}

async function readCustomers(req, res) {
  const concursante = collection(firestore, "Concursante");
  const q = query(
    concursante,
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

async function deleteCustomer(req, res) {
  const concursante = collection(firestore, "Concursante");
  const q = query(concursante, where("codigo", "==", req.body.codigo));
  const querySnapshot = await getDocs(q);
  var id = " ";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    id = doc.id;
  });
  const concursanteId = doc(firestore, "Concursante", id);
  await deleteDoc(concursanteId)
    .then(() => {
      res.send("Notificación: Usuario eliminado!");
    })
    .catch((error) => {
      res.send(error);
    });
}

export default {
  createCustomer,
  updateCustomer,
  readCustomer,
  readCustomers,
  deleteCustomer,
};
