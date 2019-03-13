import React from "react"
import { Link } from "react-router-dom"
import {UILinkStyle, UIHeaderStyle} from "ui/ui"
import BaseButton from "ui/BaseButton";
import UserLoginSession from "SessionManagement";

const Header = () => {
	return(
		<header>
		<UIHeaderStyle text="Sympinátor" />
			<nav>
				<ul>
								<Link to='/'><UILinkStyle text="Domů" /></Link>
					<Link to='/accounts'><UILinkStyle text="Uživatelské účty" /></Link>
					<Link to='/lectures'><UILinkStyle text="Přednášky" /></Link>
					<a href={"/api/users/"+UserLoginSession.getData().id}>{UserLoginSession.getData().name}</a>
					<BaseButton style={{"float":"right"}} onClick = { UserLoginSession.unsetData() }>Odhlásit se</BaseButton>
				</ul>
			</nav>
		</header>
	)};

export default Header;
