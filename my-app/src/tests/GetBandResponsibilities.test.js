import React from 'react';
import ReactDOM from "react-dom";
import GetBandResponsibilities from "./Band/GetBandResponsibilities";

it('Band responsibility View renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GetBandResponsibilities />, div);
});
