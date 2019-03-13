import React from "react";
import uuid from "uuid";

// TODO: consider auto-generating fields from JSON for potential future alterations
class EventEditForm extends React.Component {
	constructor(props) {
		super(props);
		this.uuid = uuid();
	}

	render() {
		return(
		<div>
			<input type="text" onChange="this.updateObject('name')" id="name" name="name" value="this.props.editedObject.name" />
			<input type="text" onChange="this.updateObject('lectureName')" id="lectureName" name="lectureName" value="this.props.editedObject.lectureName"  />
			<textarea id="bio" name="bio" onChange="this.updateObject('bio')" cols="30" rows="10">{this.props.editedObject.bio}</textarea>
			{/%<textarea id="desc" name="" cols="30" rows="10"></textarea>%/}
			<button type="submit">{"Odeslat"}</button>
		</div>
		);
	}
}

export default EventEditForm;
