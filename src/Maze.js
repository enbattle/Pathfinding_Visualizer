import React from 'react';
//import ReactDOM from 'react-dom';

/* Find the next possible moves given a certain position.

	rows: number of rows in the maze
	columns: number of columns in the maze
	currentPosition: current coordinates (x,y)

*/
function findChildrenMoves(rows, columns, currentPosition) {
	var children = [];
	
	// Top move
	if (currentPosition[0]-1 >= 0) {
		children.push(currentPosition[0]-1, currentPosition[1])
	}
		
	// Right move
	if (currentPosition[1]+1 <= columns-1) {
		children.push(currentPosition[0], currentPosition[1]-1)
	}
		
	// Bottom move
	if (currentPosition[0]+1 <= rows-1) {
		children.push(currentPosition[0]+1, currentPosition[1])
	}
		
	// Left move
	if (currentPosition[1]-1 >= 0) {
		children.push(currentPosition[0], currentPosition[1]-1)
	}
	
	return children;
}

function breadthFirstSearch(rows, columns, start, end) {
	var queue = [];
	var visited = [];
	let path = [];
	
	if (start[0] === end[0] && start[1] === end[1]) {
		return path;
	}
	
	queue.push([start, path]);
	
	while (queue) {
		let parent = queue.shift();
		if (parent[0] === end[0] && parent[1] === end[1]) {
			return parent[1];
		}
		else {
			let found = false;
			for (let i=0; i<visited; i++) {
				if(visited[i][0] === parent[0][0] && visited[i][1] === parent[0][1]) {
					found = true;
				}
			}
		
			if(found) {
				continue;
			}
			else {
				let children = findChildrenMoves(rows, columns, parent[0]);
				for (let i=0; i<children; i++) {
					let newPath = JSON.parse(JSON.stringify(parent[1]));
					newPath.push(parent[0]);
					queue.push([children[1], newPath])
				}
				visited.push(parent[0])
			}
		}
	}
}

class Maze extends React.Component {

	constructor(props) {
		super(props);

		/*
			Configuration (Parent) class properties:
				- rows
				- columns
				- algorithm type 
		*/
	}
	
	render() {
		const field = [];
		
		for (let i=0; i<this.props.rows; i++) {
			let cells = [];
			for (let j=0; j<this.props.columns; j++) {
				cells.push(<td key={j} className="columns"></td>);
			}
			field.push(<tr key={i} className="rows">{cells}</tr>);
		}
		
		return (
			<div>
				<table>
					<tbody>
						{field}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Maze;