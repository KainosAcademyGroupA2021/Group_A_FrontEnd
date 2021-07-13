import React from 'react';
import ReactDOM from "react-dom";
import GetCapability from '../Capability/GetCapability';

it('Get Capability page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GetCapability />, div);
});