import React from 'react';
import ReactDOM from "react-dom";
import EditBand from '../Band/EditBand';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: () => ({
      id: 1
    })
  }));

it('Edit band page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditBand />, div);
});
