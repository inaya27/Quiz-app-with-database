import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, onValue, ref, set, push } from "firebase/database";
import { app } from "./firebaseconfig";

const auth = getAuth(app);
const db = getDatabase(app);

export function SignUpMethod(body) {
  return new Promise((resolve, reject) => {
    if (!body.email || !body.password || !body.username) {
      reject("Must fill all the fields!");
    } else {
      createUserWithEmailAndPassword(auth, body.email, body.password)
        .then((res) => {
          let id = res.user.uid;
          body.id = id;
          const reference = ref(db, `users/${id}`);
          set(reference, body)
            .then((user) => {
              resolve("user successfully signed up");
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => err);
    }
  });
}

export function LoginMethod(body) {
  return new Promise((resolve, reject) => {
    if (!body.email || !body.password) {
      reject("Must fill all fields");
    } else {
      signInWithEmailAndPassword(auth, body.email, body.password, body.roll)
        .then((res) => {
          let id = res.user.uid;
          const reference = ref(db, `users/${id}`);
          onValue(reference, (data) => {
            if (data.exists) {
              resolve(data.val());
            } else {
              reject("no data found!");
            }
          });
        })
        .catch((err) => console.log(err));
    }
  });
}

export function fbAdd(node, body) {
  return new Promise((resolve, reject) => {
    const bodyId = push(ref(db, `${node}/`)).key;
    body.id = bodyId;
    const reference = ref(db, `${node}/${body.id}`);
    set(reference, body)
      .then((res) => resolve("data send successfully"))
      .catch((err) => reject(err));
  });
}

export function fbGet(node, id) {
  return new Promise((resolve, reject) => {
    const reference = ref(db, `${node}/${id ? id : ""}`);
    onValue(reference, (data) => {
      if (data.exists()) {
        resolve(data.val());
      } else {
        reject("no data found");
      }
    });
  });
}
