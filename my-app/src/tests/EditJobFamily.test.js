import React from 'react';
import ReactDOM from "react-dom";
import EditJobFamily from '../JobFamily/EditJobFamily';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: () => ({
      id: 1
    })
  }));

it('Edit JobFamily page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditJobFamily />, div);
});
