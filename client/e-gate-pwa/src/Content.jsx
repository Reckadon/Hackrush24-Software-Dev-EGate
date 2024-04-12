import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Content = () => {
	const [extendResident, setExtendResident] = useState(false);
	const [extendVisitor, setExtendVisitor] = useState(false);

	const registerResident = () => {
		setExtendResident(true);
		setExtendVisitor(false);
	};
	const registerVisitor = () => {
		setExtendResident(false);
		setExtendVisitor(true);
	};

	return (
		<div className="bg-container">
			<div className={extendResident ? "choice-card extended" : "choice-card"}>
				<h2>
					Register as <br />
					<em>Resident</em>
				</h2>
				<div style={{ display: "flex", width: "100%", flexGrow: "1" }}>
					<div className="icon-holder">
						<MapsHomeWorkIcon fontSize="large" />
					</div>
					<div className="reg-form" style={{ display: !extendResident ? "none" : "flex" }}>
						<label style={{ marginBlockEnd: "10px" }}>
							Upload your photo:
							<input type="file" />
						</label>
						<Form.Label htmlFor="inputPassword5">
							Resident Type
							<Form.Select defaultValue="student" aria-label="Resident Type">
								<option value="student">Student</option>
								<option value="faculty">Faculty</option>
							</Form.Select>
						</Form.Label>
						<Form.Label htmlFor="inputPassword5">
							Graduation Year (If Student)
							<Form.Select defaultValue="2024" aria-label="Resident Type">
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
				</div>
				<Button onClick={registerVisitor}>Register</Button>
			</div>
		</div>
	);
};

export default Content;
