import React from "react";
import UserList from "components/manageusers/UserList"

class UsersLanding extends React.Component {
	render() {
		return (
			<div>
				<h3>Seznam uživatelů</h3>
				<UserList />
			</div>
		)
	}
}

export default UsersLanding;
