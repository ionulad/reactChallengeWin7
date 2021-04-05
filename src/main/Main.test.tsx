import React from 'react';
import {render, screen} from '@testing-library/react';
import Main from './Main';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

test('Testing Header is Present', () => {
    render(<Main/>);
    const headerElement = screen.getByText(/Weather App/i);
    expect(headerElement).toBeInTheDocument();
});

//https://github.com/ant-design/ant-design/issues/27658