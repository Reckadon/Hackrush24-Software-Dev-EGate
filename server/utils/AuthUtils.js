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

export const createGuestUser = async (email, profile, name, userType, entryTime, exitTime, residentEmailID) => {
  try {
    const user = {
      uuid: v4(),
      email,
      profile,
      name,
      userType,
      entryTime,
      exitTime,
      approved: false,
    };

    if (userType === "Resident Guest") {
      user.residentEmailID = residentEmailID;
    }
    user.qr = await createQR(user.uuid, exitTime, "guest");
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
