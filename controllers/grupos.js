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
  const concursante = collection(firestore, "Concursante");
  const q = query(concursante, where("codigo", "==", req.body.lider));
  const querySnapshot = await getDocs(q);
  var data = "";
  querySnapshot.forEach((doc) => {
    data = doc.data();
  });

  const lider = collection(firestore, "Grupos");
  const q1 = query(lider, where("lider", "==", req.body.lider));
  const querySnapshot1 = await getDocs(q1);
  var dataLider = [];
  var i = 0;
  querySnapshot1.forEach((doc1) => {
    dataLider[i] = doc1.data();
    i++;
  });
  console.log(dataLider);
  if (data.cargo != "lider" || dataLider.length != 0) {
    res.send("No es lider o ya esta registrado en un equipo");
  } else {
    if (req.body.nombre == "" || req.body.lider == "") {
      res.send("Error: Campos vacios!");
    } else {
      var datosGrupo = {
        nombre: req.body.nombre,
        lider: req.body.lider,
        integrantes: [],
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
}

async function registrarIntegrantes(req, res) {
  const concursante = collection(firestore, "Concursante");
  const q = query(concursante, where("codigo", "==", req.body.lider));
  const querySnapshot = await getDocs(q);
  var data = "";
  querySnapshot.forEach((doc) => {
    data = doc.data();
  });
  if (data.cargo != "lider") {
    res.send("No es lider");
  } else {
    const integrante = collection(firestore, "Concursante");
    const q = query(integrante, where("codigo", "==", req.body.codigo));
    const querySnapshot = await getDocs(q);
    var dataIntegrante = [];
    var i = 0;
    querySnapshot.forEach((doc) => {
      dataIntegrante[i] = doc.data();
      i++;
    });

    const grupo = collection(firestore, "Grupos");
    const q1 = query(grupo, where("nombre", "==", req.body.nombreGrupo));
    const querySnapshot1 = await getDocs(q1);
    var id = " ";
    var dataGrupo = [];
    querySnapshot1.forEach((doc1) => {
      dataGrupo[i] = doc1.data();
      id = doc1.id;
      i++;
    });

    const q2 = query(grupo, where("integrantes", "==", req.body.codigo));
    const querySnapshot2 = await getDocs(q2);
    var dataInte = [];
    var j = 0;
    querySnapshot2.forEach((doc1) => {
      dataInte[j] = doc1.data();
      j++;
    });
    
    if (dataInte.length != 0) {
      res.send("integrante registrado en otro grupo");
    } else {
      dataGrupo = dataGrupo[1].integrantes;

      dataGrupo = dataGrupo.concat(dataIntegrante[0].codigo);

      const gruposId = doc(firestore, "Grupos", id);
      updateDoc(gruposId, {
        integrantes: dataGrupo,
      })
        .then(() => {
          res.send("Notificación: Grupo actualizado!");
        })
        .catch((error) => {
          res.send(error);
        });
    }
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
  registrarIntegrantes,
};
