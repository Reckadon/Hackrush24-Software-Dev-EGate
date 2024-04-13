import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCi99W4YWd0oTl7KMr9t3oj1jv7Wx2mkUM",
	authDomain: "e-gate-hackrush.firebaseapp.com",
	projectId: "e-gate-hackrush",
	storageBucket: "e-gate-hackrush.appspot.com",
	messagingSenderId: "523193854784",
	appId: "1:523193854784:web:9ee7fccae643b7940428a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
