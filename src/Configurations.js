import React from 'react';
import Maze from "./Maze";
//import ReactDOM from 'react-dom';

/* 
	Ask the user for the grid layout and type of pathfinding algorithm
		- rows
		- columns
		- algorithm type
*/
class Configuration extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			rows: null,
			columns: null,
			algorithm: "BreadthFirstSearch",
			rowErrorMessage: "",
			columnErrorMessage: "",
			setUpMaze: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// When the input fields change, if the value is invalid, show error message
	handleChange(event) {
		// Remove the grid if user decides to change the grid layout again
		this.setState({setUpMaze: false});

		// Check that row values are valid
		if (event.target.name === "rows") {
			if (event.target.value === "" || event.target.value < 5 || event.target.value > 20) {
				this.setState({rows: null});
				this.setState({rowErrorMessage: "Invalid row value!"});
				return;
			}
			else {
				this.setState({rowErrorMessage: ""});
			}
		}

		// Check that column values are valid
		if (event.target.name === "columns") {
			if (event.target.value === "" || event.target.value < 5 || event.target.value > 20) {
				this.setState({columns: null});
				this.setState({columnErrorMessage: "Invalid column value!"});
				return;
			}
			else {
				this.setState({columnErrorMessage: ""});
			}
		}

		// Set the rows, columns, and algorithm values for the Maze class to use
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	// When user submits input fields, check for validity, and then move on to the next step (allow users to pick walls)
	handleSubmit(event) {
		event.preventDefault();

		// Check that the user did not ignore the error messages
		if (this.state.rows === "0" || this.state.rows === "" || this.state.rows === null) {
			this.setState({rowErrorMessage: "Invalid row value!"});
			return;
		}
		else {
			this.setState({rowErrorMessage: ""});
		}
		
		if (this.state.columns === "0" || this.state.columns === "" || this.state.columns === null) {
			this.setState({columnErrorMessage: "Invalid column value!"});
			return;
		}
		else {
			this.setState({columnErrorMessage: ""});
		}

		// Rows, columns, and algorithm obtained --- time to show the grid
		this.setState({setUpMaze: true});

		// console.log(this.state.rows);
		// console.log(this.state.columns);
		// console.log(this.state.algorithm);
	}

	render() {
		// Values to check in order to display error messages or move on to the next step
		const rowError = this.state.rowErrorMessage;
		const colError = this.state.columnErrorMessage;
		const setUpMaze = this.state.setUpMaze;

		return (
			<div>
				{/* Ask the user for rows, columns, and algorithm */}
				<form onSubmit={this.handleSubmit}>
					{/* Rows */}
					<div>
						<label>
							Number of Rows
							<input id="rows" name="rows" type="number" value={this.state.rows} onChange={this.handleChange}></input>
						</label>
						{rowError && <p className="errorMessage">{rowError}</p>}
					</div>

					{/* Columns */}
					<div>
						<label>
							Number of Columns
							<input id="columns" name="columns" type="number" value={this.state.columns} onChange={this.handleChange}></input>
						</label>
						{colError && <p className="errorMessage">{colError}</p>}
					</div>
					
					{/* Algorithm type */}
					<div>
						<label>
							Type of Algorithm
							<select id="algorithmChoices" name="algorithm" value={this.state.algorithm} onChange={this.handleChange}>
								<option value="BreadthFirstSearch">Breadth-first Search</option>
								<option value="DepthFirstSearch">Depth-first Search</option>
								<option value="DijkstraAlgorithm">Dijkstra's Algorithm</option>
								<option value="AStarAlgorithm">A* Algorithm</option>
							</select>
						</label>
					</div>

					<div>
						<input type="submit" value="Submit"></input>
					</div>
				</form>

				{/* Maze Area */}
				{setUpMaze && <Maze rows={this.state.rows} columns={this.state.columns} algorithm={this.state.algorithm}/>}
			</div>
		);
	}
}

export default Configuration;