import { db } from "./FirebaseUtils.js";

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
    snapshot.forEach(doc => {
      logs.push(doc.data());
    });
    return logs;
  } catch (error) {
    console.log(error);
    return error;
  }
};
