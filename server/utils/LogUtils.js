import { db } from "./FirebaseUtils.js";
import { getUserByQR, getAllQRs } from "./QRUtils.js";
import { getGuestUser, getUser } from "./AuthUtils.js";

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
      };
      logs.push(log);
    });

    logs.sort((a, b) => b.time - a.time);
    logs.splice(10);

    for (const log of logs) {
      let user = await getUser(log.uuid);
      if (user === null) {
        user = await getGuestUser(log.uuid);
      }
      if (user === null) {
        continue;
      }
      log.user = { name: user.name, email: user.email, purpose: user.purpose, type: user.userType };
    }
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
    if (qr.expiry < new Date().getTime() && qr.inCampus) {
      const user = await getGuestUser(qr.uuid);

      const alert = {
        uuid: qr.uuid,
        expiry: qr.expiry,
        user: {
          name: user?.name,
          email: user?.email,
          entry: user?.entryTime,
        },
        message: "QR Code Expired, but user not checked out",
      };
      alerts.push(alert);
    }
  }
  return alerts;
};
