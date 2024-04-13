import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Content from "./Content";
import "./App.css";
import img from "./assets/logo.svg";
import { GoogleAuthProvider, getAuth, getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
	const auth = getAuth();
	const [user, setUser] = useState(null);

	auth.onAuthStateChanged(user => {
		if (user) {
			if (user.email.endsWith("iitgn.ac.in")) setUser(user);
		}
	});

	useEffect(() => {
		getRedirectResult(auth)
			.then(result => {
				if (!result) return;
				// This gives you a Google Access Token. You can use it to access Google APIs.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;

				// The signed-in user info.
				const user = result.user;
				if (user.email.endsWith("iitgn.ac.in")) {
					// send regData to database
					const regData = sessionStorage.getItem("reg-data");
					setUser(user);
				} else alert("Need valid IIT Gandhinagar email address to register as resident!");
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch(error => {
				// Handle Errors here.
				console.log(error);
			});
	}, []);

	return (
		<>
			<Navbar expand="lg">
				<Container>
					<Navbar.Brand href="/">
						<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
							<div className="crop">
								<img height="100px" width="100px" src={img} alt="IITGn Logo" />{" "}
							</div>
							E Gate IIT Gandhinagar
						</div>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/apply-guest">Apply for Guest QR</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							{user ? (
								<>
									Signed in as: <em>{user.displayName}</em>
								</>
							) : (
								<>Not Signed In</>
							)}
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Content />
		</>
	);
}

export default App;
