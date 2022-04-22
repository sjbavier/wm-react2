import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App /> in <Router> context', () => {
  it('renders without crashing, and displays logo', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByAltText(/Webmane Logo/i)).toBeInTheDocument();  
  })
})