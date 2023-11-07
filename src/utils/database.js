import { firestoreDB } from "../firestore";
import {
  collection,
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { PAID, PAYMENTS } from "../constants";

const paymentsCollectionRef = collection(firestoreDB, PAYMENTS);
const deletedCollectionRef = collection(firestoreDB, "DELETED");
const utangCollectionRef = collection(firestoreDB, "UTANGS");

export const createUtang = async (utangObj) => {
  setDoc(doc(firestoreDB, "UTANGS", `${utangObj.uid}`), {
    ...utangObj,
  });
};

export const getUtangs = async (setUtangs) => {
  onSnapshot(utangCollectionRef, (docsSnap) => {
    let records = [];
    docsSnap.forEach((doc) => {
      records.push(doc.data());
    });

    setUtangs(records.reverse());
  });
};

export const createDeleted = async (utang) => {
  setDoc(doc(firestoreDB, "DELETED", `${utang.uid}`), {
    ...utang,
  });
};

export const getDeleted = async (setDeleted) => {
  onSnapshot(deletedCollectionRef, (docsSnap) => {
    let deleted = [];

    docsSnap.forEach((doc) => {
      deleted.push(doc.data());
    });

    setDeleted(deleted.reverse());
  });
};

export const createPayment = async (payment) => {
  setDoc(doc(firestoreDB, PAYMENTS, `${payment.id}`), {
    ...payment,
  });
};

export const getPayments = async (setPayments) => {
  onSnapshot(paymentsCollectionRef, (docsSnap) => {
    let payments = [];

    docsSnap.forEach((doc) => {
      payments.push(doc.data());
    });

    setPayments(payments.reverse());
  });
};

export const paid = async (utangs) => {
  utangs.map(async (utang) => {
    const utangNew = { ...utang, status: PAID };
    await updateDoc(doc(firestoreDB, "UTANGS", `${utangNew.uid}`), {
      ...utangNew,
    });
  });
};

export const updateItem = async (updatedUtang, isDelete) => {
  updateDoc(doc(firestoreDB, "UTANGS", updatedUtang.uid), {
    ...updatedUtang,
  });
};

export const deleteItem = async (utang) => {
  deleteDoc(doc(firestoreDB, "UTANGS", utang.uid));
};
