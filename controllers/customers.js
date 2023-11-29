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
  var variableCambiare = "";

  if (req.body.nombreN != undefined) {
    variableCambiare = req.body.nombreN;
    const q = query(concursante, where("nombre", "==", req.body.nombreA));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const concursanteId = doc(firestore, "Concursante", id);
    updateDoc(concursanteId, {
      nombre: variableCambiare,
    })
      .then(() => {
        res.send("Notificación: Usuario actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (req.body.apellidoN != undefined) {
    variableCambiare = req.body.apellidoN;
    const q = query(concursante, where("apellido", "==", req.body.apellidoA));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const concursanteId = doc(firestore, "Concursante", id);
    updateDoc(concursanteId, {
      apellido: variableCambiare,
    })
      .then(() => {
        res.send("Notificación: Usuario actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (req.body.codigoN != undefined) {
    variableCambiare = req.body.codigoN;
    const q = query(concursante, where("codigo", "==", req.body.codigoA));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const concursanteId = doc(firestore, "Concursante", id);
    await updateDoc(concursanteId, {
      codigo: variableCambiare,
    })
      .then(() => {
        res.send("Notificación: Usuario actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (req.body.carreraN != undefined) {
    variableCambiare = req.body.carreraN;
    const q = query(concursante, where("carrera", "==", req.body.carreraA));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const concursanteId = doc(firestore, "Concursante", id);
    await updateDoc(concursanteId, {
      carrera: variableCambiare,
    })
      .then(() => {
        res.send("Notificación: Usuario actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (req.body.nivelN != undefined) {
    variableCambiare = req.body.nivelN;
    const q = query(concursante, where("nivel", "==", req.body.nivelA));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const concursanteId = doc(firestore, "Concursante", id);
    await updateDoc(concursanteId, {
      nivel: variableCambiare,
    })
      .then(() => {
        res.send("Notificación: Usuario actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (req.body.correoN != undefined) {
    variableCambiare = req.body.correoN;
    const q = query(concursante, where("correo", "==", req.body.correoA));
    const querySnapshot = await getDocs(q);
    var id = " ";

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });

    const concursanteId = doc(firestore, "Concursante", id);
    await updateDoc(concursanteId, {
      correo: variableCambiare,
    })
      .then(() => {
        res.send("Notificación: Usuario actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

async function readCustomer(req, res) {
  const concursante = collection(firestore, "Concursante");
  const q = query(concursante, where("codigo", "==", req.body.codigo));
  const querySnapshot = await getDocs(q);
  var data = "";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    data = doc.data();
  });
  res.send(data);
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
