import React from 'react';
import Error from "../Error/Error";
import Chart from "../../containers/Chart/Chart";
import './App.css';

const App = () => {
  return (
    <Error>
      <Chart
        margins={{top: 50, right: 20, bottom: 100, left: 60 }}

       />
    </Error>
  );
};

export default App;