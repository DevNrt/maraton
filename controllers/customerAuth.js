import database from "../databases/firebases.js";
import login from "./customerAuth.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail
} from "firebase/auth";

async function createUser(req, res) {
  const app = database.app;
  const auth = getAuth(app);

  if (req.body.user == "" || req.body.pass == "") {
    res.send("Error: Campos vacios!");
  } else {
    await createUserWithEmailAndPassword(auth, req.body.user, req.body.pass)
      .then(() => {
        res.send("Notificación: Usuario creado!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          res.send("Error: That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          res.send("Error: That email address is invalid!");
        }

        res.send("Error:"+error);
      });
  }
}

async function LoginUser(req, res) {
  const app = database.app;
  const auth = getAuth(app);

  if (req.body.user == "" || req.body.pass == "") {
    res.send("Error: Campos vacios!");
  } else {
    await signInWithEmailAndPassword(auth, req.body.user, req.body.pass)
      .then((userCredential) => {
        const user = userCredential.user;
        res.send(user.email);
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          res.send("Error: Usuario desactivado por muchos intentos!");
        } else if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-login-credentials" 
        ) {
          res.send("Error: Email o contraseña incorrectos!");
        } else{
          res.send(error);
        }
      });
  }
}

function deleteU(req, res) {
  const app = database.app;
  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, req.body.user, req.body.pass)
    .then((userCredential) => {
      const user = userCredential.user;
      deleteUser(user)
        .then(() => {
          res.send("Successfully deleted user");
        })
        .catch((error) => {
          res.send("Error deleting user:" + error);
        });
    })
    .catch((error) => {
      res.send("Error: " + error);
    });
}

function updateE(req, res) {
  const app = database.app;
  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, req.body.user, req.body.pass)
    .then((userCredential) => {
      const user = userCredential.user;
      verifyBeforeUpdateEmail(user, req.body.userNew)
        .then(() => {
          res.send("Cambiado");
        })
        .catch((error) => {
          res.send("Error: " + error);
        });
    })
    .catch((error) => {
      res.send("Error: " + error);
    });
}

function updateP(req, res) {
  const app = database.app;
  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, req.body.user, req.body.pass)
    .then((userCredential) => {
      const user = userCredential.user;
      updatePassword(user, req.body.passNew)
        .then(() => {
          res.send("Cambiado");
        })
        .catch((error) => {
          res.send("Error: " + error);
        });
    })
    .catch((error) => {
      res.send("Error: " + error);
    });
}

export default { createUser, LoginUser, deleteU, updateE,updateP };
