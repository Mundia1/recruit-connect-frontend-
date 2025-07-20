import React, { useState } from 'react';
import ChatInterface from '../components/features/messaging/ChatInterface';
import DashboardLayout from '../components/layout/DashboardLayout';

const Messages = () => {
  const [messages, setMessages] = useState([
    { sender: 'John Doe', text: 'Hi there! How are you?', timestamp: '2025-07-19T10:00:00Z' },
    { sender: 'Me', text: 'I'm good, thanks! How can I help you?', timestamp: '2025-07-19T10:01:00Z' },
    { sender: 'John Doe', text: 'I have a question about the job application.', timestamp: '2025-07-19T10:02:00Z' },
  ]);

  const currentUser = 'Me'; // This would typically come from authentication context

  const handleSendMessage = (text) => {
    const newMessage = {
      sender: currentUser,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <DashboardLayout>
      <div className="p-[var(--spacing-lg)] h-full flex flex-col">
        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-xl)]">Messages</h1>
        <div className="flex-1">
          <ChatInterface messages={messages} onSendMessage={handleSendMessage} currentUser={currentUser} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
