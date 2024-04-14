/* eslint-disable react/prop-types */
import { Button, Form } from "react-bootstrap";
import "./seclogin.scss";
import { useState } from "react";
import { API } from "../../APIendpoints";
import { useNavigate } from "react-router-dom";

const SecLogin = ({ onChecked }) => {
	const [id, setID] = useState("");
	const [pass, setPass] = useState("");
	const navigate = useNavigate();

	const check = async e => {
		e.preventDefault();
		//handle security login
		const res = await API.VerifySecurity(id, pass);
		const isValid = res.data.success;
		if (isValid) {
			onChecked();
			navigate("/security");
			sessionStorage.setItem("is-security-personnel", JSON.stringify({ isValid: true }));
		} else alert("Wrong ID or Password!");
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
				<Button variant="primary" type="submit" onClick={e => check(e)}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default SecLogin;
