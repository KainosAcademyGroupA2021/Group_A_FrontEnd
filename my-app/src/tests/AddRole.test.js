import React from 'react';
import ReactDOM from "react-dom";
import AddRole from '../Role/AddRole';

it('Add role page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddRole />, div);
});
