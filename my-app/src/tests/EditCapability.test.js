import React from 'react';
import ReactDOM from "react-dom";
import EditCapability from '../Capability/EditCapability';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: () => ({
      id: 1
    })
  }));

it('Edit Capability page renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditCapability />, div);
});