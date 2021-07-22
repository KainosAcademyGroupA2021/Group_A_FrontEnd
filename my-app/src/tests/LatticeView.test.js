import React from 'react';
import ReactDOM from "react-dom";
import LatticeView from '../Role/LatticeView';

it('Lattice View renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LatticeView />, div);
});
