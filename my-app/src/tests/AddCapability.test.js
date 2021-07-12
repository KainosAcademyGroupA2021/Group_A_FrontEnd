import React from 'react';
import ReactDOM from "react-dom";
import AddCapability from '../Capability/AddCapability';

it('Add Capability page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCapability />, div);
});