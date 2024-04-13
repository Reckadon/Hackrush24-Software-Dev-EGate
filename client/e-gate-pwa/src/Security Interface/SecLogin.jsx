import { Button, Form } from "react-bootstrap";
import "./seclogin.scss";
import { useState } from "react";

const SecLogin = () => {
	const [id, setID] = useState("");
	const [pass, setPass] = useState("");

	const check = () => {
		//handle security login
	};
	return (
		<div className="security-login">
			<h3>Login to access Security Personnel Interface</h3>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Enter ID</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter ID"
						value={id}
						onChange={e => setID(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Enter Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={pass}
						onChange={e => setPass(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" onClick={check}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default SecLogin;
