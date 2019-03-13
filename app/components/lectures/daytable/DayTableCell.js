import React from "react";
import BaseButton from "/ui/BaseButton";

class DayTableLectureCell extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let handleEditClick = this.props.editClickHandler;
		const handlePutClick = this.props.putClickHandler;
		console.log(this.props);
		return (
			<td style={{background:"green", height: "72px", width: "86px"}}>
				{ this.props.lecture.LectureName} <br />
				<div>
					<BaseButton onClick={()=>{handlePutClick(this.props.x,this.props.y);}}>{"Put"}</BaseButton>
					{this.props.referredUUID!==null?<BaseButton onClick={()=>{handleEditClick(this.props.x,this.props.y);}}>{"Edit"}</BaseButton>:null}
				</div>
			</td>);
	}
}

export default DayTableLectureCell;
