import React from "react"
import { Switch, Redirect, Route } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import validate from "validate.js"
import LoginForm from "components/login/Login"
import RegisterForm from "components/login/Register"
import LectureEditor from "components/lectures/LectureEditor"
import SuggestionForm from "components/lectures/Suggest"
import {TableGetter} from "components/lectures/DayTable"
import LectureList from "components/lectures/LectureList"
import LectureSuggestionList from "components/lectures/LectureSuggestionList"
import LecturesLanding from "components/LecturesLanding"
import UsersLanding from "components/UsersLanding"
import UserLoginSession from "SessionManagement";


// {{{ Helper class AuthRoute provides conditional routing based on whether or not the user is logged ing
class AuthRoute extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		const { component: Component, ... props } = this.props;
		return (
			// TODO: if /login and logged in, redirect to home
			<Route {...this.props}
				component = {props => (this.props.loggedIn ?
					<Component {...props}/> :
				<LoginForm {...this.props.loginProps} message={{type:"warning",body:"Je třeba se přihlásit!"}} />
				)}/>
		);
	}
}
// }}}

// {{{ BLBOSTI

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loggedIn:false
		}
		this.recheckAuth.bind(this);
	}

	recheckAuth(){
		if(!validate.isEmpty(UserLoginSession.getData().id)){
			// TODO: validate with backend here -- or in Session
			this.setState({loggedIn:true});
			return
		}
		this.setState({loggedIn:false});
		return
	}

	componentWillMount() {
		this.recheckAuth();
	}


	render(){
		const RootComponent = Home;
		const checkAuth = this.recheckAuth.bind(this);
		const loginProps = { onAuthFailure: checkAuth, onLoginSuccess: checkAuth,
			updateMain: checkAuth,
		message:{type:"warning",body:"Je třeba se přihlásit!"} 
		}
		// }}}
		// ROUTING
		const AuthRouteProps = {
			loggedIn: this.state.loggedIn,
			loginProps: loginProps,
			onLoadSource: function(){//console.log(shit)
			}
		};
		return(
			<main>
					<Switch>
							<Route path='/login' component={() => (this.state.loggedIn) ? <RootComponent /> : (<LoginForm {...loginProps} />)} />
							<Route path='/register' component={() => (this.state.loggedIn) ? <RootComponent /> : (<RegisterForm {...loginProps} />)} />
						<AuthRoute {...AuthRouteProps} exact path='/' component={()=>(<RootComponent onRequestCheck = {this.recheckAuth}/> )}/>
						<AuthRoute {...AuthRouteProps} exact path='/accounts' component={()=>(<UsersLanding onRequestCheck = {this.recheckAuth}/> )}/>
						<AuthRoute {...AuthRouteProps} exact  path='/lectures' component={()=>(<LecturesLanding onRequestCheck = {this.recheckAuth}/> )}/>
						<AuthRoute {...AuthRouteProps} exact  path='/lectures/edit_timetable' component={()=>(<TableGetter onRequestCheck = {this.recheckAuth}/> )}/>
						<AuthRoute {...AuthRouteProps} exact  path='/lectures/suggest' component={()=>(<SuggestionForm onRequestCheck = {this.recheckAuth}/> )}/>
						<AuthRoute {...AuthRouteProps} exact  path='/lectures/suggestion_list' component={()=>(<LectureSuggestionList onRequestCheck = {this.recheckAuth}/> )}/>
						<AuthRoute {...AuthRouteProps} exact  path='/lectures/lecture_list' component={()=>(<LectureList onRequestCheck = {this.recheckAuth}/> )}/>
	</Switch>
	</main>
);
	// {{{ BLBOSTI
}}
// }}}

export default Main;

