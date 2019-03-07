import React from "react";
import DayTableLectureCell from "./DayTableCell";
import EventsCarousel from "./EventsCarousel";
import ReactModal from "react-modal";
import BaseButton from "ui/BaseButton";

// TODO: automatically select sole found item
// TODO: Drag and Drop
// TODO: editing
// TODO: give visual cues of update
// TODO: lookable GUI

// {{{ TableHeaderContainer
class TableHeaderContainer extends React.Component {
	render() {
		return(
			<thead>
				<tr className="table-header" style = {{background:"blue"}}>
					<td></td>
					{this.props.cells.map((colName,index) => (<td key={index} style ={{  background:"red", margin: "4px"}}>{colName}</td>))}
				</tr>
			</thead>
		);
	}
}
// }}}
// {{{ DayTable
class DayTable extends React.Component {
	constructor(props) {
		super(props);
		this.dictionary = [];

		this.state = {
			itemSelected: null,
			lectureBeingApplied: null,
			lectureTable: props.data.lectureTable,
			lectureList: props.data.lectures,
			hasModal: false,
			xToFill: null,
			yToFill: null,
		};
	}
	// {{{ lecture editing functions
	selectLectureForInsert(uuid) {
	this.setState({itemSelected: uuid, lectureBeingApplied: this.props.data.lectures[uuid]});
	}
	modalSelectLectureForInsert(uuid) {
		this.cellSetData(this.state.xToFill,this.state.yToFill,uuid);
		this.setState({lectureBeingApplied: this.props.data.lectures[uuid],xToFill:null,yToFill:null});
		this.handleModalClose();
	}

	cellSetData(x,y,uuid){
		let tableTemp = this.state.lectureTable.slice();
		tableTemp[y][x] = uuid;
		this.setState({lectureTable: tableTemp});
		//TODO: check for validity of uuid
	}
	cellAddLectureData(x,y) {
		// slice() makes a _copy_ of the array because we can't alter state directly
		let tableTemp = this.state.lectureTable.slice();
		if(this.state.itemSelected !== null){
			// this is slightly counterintuitive, but y coordinate comes first as tableTemp's a "vector" of "row vectors"
			this.cellSetData(x,y,this.state.itemSelected);
			this.setState({itemSelected:null});
		} else{
			this.setState({hasModal: "select",xToFill:x,yToFill:y});
		}
	}
	// }}}
	// {{{ modal manipulation
	handleModalClose(){
		this.setState({hasModal: false});
	}
	summonEditModal(x,y){
		this.setState({hasModal:"edit",modalEditingUUID: this.state.lectureTable[y][x]});
	}
	// }}}
	render() {
		let eventsCarouselProps = {
			itemSelected:this.state.itemSelected,
			eventList: this.state.lectureList
		};
		let clickHandlers = {
			editClickHandler:this.summonEditModal.bind(this),
			putClickHandler:this.cellAddLectureData.bind(this)
		};
		return (
			<div>
			<EventsCarousel {...eventsCarouselProps}
				selectHandler= {this.selectLectureForInsert.bind(this)} />
			
			<ReactModal
				isOpen={(this.state.hasModal == "select")}
				contentLabel="Vyberte prosím přednášku k přidání"
				appElement={document.getElementById("root")}>
			<BaseButton onClick={this.handleModalClose.bind(this)}>x</BaseButton>
				<EventsCarousel {...eventsCarouselProps}
					selectHandler={ this.modalSelectLectureForInsert.bind(this)} />
			</ReactModal>

			<ReactModal
				isOpen={(this.state.hasModal == "edit")}
				contentLabel="Úprava přednášky"
				appElement={document.getElementById("root")}>
			<BaseButton onClick={this.handleModalClose.bind(this)}>x</BaseButton>
			</ReactModal>

				<table>
					<TableHeaderContainer cells={this.props.data.rooms} />
					<tbody>
						{this.state.lectureTable.map((row,index)=>(<TableRowContainer
							key={index}
							rowNameGetter={(y) => {return this.props.data.hours[y];} }
							lectureGetter={(id) => {return this.props.data.lectures[id];}}
							y={index}
							clickHandlers={clickHandlers}
							cells={row} />))}
					</tbody>
				</table>
			</div>
		);
	}
}
// }}}
// {{{ TableRowContainer

class TableRowContainer extends React.Component {
	render() {
		return(
			<tr>
				<td style={{background:"green"}}>
					{this.props.rowNameGetter(this.props.y)}
				</td>
				{ this.props.cells.map((referredUUID,index)=>(
					<DayTableLectureCell
						key={index}
						y={this.props.y}
						x={index}
						referredUUID={referredUUID}
						putClickHandler={this.props.putClickHandler}
						lecture={this.props.lectureGetter(referredUUID)}
					{...this.props.clickHandlers}/>))
				}
			</tr>
		);
	}
}
// }}}

export default DayTable;
