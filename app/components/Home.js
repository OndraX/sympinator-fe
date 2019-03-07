import React from "react";
import DayTable from "./DayTable";
import BaseButton from "/ui/BaseButton";

var tableData = {
	lectures: {
		"515b6f2b":{"name": "Přednášející",
			"lectureName": "Přednáška",
			"bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			"permalink": "foo.xyz" },
		"6f2b7d6f":{"name": "Mluvčí",
			"lectureName": "Promluva",
			"bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			"permalink": "bar.xyz" },
		"774f7093":{"name": "Řečník",
			"lectureName": "Řeč",
			"bio": "Lorem ipsum sit amet,  adipiscing elit.",
			"permalink": "foo.bar" }},
	"day": "Saturday",
	"rooms": ["A1","A2","B3","C5"],
	"hours": ["10:00","12:00","14:00","16:00"],
	"lectureTable":
	[["515b6f2b","774f7093","6f2b7d6f","774f7093"],
		["6f2b7d6f","774f7093","774f7093","515b6f2b"],
		["515b6f2b","774f7093","6f2b7d6f","6f2b7d6f"],
		["515b6f2b","6f2b7d6f","774f7093","774f7093"]]
};

class Home extends React.Component{
	render(){
		return(
			<div>
				<h2>Home</h2>
				<DayTable data={tableData}></DayTable>
			</div>
		);
	}
}

export default Home;
