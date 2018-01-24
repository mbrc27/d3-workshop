import React, { Component } from 'react';
import { getData } from "../../api/data";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  componentDidMount() {
    getData()
      .then((data) => {
        this.setState({ ...this.state, data });
      })
      .catch((error) => this.setState({ ...this.state, error }));
  }
  render() {
    const { data, error } = this.state;
    if (error) {
      console.error(error);
      return (<div>Error! Someting went wrong</div>);
    }
    if (!data) return <div>loading...</div>;
    return (
      <div className="App">
        ok
      </div>
    );
  }
}

export default App;
