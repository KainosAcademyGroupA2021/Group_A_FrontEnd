import React from 'react';
import ReactDOM from "react-dom";
import AddBand from '../Band/AddBand';

it('Add band page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddBand />, div);
});
