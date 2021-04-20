import { Alert } from 'react-bootstrap';
import React from 'react';

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} dismissible>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};
export default Message;
