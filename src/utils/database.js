import { firestoreDB } from "../firestore";
import { db } from "../firebase-database";
import { onValue, ref, update, set } from "firebase/database";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { UNPAID, DELETED, PAID, PAYMENTS } from "../constants";

const paymentsCollectionRef = collection(firestoreDB, PAYMENTS);

export const getPayments = async (setPayments) => {
  onSnapshot(paymentsCollectionRef, (docsSnap) => {
    let payments = [];

    docsSnap.forEach((doc) => {
      payments.push(doc.data());
    });

    setPayments(payments.reverse());
  });
};

export const pay = async (payment) => {
  setDoc(doc(firestoreDB, PAYMENTS, `${payment.id}`), {
    ...payment,
  });
};

export const fetchUtangList = async (setUtangs, setDeleted) => {
  onValue(ref(db), (snapshot) => {
    let records = [];
    let deleted = [];
    snapshot.forEach((child) => {
      let data = child.val();
      if (data.status === UNPAID) {
        records.push(data);
      } else if (data.status === DELETED) {
        deleted.push(data);
      }
    });

    setUtangs(records.reverse());
    setDeleted(deleted.reverse());
  });
};

export const paid = async (utangs) => {
  utangs.map(async (utang) => {
    const utangNew = { ...utang, status: PAID };
    await update(ref(db, utang.uid), utangNew);
  });
};

export const updateItem = async(updatedUtang) => {
    await update(ref(db, updatedUtang.uid), updatedUtang);
}

export const createItem = async(utangObj) => {
    await set(ref(db, utangObj.uid), utangObj);
}