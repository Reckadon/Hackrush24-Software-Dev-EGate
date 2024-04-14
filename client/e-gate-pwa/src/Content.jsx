/* eslint-disable react/prop-types */
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAuth, signInWithRedirect } from "firebase/auth";
import provider from "../auth_provider";

const Content = ({ userData }) => {
	const auth = getAuth();

	const [extendResident, setExtendResident] = useState(false);
	const [extendVisitor, setExtendVisitor] = useState(false);

	const [profilePic, setProfilePic] = useState(null);
	const [residentType, setResidentType] = useState("student");
	const [gradYear, setGradYear] = useState("2024");
	const [purpose, setPurpose] = useState();
	const [entryTime, setEntryTime] = useState();
	const [entryDate, setEntryDate] = useState();
	const [exitTime, setExitTime] = useState();
	const [exitDate, setExitDate] = useState();

	const registerResident = () => {
		if (!extendResident) {
			setEntryTime(null);
			setExitTime(null);
			setProfilePic(null);
			setPurpose("");
			setResidentType("student");
			setGradYear("2024");
			setExtendResident(false);
			setExtendVisitor(true);
			setExtendResident(true);
			setExtendVisitor(false);
		} else {
			const data = { profile: profilePic, userType: residentType, graduation: gradYear };
			sessionStorage.setItem("redirect-trigger", "register");
			sessionStorage.setItem("reg-data", JSON.stringify(data));
			signInWithRedirect(auth, provider);
		}
	};
	const registerVisitor = () => {
		if (!extendVisitor) {
			setProfilePic(null);
			setResidentType("student");
			setGradYear("2024");
			setExtendResident(false);
			setExtendVisitor(true);
		} else {
			const data = {
				profile: profilePic,
				userType: "visitor",
				purpose: purpose,
				entryTime: new Date(entryDate + " " + entryTime),
				exitTime: new Date(exitDate + " " + exitTime),
			};
			sessionStorage.setItem("redirect-trigger", "register");
			sessionStorage.setItem("reg-data", JSON.stringify(data));
			signInWithRedirect(auth, provider);
		}
	};

	const login = () => {
		sessionStorage.setItem("redirect-trigger", "login");
		signInWithRedirect(auth, provider);
	};

	return (
		<div className="bg-container">
			<div className="choice-card qr">
				<h2>
					Your <em>QR</em>
				</h2>
				<div>
					<div className="icon-holder">
						{!userData ? (
							<NoAccountsIcon fontSize="large" />
						) : (
							<img
								width="340px"
								src={"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + userData.qr}
								alt="QR code"
							/>
						)}
					</div>
				</div>
				{!userData && <Button onClick={login}>Login</Button>}
			</div>
			<div className={extendResident ? "choice-card extended" : "choice-card"}>
				<h2>
					Register as <br />
					<em>Resident</em>
				</h2>
				<div>
					<div className="icon-holder">
						<MapsHomeWorkIcon fontSize="large" />
					</div>
					<div className="reg-form" style={{ display: !extendResident ? "none" : "flex" }}>
						<label
							style={{
								marginBlockEnd: "10px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							Upload your photo: <br />
							<input
								type="file"
								onChange={e => {
									const FR = new FileReader();
									FR.readAsDataURL(e.target.files[0]);
									FR.onload = () => {
										const img = FR.result;
										setProfilePic(img);
									};
								}}
							/>
						</label>

						<Form.Label htmlFor="inputPassword5">
							Resident Type
							<Form.Select
								defaultValue="student"
								aria-label="Resident Type"
								onChange={e => setResidentType(e.target.value)}
							>
								<option value="student">Student</option>
								<option value="faculty">Faculty</option>
							</Form.Select>
						</Form.Label>
						<Form.Label htmlFor="inputPassword5">
							Graduation Year (If Student)
							<Form.Select
								defaultValue="2024"
								aria-label="Resident Type"
								onChange={e => setGradYear(e.target.value)}
							>
								<option value="2024">2024</option>
								<option value="2024">2025</option>
								<option value="2026">2026</option>
								<option value="2027">2027</option>
								<option value="2028">2028</option>
								<option value="2029">2029</option>
							</Form.Select>
						</Form.Label>
					</div>
				</div>
				<Button onClick={registerResident}>Register</Button>
			</div>
			<div className={extendVisitor ? "choice-card extended" : "choice-card"}>
				<h2>
					Register as <br />
					<em>Visitor</em>
				</h2>
				<div style={{ display: "flex", width: "100%", flexGrow: "1" }}>
					<div className="icon-holder">
						<TransferWithinAStationIcon fontSize="large" />
					</div>
					<div className="reg-form" style={{ display: !extendVisitor ? "none" : "flex" }}>
						<label
							style={{
								marginBlockEnd: "10px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							Upload your photo: <br />
							<input
								type="file"
								onChange={e => {
									const FR = new FileReader();
									FR.readAsDataURL(e.target.files[0]);
									FR.onload = () => {
										const img = FR.result;
										setProfilePic(img);
									};
								}}
							/>
						</label>
						<Form.Label>
							Purpose of Visit:
							<Form.Control
								type="text"
								placeholder="Enter your purpose of visiting"
								value={purpose}
								onChange={e => setPurpose(e.target.value)}
							/>
						</Form.Label>
						<Form.Label>
							Entry Time:
							<Form.Control
								type="time"
								aria-label="Entry Time"
								onChange={e => setEntryTime(e.target.value)}
							/>
						</Form.Label>
						<Form.Label>
							Entry Date:
							<Form.Control
								type="date"
								aria-label="Entry date"
								onChange={e => setEntryDate(e.target.value)}
							/>
						</Form.Label>
						<Form.Label>
							Exit Time:
							<Form.Control
								type="time"
								aria-label="Entry Time"
								onChange={e => setExitTime(e.target.value)}
							/>
						</Form.Label>
						<Form.Label>
							Exit Date:
							<Form.Control
								type="date"
								aria-label="Exit Date"
								onChange={e => setExitDate(e.target.value)}
							/>
						</Form.Label>
					</div>
				</div>
				<Button onClick={registerVisitor}>Register</Button>
			</div>
		</div>
	);
};

export default Content;
