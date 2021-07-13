import React from 'react';
import ReactDOM from "react-dom";
import EditRole from '../Role/EditRole';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: () => ({
      id: 1
    })
  }));

it('Edit role page renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditRole />, div);
});
