import { db } from "./FirebaseUtils.js";
import { getUserByQR, getAllQRs } from "./QRUtils.js";
import { getUser } from "./AuthUtils.js";

export const addEntry = async (uuid, inCampus) => {
  try {
    const log = {
      uuid,
      inCampus,
      time: new Date().getTime(),
    };
    await db.collection("entries").add(log);
    return log;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllLogs = async () => {
  try {
    const logs = [];
    const snapshot = await db.collection("entries").get();
    snapshot.forEach(async doc => {
      const data = doc.data();
      const log = {
        uuid: data.uuid,
        inCampus: data.inCampus,
        time: data.time,
        user: await getUser(data.uuid),
      };
      console.log(log);
      logs.push(log);
    });
    return logs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAlerts = async () => {
  const qrs = await getAllQRs();
  const alerts = [];
  for (const qr of qrs) {
    if (qr.expiry < new Date().getTime() && !qr.inCampus) {
      const alert = {
        uuid: qr.uuid,
        expiry: qr.expiry,
        user: await getUserByQR(qr.qr),
        message: "QR Code Expired, but user not checked out",
      };
      alerts.push(alert);
    }
  }
  return alerts;
};
