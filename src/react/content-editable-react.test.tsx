import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ContentEditable } from './ContentEditable'; // Adjust the import based on your actual file structure

describe('ContentEditable React Adapter Integration', () => {
  it('renders within a React application', () => {
    render(<ContentEditable value="Initial content" onChange={() => {}} />);

    const contentEditableElement = screen.getByRole('textbox');
    expect(contentEditableElement).toHaveTextContent('Initial content');
  });
})