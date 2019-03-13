import React from "react";
import DayTableLectureCell from "./DayTableCell";
import Fuse from "fuse.js"; // fuzzy search

// {{{ EventSearch
class EventSearch extends React.Component {
	constructor(props) {
		super(props);
		let fuseOptions = {
			keys: ["name","lectureName"],
			positon: 0,
			distance: 80,
			threshold: 0.5,
			maxPatternLength: 24,
		}
		this.fuse = new Fuse(props.searchIn,fuseOptions);
		this.changeHandler.bind(this);
	}

	changeHandler(e){
		let result = this.fuse.search(e.target.value,this.props.searchIn);
		if(e.target.value.length > 2){
			this.props.searchHandler(result);
		}else{
			this.props.searchHandler(this.props.searchIn);
		}
		
	}

	render() {
		return (
			<input type="text" onChange={(evt)=>{ this.changeHandler(evt); }} placeholder={this.props.placeholder} />
		);
	}
}

// }}}
// {{{ EventsCarousel
class EventsCarousel extends React.Component {
	constructor(props) {
		super(props);
		let filteredList = []; 

		for(let key in this.props.eventList) {
			if(this.props.eventList.hasOwnProperty(key)) {
				// this.dictionary.push(key);
				let item = Object.assign({},this.props.eventList[key]);
				item["uuid"] = key;
				filteredList.push(item);
			}
		}

		this.state = {filteredList: filteredList};
		this.dataList = filteredList;
		this.searchThreshold = 0.4;
	}
	searchHandler(result){
		this.setState({filteredList: result});
	}
	render() {
		const itemSelected = this.props.itemSelected;
		const handleSelect = this.props.selectHandler;
		return (
			<div className="eventsContainer">
				<EventSearch
					placeholder="Type query here ..."
					searchIn={this.dataList}
					searchHandler = {this.searchHandler.bind(this)} />
				{ this.state.filteredList.map((eventObject,index) => (
					<EventDisplay key={index} bg={(itemSelected == eventObject.uuid)?"red":"blue"}
						eventObject={eventObject} clickHandler = { () => (handleSelect(eventObject.uuid))}
					/>
				)) }
			</div>
		);
	}
}
// }}}
class ConcatText extends React.Component {
	render() {
		var concattedText = this.props.text;
		concattedText = concattedText.substr(0,this.props.lengthTo)
		if(concattedText.length !== this.props.text.length){
			concattedText += "…";
		}
		return (
			<span>{concattedText}</span>
		)
	}
}
// {{{ EventDisplay
class EventDisplay extends React.Component {
	render() {
		return (
			<div onClick={this.props.clickHandler} style={{display:"inline-block",padding:"4px",background:this.props.bg,border:"3px solid black",boxSizing:"borderBox"}}>
				<strong>{this.props.eventObject.SpeakerName}:</strong>
				{this.props.eventObject.LectureName}
					<p><ConcatText text={this.props.eventObject.SpeakerBio} lengthTo="160"/></p>
				<p><ConcatText text={this.props.eventObject.LectureDesc} lengthTo="160"/></p>
			</div>
		)
	}
}
// }}}
//
export default EventsCarousel;
