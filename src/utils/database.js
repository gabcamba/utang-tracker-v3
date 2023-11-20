import { firestoreDB } from "../firestore";
import {
  collection,
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

export const getUser = async (id) => {
  const docSnap = getDoc(doc(firestoreDB, "USERS", id));
  if ((await docSnap).exists()) {
    return (await docSnap).data();
  } else {
    return null;
  }
};

export const getSession = async (sessionCode) => {
  const docSnap = getDoc(doc(firestoreDB, "SESSIONS", sessionCode));

  if ((await docSnap).exists()) {
    return true;
  } else {
    return false;
  }
};

export const createUser = async (userObj) => {
  setDoc(doc(firestoreDB, `SESSIONS`, `${userObj.sessionId}`), {
    dateCreated: Date.now(),
  });

  setDoc(doc(firestoreDB, `USERS`, `${userObj.userId}`), {
    ...userObj,
  });
};

export const createUtang = async (utangObj) => {
  setDoc(
    doc(
      firestoreDB,
      `SESSIONS/${sessionStorage.getItem("sessionId")}/UTANGS`,
      `${utangObj.uid}`
    ),
    {
      ...utangObj,
    }
  );
};

export const getUtangs = async (setUtangs, sessionId) => {
  onSnapshot(
    collection(
      firestoreDB,
      `SESSIONS/${sessionStorage.getItem("sessionId")}/UTANGS`
    ),
    (docsSnap) => {
      let records = [];
      docsSnap.forEach((doc) => {
        records.push(doc.data());
      });

      setUtangs(records.reverse());
    }
  );
};

export const createDeleted = async (utang) => {
  setDoc(
    doc(
      firestoreDB,
      `SESSIONS/${sessionStorage.getItem("sessionId")}/DELETED`,
      `${utang.uid}`
    ),
    {
      ...utang,
    }
  );
};

export const getDeleted = async (setDeleted) => {
  onSnapshot(
    collection(
      firestoreDB,
      `SESSIONS/${sessionStorage.getItem("sessionId")}/DELETED`
    ),
    (docsSnap) => {
      let deleted = [];

      docsSnap.forEach((doc) => {
        deleted.push(doc.data());
      });

      setDeleted(deleted.reverse());
    }
  );
};

export const createPayment = async (payment) => {
  setDoc(
    doc(
      firestoreDB,
      `SESSIONS/${sessionStorage.getItem("sessionId")}/PAYMENTS`,
      `${payment.id}`
    ),
    {
      ...payment,
    }
  );
};

export const getPayments = async (setPayments) => {
  onSnapshot(
    collection(
      firestoreDB,
      `SESSIONS/${sessionStorage.getItem("sessionId")}/PAYMENTS`
    ),
    (docsSnap) => {
      let payments = [];

      docsSnap.forEach((doc) => {
        payments.push(doc.data());
      });

      setPayments(payments.reverse());
    }
  );
};

export const updateItem = async (updatedUtang, isDelete) => {
  updateDoc(
    doc(
      firestoreDB,
      `SESSIONS/${sessionStorage.getItem("sessionId")}/UTANGS`,
      updatedUtang.uid
    ),
    {
      ...updatedUtang,
    }
  );
};

export const deleteItem = async (utang) => {
  deleteDoc(
    doc(
      firestoreDB,
      `SESSIONS/${sessionStorage.getItem("sessionId")}/UTANGS`,
      utang.uid
    )
  );
};
