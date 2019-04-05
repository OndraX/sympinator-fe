import React from "react";
import DayTableLectureCell from "components/lectures/daytable/DayTableCell";
import EventsCarousel from "components/lectures/daytable/EventsCarousel";
import ReactModal from "react-modal";
import BaseButton from "ui/BaseButton";

const NULLIDENTIFIER = 0;

// {{{ TableGetter -- fetches response request, renders it as table
class TableGetter extends React.Component {
	// fetch data from api
	getTableData() {
		fetch("/api/timetable",{method:"GET"})
			.then((response) => response.json())
			.then((response) => {
				//console.log(response.tableData);
				this.setState({tableData:response.tableData});
			}).catch((error) => console.log(error)
			);
	}
	constructor(props){
		super(props)
		this.state = {tableData:null}
		this.getTableData();
	}

	render() {
		return(
			<div>
				{this.state.tableData?<DayTable data={this.state.tableData}/>:<span>"loading..."</span>}
		</div>
		);
	}
}
// }}}
// {{{ TableHeaderContainer
class TableHeaderContainer extends React.Component {
	render() {
		return(
			<thead>
				<tr className="table-header" style = {{background:"blue"}}>
					<td></td>
					{this.props.cells.map((colNameObj,index) => (<td key={index} style ={{  background:"red", margin: "4px"}}>{colNameObj.Label}</td>))}
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

	// end fetch data from api
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
							lectureGetter={(id) => {//console.log("getting lecture id",id,"from",this.props.data.lectures);
							var lid = this.props.data.lectures[id];
							if (lid != NULLIDENTIFIER){
							return lid;
							}else{
							//console.log("lecture is null");
							return null;
							}
							}}
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
		const nullLecture = {LectureName: "zatím prázdno"};
		return(
			<tr>
				<td style={{background:"green"}}>
					{this.props.rowNameGetter(this.props.y).Label}
				</td>
				{ this.props.cells.map((referredUUID,index)=>(
				referredUUID !== NULLIDENTIFIER ?
					<DayTableLectureCell
						key={index}
						y={this.props.y}
						x={index}
						referredUUID={referredUUID}
						putClickHandler={this.props.putClickHandler}
						lecture={this.props.lectureGetter(referredUUID)}
						{...this.props.clickHandlers}/>
					:	
					<DayTableLectureCell
						key={index}
						y={this.props.y}
						x={index}
						referredUUID={null}
						putClickHandler={this.props.putClickHandler}
						lecture={nullLecture}
						{...this.props.clickHandlers}/>
						))
				}
			</tr>
		);
	}
}
// }}}

export {DayTable,TableGetter};
