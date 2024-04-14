import { Button, Container, Nav, Navbar } from "react-bootstrap";
import img from "../assets/logo.svg";
import Html5QrcodePlugin from "./ScannerPlugin";
import "./secui.scss";
import { API } from "../../APIendpoints";
import { useState } from "react";
import VerifiedUserBlock from "./VerifiedUserBlock";
import CloseIcon from "@mui/icons-material/Close";

const SecurityUI = () => {
	const [isScanning, setIsScanning] = useState(true);
	const [scannedUserData, setScannedUserData] = useState(null);
	const [loading, setLoading] = useState(false);

	const sendQR = async e => {
		setIsScanning(false);
		setLoading(true);
		const res = await API.VerifyQR(e);
		setLoading(false);
		if (res.data.isValid) {
			setScannedUserData(res.data.user);
		}
	};

	return (
		<div className="security-ui">
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
							<Nav.Link href="/security">Scan QR</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/security/register">Register</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{isScanning ? (
				<Html5QrcodePlugin
					qrCodeSuccessCallback={sendQR}
					qrbox={{ height: "100%", width: "100%" }}
				/>
			) : loading ? (
				<h2>Loading</h2>
			) : scannedUserData.isValid ? (
				<VerifiedUserBlock userData={scannedUserData} />
			) : (
				<>
					<CloseIcon color="red" />
					<h2>Not Valid QR</h2>
				</>
			)}
			{!isScanning && (
				<Button
					onClick={() => {
						setIsScanning(true);
						setScannedUserData(null);
						setLoading(false);
					}}
				>
					Scan QR
				</Button>
			)}
		</div>
	);
};

export default SecurityUI;
