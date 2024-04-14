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
    user.qr = await createQR(uuid, graduation);
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

export const createGuestUser = async (email, profile, name, userType, residentEmailID) => {
  try {
    const user = {
      uuid: v4(),
      email,
      profile,
      name,
      userType,
      approved: false,
    };

    if (userType === "Resident Guest") {
      user.residentEmailID = residentEmailID;
    }
    await db.collection("guestUsers").doc(uuid).set(user);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
