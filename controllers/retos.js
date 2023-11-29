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
    req.body.nombreReto == "" || req.body.descripcion ==""
  ) {
    res.send("Error: Campos vacios!");
  } else {
    var datosReto = {
      nombreReto: req.body.nombreReto,
      gruposAso: req.body.gruposAso,
      descripcion: req.body.descripcion
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

async function registrarGrupo(req, res) {

  const grupo = collection(firestore, "Grupos");
  const q = query(grupo, where("nombre", "==", req.body.nombre));
  const querySnapshot = await getDocs(q);
  var dataGrupo = [];
  var i = 0;
  querySnapshot.forEach((doc) => {
    dataGrupo[i] = doc.data();
    i++;
  });

  const reto = collection(firestore, "Retos");
  const q1 = query(reto, where("nombreReto", "==", req.body.nombreReto));
  const querySnapshot1 = await getDocs(q1);
  var id = " ";
  var dataReto = [];
  querySnapshot1.forEach((doc1) => {
    dataReto[i]=doc1.data();
    id = doc1.id;
    i++;
  });

  dataReto=dataReto[1].gruposAso
 
  dataReto=dataReto.concat(dataGrupo[0])
 
  const retosId = doc(firestore, "Retos", id);
    updateDoc(retosId, {
      "gruposAso": dataReto,
    })
      .then(() => {
        res.send("Notificación: Reto actualizado!");
      })
      .catch((error) => {
        res.send(error);
      });

}

async function readReto(req, res) {
  const reto = collection(firestore, "Retos");
  const q = query(
    reto,
    where("nombreReto", "==", req.body.nombreReto)
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



function deleteReto(req, res) {
  diasAsegundos(req.body.dias)
  setTimeout(async function(){
    const reto = collection(firestore, "Retos");
    const q = query(reto, where("nombreReto", "==", req.body.nombreReto));
    const querySnapshot = await getDocs(q);
    var id = " ";
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      id = doc.id;
    });
    const retoId = doc(firestore, "Retos", id);
    await deleteDoc(retoId)
      .then(() => {
        res.send("Notificación: reto eliminado!");
      })
      .catch((error) => {
        res.send(error);
      });
  }, 10000);
  
}

function diasAsegundos(dias) {
  var segundos=0;
  segundos=(dias*24*60*60)*1000
  return segundos;
}

export default {
  createReto,
  registrarGrupo,
  readReto,
  deleteReto
};
