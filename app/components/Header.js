import React from "react"
import { Link } from "react-router-dom"
import {UILinkStyle, UIHeaderStyle, UILogo,UIConstants as c} from "ui/ui"
import BaseButton from "ui/BaseButton";
import UserLoginSession from "SessionManagement";

//{{{ css styles
const HeaderStyle = {
	background: 'linear-gradient(to left,'+c.bgLight+','+c.bgDark+')'
};

const ListItemStyle =  {
	marginLeft: "10px",
	textDecoration: "none",
	color: c.linkColour,
	fontFamily: "sans-serif",
	textTransform: "lowercase",

}
//}}}
const Header = () => {
	const linkProps = {
		style: ListItemStyle
	};
	return(
		<header style={HeaderStyle}>
		<UILogo alt="Sympinátor" />
			<nav>
				<ul>
					<Link to='/' {...linkProps}><UILinkStyle text="Domů" /></Link>
					<Link to='/accounts' {...linkProps}><UILinkStyle text="Uživatelské účty" /></Link>
					<Link to='/lectures' {...linkProps}><UILinkStyle text="Přednášky" /></Link>
					<a href={"/api/users/"+UserLoginSession.getData().id}>{UserLoginSession.getData().name}</a>
					<BaseButton style={{"float":"right"}} onClick = { UserLoginSession.unsetData() }>Odhlásit se</BaseButton>
				</ul>
			</nav>
		</header>
	)};

export default Header;
