import React from 'react';

const Message = ({message, color}) => {
    return message 
        ? 
        <div className={`alert alert-${color}`} role="alert">
          {message}
        </div> 
        : 
        '';
}
 
export default Message;