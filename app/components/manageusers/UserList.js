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
				<h2>{JSON.stringify(this.state.data)}</h2>
			</div>
			);
	}
}

export default UserList;
