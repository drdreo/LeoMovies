import React from 'react';
import { render } from '@testing-library/react';
import { Search } from './Search';


test('renders greeting', () => {
	const {getByText} = render(<Search/>);
	const navElement = getByText(/Welcome/i);
	expect(navElement).toBeInTheDocument();
});


test('renders input', () => {
	const {getByPlaceholderText} = render(<Search/>);
	const input = getByPlaceholderText(/Search movies/i);
	expect(input).toBeInTheDocument();
});
