import { createQR } from "./QRUtils.js";

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
    return error;
  }
};
