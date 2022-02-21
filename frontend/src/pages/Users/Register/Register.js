import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { path_routes } from "../../../modules/global_data";
import { regex_username, regex_password } from "../../../modules/functions";

import "./Register.css";


function	Register() {
	const	navigate = useNavigate();

	const	[email, setEmail]					= useState("");
	const	[password, setPassword]				= useState("");
	const	[registerStatus, setRegisterStatus]	= useState("");

	const	userRegister = (e) => {
		e.preventDefault();
		if (!regex_username(email) || !regex_password(password)) {
			setRegisterStatus("email or password not valid");
			return ;
		}
		Axios.post("/auth/register", { email, password })
			.then((response) => {
				setRegisterStatus(response.data.message);
			});
	};

	return (
		<div id="register">
			<h1>Register</h1>
			<form>
				<input type="text" name="email" placeholder="Email" autoComplete="off"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input type="password" name="password" placeholder="Password" autoComplete="off"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={userRegister}>REGISTER</button>
				<div>
					{registerStatus}
				</div>
			</form>
		</div>
	);
}


export default Register;
