import React from 'react';
import ReactDOM from "react-dom";
import AdminRoleView from '../Role/AdminRoleView';

it('Admin Role View renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminRoleView />, div);
});