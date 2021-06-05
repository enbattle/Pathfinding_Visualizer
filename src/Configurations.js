import React from "react";
import Maze from "./Maze";
// import ReactDOM from 'react-dom';

/* 
	Ask the user for the grid layout and type of pathfinding algorithm
		- rows
		- columns
		- algorithm type
*/
class Configuration extends React.Component {
	constructor(props) {
		super(props);

		// Initialize states
		this.state = {
			rows: "",
			columns: "",
			algorithm: "BreadthFirstSearch",
			rowErrorMessage: "",
			columnErrorMessage: "",
			setUpMaze: false
		};

		// Initialize important methods
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// When the input fields change, if the value is invalid, show error message
	handleChange(event) {
		// Remove the grid if user decides to change the grid layout again
		this.setState({setUpMaze: false});

		// Check that row values are valid
		if (event.target.name === "rows") {
			if (event.target.value === "" || event.target.value < 5 || event.target.value > 15) {
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
			if (event.target.value === "" || event.target.value < 5 || event.target.value > 15) {
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
			<div className="container-fluid">
				<div className="sidebar">
					<h3>Pathfinder Visualizer</h3>
					<p>Hello, welcome to Pathfinder Visualizer! This application will help you visualize how an entity finds a path in a maze in the presence of walls.</p>
					
					{/* Ask the user for rows, columns, and algorithm */}
					<form onSubmit={this.handleSubmit}>
						{/* Rows */}
						<label htmlFor="rows" className="form-label">Number of Rows</label>
						<div className="mb-3">
							<input id="rows" name="rows" className="form-control" type="number" placeholder="Choose between 5 and 15" value={this.state.rows} onChange={this.handleChange}/>
							{rowError && <p className="error-message">{rowError}</p>}
						</div>

						{/* Columns */}
						<label htmlFor="columns" className="form-label">Number of Columns</label>
						<div className="mb-3">
							<input id="columns" name="columns" className="form-control" type="number" placeholder="Choose between 5 and 15" value={this.state.columns} onChange={this.handleChange}/>
							{colError && <p className="error-message">{colError}</p>}
						</div>
						
						{/* Algorithm type */}
						<label htmlFor="algorithmChoices" className="form-label">Type of Algorithm</label>
						<div className="mb-3">
							<select id="algorithmChoices" name="algorithm" className="form-select" aria-label="Algorithm Choices" value={this.state.algorithm} onChange={this.handleChange}>
								<option value="BreadthFirstSearch">Breadth-first Search</option>
								<option value="DepthFirstSearch">Depth-first Search</option>
								<option value="UniformCostSearch">Uniform-Cost Search</option>
								<option value="AStarAlgorithm">A* Algorithm</option>
							</select>
						</div>

						<div>
							<input type="submit" className="btn btn-primary" value="Submit"/>
						</div>
					</form>
				</div>
				{/* Maze Area */}
				{setUpMaze && <Maze rows={this.state.rows} columns={this.state.columns} algorithm={this.state.algorithm}/>}
			</div>
		);
	}
}

export default Configuration;