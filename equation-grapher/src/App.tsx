import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

const EquationSolver = () => {
  const [equation, setEquation] = useState('');
  const [graphData, setGraphData] = useState({ x: [], y: [] });

  const solveEquation = () => {
    try {
      const expression = math.compile(equation);
      const xValues = math.range(-10, 10, 0.1).toArray();
      const yValues = xValues.map(x => expression.evaluate({ x }));
      setGraphData({ x: xValues, y: yValues });
    } catch (error) {
      console.error('Error solving equation:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter equation (e.g., x^2 + 3x - 2)"
        value={equation}
        onChange={e => setEquation(e.target.value)}
      />
      <button onClick={solveEquation}>Solve</button>
      <Plot
        data={[{ x: graphData.x, y: graphData.y, type: 'scatter', mode: 'lines' }]}
        layout={{ width: 800, height: 400, title: 'Graph' }}
      />
    </div>
  );
};

export default EquationSolver;
