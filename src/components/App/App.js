import React, { Component } from 'react';
import Error from "../Error/Error";
import Zoom from "../Zoom/Zoom";
import Scale from "../Scale/Scale";
import Chart from "../../containers/Chart/Chart";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { scale: 5000 };
  }
  changeScale(zoomIn) {
    this.setState(state => {
      const scale = zoomIn ? this.state.scale + 500 : this.state.scale - 500;
      return { ...state, scale };
    });
  }
  render() {
    return (
      <Error>
        <Zoom
          zoomIn={this.changeScale.bind(this, true)}
          zoomOut={this.changeScale.bind(this, false)}
        />
        <Chart
          scale={this.state.scale}
          margins={{ top: 50, right: 20, bottom: 100, left: 60 }}
        />
        <Scale scale={this.state.scale} />
      </Error>
    );
  }
}

export default App;