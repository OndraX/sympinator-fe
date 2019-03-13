import React from "react";

class LectureDisplay extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return(
			<div style={{background:"red",padding:"5px",transform:"rotate(4deg)"}} onClick = {this.props.onClickHandler(this.props.ID)}>
				{this.props.SpeakerName }:
				{this.props.LectureName }|
				<emph>
					{this.props.SpeakerBio }
				</emph>|
				<emph>
					{this.props.LectureDesc }
				</emph>
	</div>
	);
	}
}

export default LectureDisplay;
