import React from 'react';
import ReactDOM from "react-dom";
import GetTrainingBand from '../Band/GetTrainingBand.js';


it('Get view GetTraingBand without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GetTrainingBand />, div);
});
