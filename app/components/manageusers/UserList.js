import React from "react";
import UserProfile from "/SessionManagement";

class UserList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {data: UserProfile.getData()}
	}
	render(){
		return(
			<div>
			</div>
			);
	}
}

export default UserList;
