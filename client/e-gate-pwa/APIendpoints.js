import axios from "axios";

const SERVER_URL = "http://10.7.10.94:3000/";

export const API = {
	CreateResidentUser: data => axios.post(SERVER_URL + "auth/createResidentUser", { data }),
	CreateGuestUser: data => axios.post(SERVER_URL + "auth/createGuestUser", { data }),
	VerifySecurity: (id, pass) =>
		axios.post(SERVER_URL + "auth/securityLogin", { login: id, password: pass }),
	GetUser: uuid => axios.get(SERVER_URL + "auth/users/" + uuid),
	GetVisitor: uuid => axios.get(SERVER_URL + "auth/guest/" + uuid),
	GetQR: uuid => axios.get(SERVER_URL + uuid),
	VerifyQR: qr => axios.get(SERVER_URL + "qrs/verify/" + qr),
};
