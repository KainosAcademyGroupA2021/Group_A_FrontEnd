import React from 'react';
import ReactDOM from "react-dom";
import GetBandCompetencies from '../Band/GetBandCompetencies';

it('Band Competencies View renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GetBandCompetencies />, div);
});