import React from "react";
import validate from "validate.js";

// ( function(originalFunc) {
// 		validate.isEmpty = function(arg) {
// 			if(!validate.isDefined(arg) || arg == "")
// 			{
// 				return false;
// 			}
// 			originalFunc.call(this,arg);
// 		}
// 	}
// )(validate.isValid);
//

const validRoles = [ "USERS","ADMINS","EDITORS","COORDINATORS" ]; //TODO: this will have to be state or props of some root component
// TODO: make these numbers for database insertion
// help Component ConditionalDisplay {{{
class ConditionalDisplay extends React.Component {
	render() {
		if(this.props.condition && this.props.dataToDisplay !== null && typeof this.props.dataToDisplay !== "undefined"){
			return (<ul> {this.props.dataToDisplay.map((d,i) => (<li key={i}>{d}</li>))} </ul>);
		}
		else return null;
	}
}
// }}}
// {{{ special help component RoleSelect 
class RoleSelect extends React.Component {
	constructor(props){
		super(props);
		// TODO: generate this via get request
		this.state ={allowedRoles: [
			{"label":"user","value":2},
			{"label":"admin","value":1},
			{"label":"editor","value":3},
		] };
	}
	render() {
		return(
			<select {...this.props} >
				{this.state.allowedRoles.map((e,i)=><option value={e.value} key={i} >{e.label}</option> )}
			</select>
			)
	}
}
// }}}
// {{{ RegisterForm
class RegisterForm extends React.Component {

	handleName(evt) {
		this.setState({userName: evt.target.value});
	}
	handleRealName(evt) {
		this.setState({userRealName: evt.target.value});
	}
	handlePass(evt) {
		this.setState({userPass: evt.target.value});
	}
	handleEMail(evt) {
		this.setState({userEMail: evt.target.value});
	}
	handleEMailPair(evt) {
		this.setState({userEMailPair: evt.target.value});
	}
	handleRoleSelect(evt) {
		this.setState({userRole: evt.target.value});
	}
	toggleIsLoggedIn() {
		const isLoggedIn = this.state.isLoggedIn;
		this.setState({isLoggedIn: !isLoggedIn});
	}
	handleSubmit(evt) {
		evt.preventDefault();

		const data = {
			"UserName":this.state.userName,
			"UserRealName":this.state.userRealName,
			"UserEMail":this.state.userEMail,
			"UserPass": this.state.userPass,
			"UserRole":this.state.userRole,
		};

 // CHECK VALIDITY
 var validationResult= validate(data,this.validationConditions);
		if(validate.isEmpty(validationResult) || true) {
		fetch("/api/users",{
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
			//TODO: auth headers here
		}).then((response) =>{return response.json()})
				.then((response) => {
					//console.log(response);
			});
		}else{
			this.setState({message:{type:"error",body:"Formulář obsahuje chybně vyplněná pole. Vraťte se prosím a zkontrolujte jejich obsah."}}); //TODO: make this Reactj modal
		}

		// SessionManagement.standardAPIRequest(
	}


	constructor(props) {
		super(props);
		this.state = {isLoggedIn:false,  message: {type:"warning",body:"Test warning"}, userName: "", userPass: "",userEMail:"",userEMailPair:"",userRealName:"",
			userRole:"USERS",
			valid: false, validationData: {userName: "", userPass: "",userEMail:"",userEMailPair:"",userRealName:"",userRole:null}};
		// this.state = {message: {type:"warning",body:"beware beware, the devil is here"} };
		this.validationConditions = { // {{{
			"UserName":{
				length: {
					minimum: 5,
					maximum: 32,
				},
				format: {
					pattern: "[a-z0-9]+",
					flags: "i",
					message: "can only contain a-z,A-Z and 0-9"
				}

			},
			"UserRealName": {
				length: {
					minimum: 2,
					maximum: 16,
					tooShort: "needs to have %{count} words or more",
					tooLong: "needs to have %{count} words or fewer",
					tokenizer: function(value) {
						return value.split(/\s+\S/g);
					}
				}
			},
			"UserEMail":{
				email: true
			},
			"UserEMailPair":{
				equality: {
					attribute: "UserEMail",
				}
			},
			"UserPass":{
				length: {
					minimum: 8,
					maximum: 128,
				}
			},
			"UserRole":{
				inclusion: validRoles
			}, // TODO: would be nice to have async API-based validator which actually figures out if current role is hierarchically admissible -- but no other ones will ideally be available
			// }}}
		};

		this.handleSubmit.bind(this);
	}

	asyncValidate(evt) {
		evt.preventDefault();
		const data = {
			"UserName":this.state.userName,
			"UserRealName":this.state.userRealName,
			"UserEMail":this.state.userEMail,
			"UserEMailPair":this.state.userEMailPair,
			"UserPass": this.state.userPass,
			"UserRole":this.state.userRole,
		};
		function success(attrs) {
			//console.log("success",attrs);
			this.setState({valid: true, validationData: {}});
		}
		function failure(result) {
			//console.log("validation failure",result);
			//console.log("SHITTYS TATE",this.state);
			this.setState({valid: false, validationData: result});
		}
		validate.async(data,this.validationConditions).then(success.bind(this),failure.bind(this))

	}

	render() {
		this.handleName.bind(this);
		this.handlePass.bind(this);
		this.handleEMail.bind(this);
		this.handleEMailPair.bind(this);
		this.handleRealName.bind(this);
		this.handleRoleSelect.bind(this);
		this.toggleIsLoggedIn.bind(this);
		this.asyncValidate.bind(this);
		const commonProps = {}
		return (
			<div  onKeyUp = {(e)=> {
				{/* if( e.keyCode == 13 || e.keyCode == 27 ||  e.keyCode == 9 || e.keyCode == 38 || e.keyCode == 39 ){ */}
					this.asyncValidate.call(this,e)
				// }
				}}>
				<button onClick={() => this.toggleIsLoggedIn()}>Fejkovat přihlášení</button>
				{(this.state.message != null) ? (<div className="message-display {this.state.message.type}">{this.state.message.body}</div>) : ""}
				<form onSubmit={e => this.handleSubmit(e)} method="POST">
				<ConditionalDisplay condition={this.state.userName.length>2} dataToDisplay={this.state.validationData["UserName"] } />
					<input {...commonProps} onChange={e => this.handleName(e)} id="name" type="text" name="user-name" placeholder="user-name" /> <br/>
					<ConditionalDisplay condition={this.state.userRealName.length>2} dataToDisplay={this.state.validationData["UserRealName"] } />
					<input {...commonProps} onChange={e => this.handleRealName(e)} id="real-name" type="text" name="user-real-name" placeholder="user-real-name" /> <br/>
					<ConditionalDisplay condition={this.state.userEMail.length>2} dataToDisplay={this.state.validationData["UserEMail"] } />
					<input {...commonProps} onChange={e => this.handleEMail(e)} id="email" type="text" name="user-e-mail" placeholder="user-e-mail" /> <br/>
					<ConditionalDisplay condition={this.state.userEMailPair.length>2} dataToDisplay={this.state.validationData["UserEMailPair"] } />
					<input {...commonProps} onChange={e => this.handleEMailPair(e)} id="email-pair" type="text" name="user-e-mail-pair" placeholder="user-e-mail-pair" /> <br/>
					<ConditionalDisplay condition={this.state.userPass.length>2} dataToDisplay={this.state.validationData["UserPass"] } />
					<input {...commonProps} onChange={e => this.handlePass(e)} id="password" type="password" name="user-pass" placeholder="user-pass" /> <br/>

					{this.state.isLoggedIn? <RoleSelect /> : null}
					<input {...commonProps} type="submit" disabled = {(this.state.valid) ? "": ""} value="Odeslat" />
				</form>
			</div>
			)
}
}

// }}}
export default RegisterForm;
