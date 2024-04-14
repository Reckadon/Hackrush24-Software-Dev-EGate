import { db } from "./FirebaseUtils.js";

const generateRandomString = length => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const createQR = async (uuid, expiry, userType) => {
  const qr = {
    uuid,
    qr: generateRandomString(64),
    expiry: new Date(expiry).getTime(),
    inCampus: false,
    userType,
  };
  await db.collection("qrs").doc(qr.qr).set(qr);
  return qr;
};

export const isQRValid = async qr => {
  const qrDoc = await db.collection("qrs").doc(qr).get();
  if (!qrDoc.exists) {
    return false;
  }
  const qrData = qrDoc.data();

  if (qrData.expiry < new Date().getTime()) {
    await deleteQR(qr);
    return false;
  }
  return true;
};

export const deleteQR = async qr => {
  return await db.collection("qrs").doc(qr).delete();
};

export const getQR = async uuid => {
  const qrDoc = await db.collection("qrs").where("uuid", "==", uuid).get();
  if (qrDoc.empty) {
    return null;
  }
  return qrDoc.docs[0].data();
};

export const getUserByQR = async qr => {
  const qrDoc = await db.collection("qrs").doc(qr).get();
  if (!qrDoc.exists) {
    return null;
  }

  if (qrDoc.data().userType === "resident") {
    return (await db.collection("users").doc(qrDoc.data().uuid).get()).data();
  } else {
    return (await db.collection("guestUsers").doc(qrDoc.data().uuid).get()).data();
  }
};
