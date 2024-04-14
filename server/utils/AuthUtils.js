import { createQR } from "./QRUtils.js";
import { db } from "../utils/FirebaseUtils.js";
import { v4 } from "uuid";

export const createResidentUser = async (uuid, email, profile, name, userType, graduation) => {
  try {
    const user = {
      uuid,
      email,
      profile,
      name,
      userType,
      graduation,
    };
    user.qr = (await createQR(uuid, graduation, "resident")).qr;
    await db.collection("users").doc(uuid).set(user);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUser = async uuid => {
  const userDoc = await db.collection("users").doc(uuid).get();
  if (!userDoc.exists) {
    return null;
  }
  return userDoc.data();
};

export const createGuestUser = async (
  uuid,
  email,
  profile,
  name,
  userType,
  entryTime,
  exitTime,
  purpose,
  residentEmailID
) => {
  try {
    const user = {
      uuid,
      email,
      profile,
      name,
      userType,
      entryTime,
      exitTime,
      purpose,
      approved: false,
    };

    if (userType === "Resident's Guest") {
      user.residentEmailID = residentEmailID;
    }
    user.qr = (await createQR(uuid, exitTime, "guest")).qr;
    await db.collection("guestUsers").doc(uuid).set(user);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const approveGuestUser = async uuid => {
  try {
    const user = await db.collection("guestUsers").doc(uuid).get();
    if (!user.exists) {
      return null;
    }
    user.approved = true;
    await db.collection("guestUsers").doc(uuid).delete();
    await db.collection("guestUsers").doc(uuid).set(user.data());
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getGuestUser = async uuid => {
  const userDoc = await db.collection("guestUsers").doc(uuid).get();
  if (!userDoc.exists) {
    return null;
  }
  return userDoc.data();
};

export const getGuestUserByQR = async qr => {
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
