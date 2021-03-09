import React from 'react';
import Configuration from './Configurations';
import './App.css';
//import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Pathfinder Visualizer
          </p>
          <Configuration />
        </header>
      </div>
    );
  }
}

export default App;
