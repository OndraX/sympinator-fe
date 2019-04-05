import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Main from "./Main";
import {UIConstants as c} from "ui/ui"

class App extends React.Component {
	render() {
//{{{ css styles
		const BackgroundStyle = {
			background: 'linear-gradient(to left,'+c.bgLight+','+c.bgDark+')',
			height: '100%'

		};
//}}}
		return (
			<div style = {BackgroundStyle}>
				<Header />
				<Main />
			</div>
		)
	}
}

export default App;
