import React from 'react';
import ReactDOM from "react-dom";
import CapabilityPerJobFamily from '../Capability/CapabilityPerJobFamily.js';

it('CapabilityPerJobFamily page can load without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CapabilityPerJobFamily />, div);
});
