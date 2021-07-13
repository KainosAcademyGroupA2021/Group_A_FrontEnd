import React from 'react';
import ReactDOM from "react-dom";
import EditRole from '../Role/EditRole';

it('Edit role page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditRole />, div);
});
