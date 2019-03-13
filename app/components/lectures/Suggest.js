import * as React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import BaseButton from "ui/BaseButton";
import UserLoginSession from "SessionManagement";

class SuggestionForm extends React.Component {
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
		console.log("FD",formData);
		if(!(Object.keys(formData).length < 3 && formData.constructor === Object)){
			this.setState({message:null});
			fetch("/api/lecture_suggestions",{
			method: "POST",
			body: JSON.stringify(copy),
			headers: { "Content-Type": "application/json" },
		})
			.then(response => {
				console.log(response);
				return (response.json())} )
			.then(response => {
				console.log(response);
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

class FormGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formValues: {}
		}
	}

	changeHandler(value,key) {
		var vals = JSON.parse(JSON.stringify(this.state.formValues)) // must not mutate state
		vals[key] = value;
		this.setState({formValues:vals});
	}

	render() {
		var chandler = this.changeHandler.bind(this)
		var postHandler = this.props.postHandler;
		return (
			<>
			<BaseButton style={{width:"200px",height:"40px"}} onClick = {()=>postHandler(this.state.formValues)} > Odeslat </BaseButton>
				<div>
					{this.props.fields.map(function(o,i) { return (<FormElement {...o} changeHandler={chandler} key={i} />); })}
				</div>
	</>
		);
	}
}

class FormElement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value:""}
	}

	render() {
		var component;
		switch( this.props.type ) {
			case "markdown":
				component = (
					<div style={{maxWidth:"50%",minWidth:"400px"}} className="container">
						<SimpleMDE
							onChange={(e) => this.props.changeHandler.call(this,e,this.props.name)}
						/>	
							</div>
							)
				break;
			case "textarea":
				component = (
					<textarea style={{maxWidth:"50%",minHeight:"220px",resize:"none",minWidth:"400px"}} id={this.props.name} type="text" name={this.props.name}
						onChange={(e) => this.props.changeHandler.call(this,e.target.value,this.props.name)}>
						{this.props.placeholder}
					</textarea>
					)
				break;
			case "toggle":
				component = (
					<input type="checkbox"
						name={this.props.name}
						id={this.props.name}
						onChange={(e) => this.props.changeHandler.call(this,e.target.checked,this.props.name)}
					/>
						)
				break;
			case "text":
			default:
				component = (
					<input id={this.props.name} type="text" name={this.props.name}
						onChange={(e) => this.props.changeHandler.call(this,e.target.value,this.props.name)}/>
						);
}
return(<div>
	{this.props.label}:<br />
	{component}<br />
</div>);
}
}
//<BaseButton style={{width:"200px",height:"40px"}} onClick = {() => UserLoginSession.query("/api/test",{"method":"GET",ignoreUnauthenticated:true}).then((response) => console.log(response)).then((response)=>console.log(response)).catch((error)=>console.log(error))} > test </BaseButton>

export default SuggestionForm;
