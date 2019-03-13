import React from "react";
import LectureDisplay from "components/lectures/LectureDisplay";

class LectureSuggestionList extends React.Component {
	constructor(props) {
		super(props);
		fetch("/api/lecture_suggestions",{"method":"GET"})
		.then((response)=>response.json())
			.then((response)=>this.setState({ lectureList:response }));
		this.state = {lectureList: null}
}

	render() {
		return(
			<div>
				{this.state.lectureList !== null && this.state.lectureList.length>=1 ? this.state.lectureList.map((lecture)=>{
							return <LectureDisplay onClickHandler={()=>console.log("clicked on suggestions")} {...lecture} />;
				}): null}
	</div>
	);
	}
}

export default LectureSuggestionList;
