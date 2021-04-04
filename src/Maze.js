import React from 'react';
// import ReactDOM from 'react-dom';

class Maze extends React.Component {
	constructor(props) {
		super(props);

		/*	
			Configuration (Parent) class properties:
				- rows: Integer value  of number of rows chosen by user
				- columns: Integer value of number of columns chosen by user
				- algorithm: String indicating type of algorithm chosen by user
		*/

		// Set of walls that the user wishes to put into place
		var bigWalls = new Set();

		// Initialize the start state and the goal state
		var startState = {
			row: this.props.rows-1,
			column: 0,
			direction: null
		};
		var goalState = {
			row: 0,
			column: this.props.columns-1,
			direction: null
		};

		// Initialize States
		this.state = {
			start: startState,
			goal: goalState,
			walls: bigWalls,
			nopath: "",
			ranAlgorithm: false
		};

		// Initialize important methods
		this.addWall = this.addWall.bind(this);
		this.handleRun = this.handleRun.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.breadthAndDepthFirstSearch = this.breadthAndDepthFirstSearch.bind(this);
		this.findChildrenMoves = this.findChildrenMoves.bind(this);
	}

	/* 
		Find the next possible moves given a certain position.

			- rows: Integer value of rows in the maze
			- columns: Integer value of columns in the maze
			- currentPosition: Current position as an object with properties (row, column)
	*/
	findChildrenMoves(rows, columns, currentPosition) {
		let childrenPositions = [];

		// Top move
		if (currentPosition.row-1 >= 0) {
			let children = {
				row: currentPosition.row-1,
				column: currentPosition.column,
				direction: "up"
			}
			childrenPositions.push(children);
		}
			
		// Right move
		if (currentPosition.column+1 <= columns-1) {
			let children = {
				row: currentPosition.row,
				column: currentPosition.column+1,
				direction: "right"
			}
			childrenPositions.push(children);
		}
			
		// Down move
		if (currentPosition.row+1 <= rows-1) {
			let children = {
				row: currentPosition.row+1,
				column: currentPosition.column,
				direction: "down"
			}
			childrenPositions.push(children);
		}
			
		// Left move
		if (currentPosition.column-1 >= 0) {
			let children = {
				row: currentPosition.row,
				column: currentPosition.column-1,
				direction: "left"
			}
			childrenPositions.push(children);
		}
		return childrenPositions;
	}

	/* 
		Breadth-first or Depth-first Search Algorithm

			- rows: Integer value of number of rows
			- columns: Integer value of number of columns
			- start: Start State as an object with row and column
			- end: Goal State as an object with row and column
			- walls: Set containing the wall positions chosen by the user as objects with 
				properties (row, column)
			- algoType: String that indicates breadth-first or depth-first
	*/
	breadthAndDepthFirstSearch(rows, columns, start, end, walls, algoType) {
		let queue = [];
		let path = [];
		let visited = new Set();
		let fillDelay = 100;

		// // If start state is the goal state
		// if (start.row === end.row && start.column === end.column) {
		// 	return path;
		// }

		/*
			Queue Element Structure
				Tuple:
					tuple[0] -> object with a row and column
					tuple[1] -> path reaching up to that point (an array of positions)
		*/
		
		// Add start state to the queue
		queue.push([start, path]);

		while (queue.length) {
			// Pop the top of the queue
			let parent = queue.shift();

			// If we are at the end, return the path
			// Else, continue adding to the queue, finding children moves, etc
			if (parent[0].row === end.row && parent[0].column === end.column) {
				parent[1].push(end);

				let pathCounter = 1;

				// Fill in the goal path at the end
				for (let i=0; i<parent[1].length; i++) {
					if (i === 0 || i === parent[1].length-1) {
						continue;
					}
					else {
						setTimeout(
							function() {
								document.getElementById(parent[1][i].row + "_" + parent[1][i].column).className += " end-path-fill";
							},
							fillDelay
						);

						// if (parent[1][i].direction === "up") {
						// 	setTimeout(
						// 		function() {
						// 			document.getElementById(parent[1][i].row + "_" + parent[1][i].column).innerText = "^";
						// 		},
						// 		fillDelay + ((parent[1].length) * 100)
						// 	)	
						// }
						// else if (parent[1][i].direction === "down") {
						// 	setTimeout(
						// 		function() {
						// 			document.getElementById(parent[1][i].row + "_" + parent[1][i].column).innerText = "v";
						// 		},
						// 		fillDelay + ((parent[1].length) * 100)
						// 	)	
						// }
						// else if (parent[1][i].direction === "left") {
						// 	setTimeout(
						// 		function() {
						// 			document.getElementById(parent[1][i].row + "_" + parent[1][i].column).innerText = "<";
						// 		},
						// 		fillDelay + ((parent[1].length) * 100)
						// 	)	
						// }
						// else if (parent[1][i].direction === "right") {
						// 	setTimeout(
						// 		function() {
						// 			document.getElementById(parent[1][i].row + "_" + parent[1][i].column).innerText = ">";
						// 		},
						// 		fillDelay + ((parent[1].length) * 100)
						// 	)	
						// }
						// else {
						// 	continue;
						// }
						fillDelay += 100;
					}
				}
				return parent[1];
			}
			else {
				let foundVisited = false;
				let foundWall = false;

				// Check that the current position is not a wall
				if (walls.has(parent[0].row.toString() + "_" + parent[0].column.toString())) {
					foundWall = true;
				}

				// Check that the position has not been already visited
				if (visited.has(parent[0].row.toString() + "_" + parent[0].column.toString())) {
					foundVisited = true;
				}
			
				// If current position is a wall or is already visited, continue
				// Else, find children and add to queue, add curren position to visited
				if(foundVisited || foundWall) {
					continue;
				}
				else {

					let children = this.findChildrenMoves(rows, columns, parent[0]);
					for (let i=0; i<children.length; i++) {
						let newPath = JSON.parse(JSON.stringify(parent[1]));
						newPath.push(parent[0]);

						if (algoType === "BreadthFirstSearch") {
							queue.push([children[i], newPath]);
						}
						else {
							queue.unshift([children[i], newPath]);
						}

						let childWall = false;
						let childVisited = false;
						let childGoal = false;

						// Check that the child position is not a wall
						if (walls.has(children[i].row.toString() + "_" + children[i].column.toString())) {
							childWall = true;
						}
		
						// Check that the child position has not been already visited
						if (visited.has(children[i].row.toString() + "_" + children[i].column.toString())) {
							childVisited = true;
						}

						// Check that the child position is not the goal state
						if (children[i].row === end.row && children[i].column === end.column) {
							childGoal = true;
						}

						// If child position is not a wall, visited, or goal, color it in
						if (!childWall && !childVisited && !childGoal) {
							setTimeout(
								function() {
									document.getElementById(children[i].row.toString() + "_" + children[i].column.toString()).className += " board-fill";
								},
								fillDelay
							);
							fillDelay += 100;
						}
					}

					// Add current position to visited
					visited.add(parent[0].row.toString() + "_" + parent[0].column.toString());
				}
			}
		}

		// If we reach here, it means that there are no possible paths to the goal
		return null;
	}

	// Add a wall to the board
	// If algorithm has already been run, you can't interact with the board again
	addWall(event) {
		if (!this.state.ranAlgorithm) {
			let addingWall;

			// Show that the user clicked on a wall
			if (document.getElementById(event.target.id).className.includes("wall-fill")) {
				document.getElementById(event.target.id).className = "columns regular board-padding";
				addingWall = false;
			}
			else {
				document.getElementById(event.target.id).className += " wall-fill";
				addingWall = true;
			}

			// ID of each grid box is in the form "row_column"
			let gridIndices = event.target.id.split("_");

			// Update the maze so that a box has become a wall
			let moreWalls = this.state.walls;
			
			let newWall = gridIndices[0].toString() + "_" + gridIndices[1].toString();
			if (addingWall) {
				// Add wall to the set
				moreWalls.add(newWall);
			}
			else {
				// Remove wall from the set
				moreWalls.delete(newWall);
			}

			// Update Set of walls
			this.setState({walls: moreWalls});
		}
	}

	// Run the path finding algorithm
	// If algorithm has already been run, you can't run the board again
	handleRun(event) {
		event.preventDefault();

		let path = null;
		if (!this.state.ranAlgorithm) {
			if (this.props.algorithm === "BreadthFirstSearch") {
				path = this.breadthAndDepthFirstSearch(this.props.rows, this.props.columns, this.state.start, this.state.goal, this.state.walls, "BreadthFirstSearch");
			}
			else if (this.props.algorithm === "DepthFirstSearch") {
				path = this.breadthAndDepthFirstSearch(this.props.rows, this.props.columns, this.state.start, this.state.goal, this.state.walls, "DepthFirstSearch");
			}
			else if (this.props.algorithm === "DijkstraAlgorithm") {
				/*
					TODO: THIS IS DOING BREADTH FIRST SEARCH
				*/
				let path = this.breadthFirstSearch(this.props.rows, this.props.columns, this.state.start, this.state.goal, this.state.walls);
			}
			else if (this.props.algorithm === "AStarAlgorithm") {
				/*
					TODO: THIS IS DOING BREADTH FIRST SEARCH
				*/
				let path = this.breadthFirstSearch(this.props.rows, this.props.columns, this.state.start, this.state.goal, this.state.walls);
			}

			if (path === null) {
				this.setState({nopath: "Could not find a path."});
			}

			this.setState({ranAlgorithm: true});
		}
	}

	// Reset the board
	handleReset(event) {
		event.preventDefault();

		this.setState({walls: new Set()});
		this.setState({nopath: ""});

		let board = document.getElementsByClassName("columns");
		for (let i=0; i<board.length; i++) {
			if (board[i].className.includes("start")) {
				board[i].className = "columns start text-center";
			}
			else if (board[i].className.includes("goal")) {
				board[i].className = "columns goal text-center";
			}
			else {
				board[i].className = "columns regular board-padding";
				board[i].style.backgroundColor = "white";
			}
		}

		this.setState({ranAlgorithm: false});
	}
	
	render() {
		// Create a grid for the user to choose walls for
		const field = [];
		
		// Check if no path can be found
		const noPath = this.state.nopath;

		for (let i=0; i<this.props.rows; i++) {
			let cells = [];
			for (let j=0; j<this.props.columns; j++) {
				if(i === this.props.rows-1 && j === 0) { // Start
					cells.push(<td key={j} id={i.toString() + "_" + j.toString()} className="columns start text-center">S</td>)
				}
				else if (i === 0 && j === this.props.columns-1) { // Goal
					cells.push(<td key={j} id={i.toString() + "_" + j.toString()} className="columns goal text-center">G</td>);
				}
				else {
					cells.push(<td key={j} id={i.toString() + "_" + j.toString()} className="columns regular board-padding" onClick={this.addWall}></td>);
				}
			}
			field.push(<tr key={i} className="rows">{cells}</tr>);
		}
		
		return (
			<div className="board-area">
				<div className="container">
					<h4 id="board-title" className="text-center mb-4">Please click on the boxes in order to choose the walls of the maze!</h4>
					<table id="board" className="d-flex justify-content-center mb-4">
						<tbody>
							{field}
						</tbody>
					</table>
					<div className="d-flex justify-content-center">
						<form onSubmit={this.handleRun}>
							<input type="submit" className="btn btn-primary mr-2" value="Run"/>
						</form>
						<form onSubmit={this.handleReset}>
							<input type="submit" className="btn btn-primary ml-2" value="Reset"/>
						</form>
					</div>
					{noPath && <div className="no-path d-flex justify-content-center">{noPath}</div>}
				</div>
			</div>
		);
	}
}

export default Maze;