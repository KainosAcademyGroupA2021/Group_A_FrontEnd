import React from 'react';
import ReactDOM from "react-dom";
import CapabilityLead from '../Capability/CapabilityLead.js';

it('CapabilityLead page can load without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CapabilityLead />, div);
});