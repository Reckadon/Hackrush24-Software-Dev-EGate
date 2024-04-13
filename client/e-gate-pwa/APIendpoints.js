import axios from "axios";

const SERVER_URL = "http://10.7.10.94:3000/";

export const API = {
	CreateResidentUser: data => axios.post(SERVER_URL + "auth/createResidentUser", { data }),
	GetQR: uuid => axios.get(SERVER_URL + uuid),
};
