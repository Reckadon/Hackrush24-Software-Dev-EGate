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

export const createQR = async (uuid, expiry) => {
  const qr = {
    uuid,
    qr: generateRandomString(64),
    expiry: new Date(expiry).getTime(),
  };
  await db.collection("qrs").doc(qr.qr).set(qr);
  return qr.qr;
};

export const isQRValid = async (uuid, qr) => {
  const qrDoc = await db.collection("qrs").doc(qr).get();
  if (!qrDoc.exists) {
    return false;
  }
  const qrData = qrDoc.data();
  if (qrData.uuid !== uuid) {
    return false;
  }
  if (qrData.expiry < new Date().getTime()) {
    await deleteQR(qr);
    return false;
  }
  return true;
};

export const deleteQR = async qr => {
  return await db.collection("qrs").doc(qr).delete();
};
