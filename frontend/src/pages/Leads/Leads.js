import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Axios from "axios";

import { check_page_access } from "../../modules/functions";

import DataTableSearch from "./dataTableSearch/DataTableSearch";
import LeadsForm from "./leadsForm/LeadsForm";

import "./Leads.css";


function	Leads() {
	const	history	= useHistory();

	if (check_page_access(true) === false)
		history.push("/");


	const	[leadsList, setLeadsList]			= useState([]);	
	const	[destinataires, setDestinataires]	= useState([]);
	const	[provenances, setProvenances]		= useState([]);

	const	[submit, setSubmit]		= useState(false);
	const	[subData, setSubData]	= useState([]);

	const	[loading, setLoading]	= useState(false);
	const	override				= `display: flex; justify-content: center; align-items: center;`;

	useEffect(() => {
		Axios.get("/api/leads/readDestinataires")
			.then((response) => {
				setDestinataires(response.data);
			});
		Axios.get("/api/leads/readProvenances")
			.then((response) => {
				setProvenances(response.data);
			});
		if (submit) {
			setLeadsList([]);
			Axios.get("/api/leads/readQuery", { params : { subData }, })
				.then((response) => {
					setLeadsList(response.data);
					setLoading(false);
				});
			setSubmit(false);
		}
	}, [submit, subData]);

	return (
		<div id="leadsList_container">
			<h1> LEADS LIST </h1>

			<LeadsForm
				onClick={({ ...data }) => {
					setSubData(data);
					setSubmit(true);
					setLoading(true);
				}}
				destinataires={destinataires}
				provenances={provenances}
			/>

			<br />
			{	loading &&
				<ScaleLoader
					css={override} size={150} color={"red"} loading={loading}
				/>
			}
			{ leadsList.length > 0 &&
				<DataTableSearch
					data={leadsList}
					destinataires={destinataires}
					provenances={provenances}
					onClick={() => {
						setSubmit(true);
						setLoading(true);
					}}
				/>
			}
			<span id="scroll_top" onClick={() => window.scrollTo(0, 0)}>scroll top</span>
		</div>
	);
}

export default Leads;
