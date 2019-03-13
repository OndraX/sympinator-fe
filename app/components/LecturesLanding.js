import React from "react";
import { Link } from "react-router-dom"
import {UILinkStyle, UIHeaderStyle} from "ui/ui"
import Suggest from "components/lectures/Suggest"

class LecturesLanding extends React.Component {
	render() {
		return (
			<div>
					<Link to="lectures/edit_timetable" ><UILinkStyle text="Přednášky" /></Link><br />
				<Link to="lectures/suggest" ><UILinkStyle text="Navrhnout" /></Link>
				<Link to="lectures/suggestion_list" ><UILinkStyle text="Seznam návrhů" /></Link>
				<Link to="lectures/lecture_list" ><UILinkStyle text="Seznam přednášek" /></Link>
			</div>
		)
	}
}
// <Link to="lectures/redact" ><UILinkStyle text="Kontrolovat návrhy" /></Link>
export default LecturesLanding;
