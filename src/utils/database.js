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

export const createUser = async (userObj, createSession) => {
  if (createSession) {
    setDoc(doc(firestoreDB, `SESSIONS`, `${userObj.sessionId}`), {
      dateCreated: Date.now(),
    });
  }

  setDoc(doc(firestoreDB, `USERS`, `${userObj.userId}`), {
    ...userObj,
  });
};

export const createUtang = async (utangObj) => {
  setDoc(
    doc(
      firestoreDB,
      `SESSIONS/${localStorage.getItem("sessionId")}/UTANGS`,
      `${utangObj.uid}`
    ),
    {
      ...utangObj,
    }
  );
};

export const getUtangs = async (setUtangs) => {
  onSnapshot(
    collection(
      firestoreDB,
      `SESSIONS/${localStorage.getItem("sessionId")}/UTANGS`
    ),
    { includeMetadataChanges: true },
    (docsSnap) => {
      let records = [];
      docsSnap.forEach((doc) => {
        records.push(doc.data());
      });

      setUtangs(records.reverse());
      localStorage.setItem("utangs", JSON.stringify(records));

    }
  );
};

export const createDeleted = async (utang) => {
  setDoc(
    doc(
      firestoreDB,
      `SESSIONS/${localStorage.getItem("sessionId")}/DELETED`,
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
      `SESSIONS/${localStorage.getItem("sessionId")}/DELETED`
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
      `SESSIONS/${localStorage.getItem("sessionId")}/PAYMENTS`,
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
      `SESSIONS/${localStorage.getItem("sessionId")}/PAYMENTS`
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
      `SESSIONS/${localStorage.getItem("sessionId")}/UTANGS`,
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
      `SESSIONS/${localStorage.getItem("sessionId")}/UTANGS`,
      utang.uid
    )
  );
};

// this block will be used for data migration, sessioncode and collection will be replaced
// for payments, .id is used, where for utang, .uid
export const migrateUtangs = async () => {
  onSnapshot(collection(firestoreDB, `PAYMENTS`), (docsSnap) => {
    docsSnap.forEach((document) => {
      const utangObj = document.data();
      setDoc(doc(firestoreDB, `SESSIONS/GGJA0YVX/PAYMENTS`, `${utangObj.id}`), {
        ...utangObj,
      });
    });
  });
};
