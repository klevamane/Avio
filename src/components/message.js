import { Alert } from 'react-bootstrap';
import React from 'react';

const Message = ({ newbaby, variant, children }) => {
  console.log('WHAT IS CLOSEd -> ', newbaby);
  console.log('WHAT IS variant -> ', variant);
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
