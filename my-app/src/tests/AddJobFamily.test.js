import React from 'react';
import ReactDOM from "react-dom";
import AddJobFamily from '../Capability/AddJobFamily.js';

it('AddJobFamily page can load without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddJobFamily />, div);
});
