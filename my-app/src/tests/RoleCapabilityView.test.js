import React from 'react';
import ReactDOM from "react-dom";
import RoleCapabilityView from '../Role/RoleCapabilityView';

it('Role Capability View renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RoleCapabilityView />, div);
});
