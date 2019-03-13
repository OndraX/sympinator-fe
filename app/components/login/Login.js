import React from "react";
import Register from "components/login/Register";
import { Link } from "react-router-dom";
import UserLoginSession from "SessionManagement";

// {{{ LoginForm
class LoginForm extends React.Component {
	
	handleName(evt) {
		this.setState({userName: evt.target.value});
	}
	handlePass(evt) {
		this.setState({userPass: evt.target.value});

	}
	globalSetToken(tokes) {
	}
	handleSubmit(evt) {
		evt.preventDefault();
		const data = {"user-name":this.state.userName,
			"user-pass": this.state.userPass};
		
		fetch("/login",{
			method: "POST",
			body: JSON.stringify(data),
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
	constructor(props) {
		super(props);
		this.state = {message: props.message, userName: null, userPass: null};
		// this.state = {message: {type:"warning",body:"beware beware, the devil is here"} };
	}
	render() {
		this.handleName.bind(this);
		this.handlePass.bind(this);
		this.handleSubmit.bind(this);
		return (
			<div>
				{(this.state.message !== null) ? (<div className="message-display {this.state.message.type}">{this.state.message.body}</div>) : ""}
					<form onSubmit={e => this.handleSubmit(e)} method="POST">
					<input onChange={e => this.handleName(e)} id="name" type="text" name="user-name" />
					<br />
					<input onChange={e => this.handlePass(e)} id="password" type="password" placeholder="heslo" name="user-pass" />
					<br />
					<input type="submit" value="Odeslat" />
					<br />
										<Link to="/register">Založit účet</Link>
				</form>
			</div>
		)
	}
}

// }}}
export default LoginForm;
