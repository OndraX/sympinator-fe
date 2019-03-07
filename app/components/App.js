import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Main from "./Main";

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Main />
			</div>
		)
	}
}

export default App;
