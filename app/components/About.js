import React from "react";
import UserProfile from "/SessionManagement";

class About extends React.Component{
	constructor(props) {
		super(props);
		this.state.data = UserProfile.getData();
	}
  render(){
    return(
      <div>
      <h2>About</h2>
      </div>
    );
  }
}

export default About;
