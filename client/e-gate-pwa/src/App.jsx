import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Content from "./Content";
import "./App.css";
import img from "./assets/logo.svg";

function App() {
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
							<Nav.Link href="/qr">Get Your QR</Nav.Link>
							<Nav.Link href="/apply-guest">Apply for Guest QR</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Content />
		</>
	);
}

export default App;
