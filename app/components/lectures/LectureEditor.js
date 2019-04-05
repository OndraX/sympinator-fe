import React from "react";
import {FormGenerator } from "/components/abstractions/FormMaker.js";

class LectureEditor extends React.Component {
	constructor(props) {
		super(props);
		this.formFields = [
			{
				label: "Název přednášky",
				name: "LectureName",
				type: "text",
			},
			{
				label: "Jméno",
				name: "SpeakerName",
				type: "text",
			},
			{
				label: "Musí dojíždět?",
				name: "FromNonprague",
				type: "toggle",
			},
			{
				label: "komentáře k návrhu",
				name: "Preferences",
				type: "textarea",
			},
			{
				label: "Medailonek přednášejícího",
				name: "SpeakerBio",
				type: "markdown",
			},
			{
				label: "Popis přednášky",
				name: "LectureDesc",
				type: "markdown",
			},
		];
		var formData = {}
		this.formFields.forEach((field)=>{
			formData[field.name] = ""
		})
		this.state = {message: null,formData:formData};

	}

	handleFormSubmit(formData){
		var copy = JSON.parse(JSON.stringify(this.state.formData)) // must not mutate state
		Object.assign(copy,formData)
		//console.log("FD",formData);
		if(!(Object.keys(formData).length < 3 && formData.constructor === Object)){
			this.setState({message:null});
			fetch("/api/lectures/",{ // TODO
				method: "POST",
				body: JSON.stringify(copy),
				headers: { "Content-Type": "application/json" },
			})
				.then(response => {
					//console.log(response);
					return (response.json())} )
				.then(response => {
					//console.log(response);
					if(response.Success == true){
						UserLoginSession.setData({token: response.Token, name: response.Name, id: response.ID});
						this.props.updateMain();
					}else{
						UserLoginSession.unsetData();
						this.props.updateMain();
					}
				});
		}
		else{
			this.setState({message:{type:"warning",body:"Prosím vyplňte alespoň libovolná tři pole."}});
		}
	}

	render() {
		var handleFormSubmit = this.handleFormSubmit.bind(this);
		return (
			<div>
				{(this.state.message !== null) ? (<div className="message-display {this.state.message.type}">{this.state.message.body}</div>) : ""}
				<FormGenerator postHandler = {(data) => handleFormSubmit(data)} fields={this.formFields} />
			</div>
			);
	}
}

export default LectureEditor;
