import React from "react"; // maybe not necessary

// TODO: automatically select sole found item
// TODO: Drag and Drop
// TODO: editing
// TODO: give visual cues of update
// TODO: lookable GUI

// {{{ TableHeaderContainer
class TableHeaderContainer extends React.Component {
	requestMaker() {

		fetch("/login",
			{
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
		)
		}
	render() {
		return(
			<button onClick = {this.requestMaker}></button>
		);
	}
}
// }}}

export default DayTable;


