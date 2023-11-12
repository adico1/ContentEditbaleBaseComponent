import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ContentEditable from './content-editable-react';
import '@testing-library/jest-dom'

describe('ContentEditable React Adapter Integration', () => {
  it('renders within a React application', () => {
    const onChangeHandler = jest.fn()
    
    render(<ContentEditable value="Initial content" onChange={onChangeHandler} />);

    const contentEditableElement = screen.getByRole('textbox');
    expect(contentEditableElement).toHaveTextContent('Initial content');
  });
})