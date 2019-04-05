import React from "react";
import { Link } from "react-router-dom"
import {UILinkStyle, UIHeaderStyle} from "ui/ui"
import Suggest from "components/lectures/Suggest"

class LecturesLanding extends React.Component {
	render() {
		return (
			<div>
				<Link to="lectures/edit_timetable" ><UILinkStyle text="Přednášky" /></Link>
				<Link to="lectures/suggest" ><UILinkStyle text="Navrhnout" /></Link>
			</div>
		)
	}
}
// <Link to="lectures/redact" ><UILinkStyle text="Kontrolovat návrhy" /></Link>
export default LecturesLanding;
