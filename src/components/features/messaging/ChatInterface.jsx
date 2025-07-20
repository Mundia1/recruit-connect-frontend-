import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../ui/Card';
import MessageItem from './MessageItem';

const ChatInterface = ({ messages, onSendMessage, currentUser }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-[var(--spacing-md)] space-y-[var(--spacing-md)]">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} currentUser={currentUser} />
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-[var(--spacing-md)]">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-[var(--spacing-md)]">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

ChatInterface.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    sender: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  })).isRequired,
  onSendMessage: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default ChatInterface;
