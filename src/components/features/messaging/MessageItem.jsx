import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Card } from '../../ui/Card';

const MessageItem = ({ message, currentUser }) => {
  const isCurrentUser = message.sender === currentUser;

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <Card className={`max-w-[70%] p-[var(--spacing-md)] ${isCurrentUser ? 'bg-[var(--green-primary)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'}`}>
        <p className="text-[var(--text-base)]">{message.text}</p>
        <p className="text-[var(--text-xs)] mt-[var(--spacing-xs)] opacity-75">
          {isCurrentUser ? 'You' : message.sender} - {format(new Date(message.timestamp), 'p')}
        </p>
      </Card>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default MessageItem;
