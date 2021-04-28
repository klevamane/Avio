import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};
	return (
		<Form inline onSubmit={submitHandler}>
			<Form.Control
				type='text'
				name='qry'
				onChange={(e) => setKeyword(e.target.value)}
				className='mr-sm-2 mr-lg-3'
				placeholder='Search...'
			></Form.Control>
			<Button type='submit' variant='outline-success'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
