import React from 'react';
import ReactDOM from "react-dom";
import GetJobRoles from '../Role/GetJobRoles.js';

it('Role Capability View renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GetJobRoles />, div);
});
