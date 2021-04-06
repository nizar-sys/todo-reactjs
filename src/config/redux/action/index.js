import firebase, { database } from "../../firebase";

export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "nizar" });
  }, 2000);
};

export const registerUser = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        console.log(res);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        reject(false);
      });
  });
};
export const loginUser = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        console.log(res);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerif: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};

export const createData = (data) => (dispatch) => {
  firebase
    .database()
    .ref("notes/" + data.userId)
    .push({
      title: data.title,
      content: data.content,
      date: data.date,
    });
};

export const getData = (userId) => (dispatch) => {
  const urlNotes = firebase.database().ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    urlNotes.on("value", function (snapshot) {
      const data = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });
        dispatch({ type: "GET_NOTES", value: data });
        resolve(snapshot.val());
      }
    });
  });
};

export const UpdateNote = (data) => (dispatch) => {
  const urlNotes = firebase
    .database()
    .ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.set(
      {
        title: data.title,
        content: data.content,
        date: data.date,
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const DeleteNote = (data) => (dispatch) => {
  const urlNotes = firebase
    .database()
    .ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.remove();
  });
};
