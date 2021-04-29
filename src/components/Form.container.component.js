import { Col, Container, Row } from 'react-bootstrap';

import React from 'react';

export const FormContainer = ({ children }) => {
	return (
		<Container>
			<Row>
				<Col xs={12} md={6} className='justify-content-md-center'>
					{children}
				</Col>
			</Row>
		</Container>
	);
};
