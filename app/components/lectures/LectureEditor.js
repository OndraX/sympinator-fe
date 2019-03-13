import React from "react";
import { TableGetter,DayTable } from "components/lectures/DayTable";

class LectureEditor extends React.Component{
	render(){
		return(
			<div>
				<TableGetter />
			</div>
		);
	}
}

export default LectureEditor;

