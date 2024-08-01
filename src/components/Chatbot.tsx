// src/components/Chatbot.tsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import "../assets/css/Chatbot.css"; // Add your styles

const Chatbot: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
      // Here you can add the chatbot response logic
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        className="chatbot-button"
      >
        Chat with us
      </Button>
      <Modal
        title="Chat with BookBazaar"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={400}
        className="chatbot-modal"
      >
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">
                {msg}
              </div>
            ))}
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Type a message..."
          />
          <Button
            type="primary"
            onClick={handleSend}
            className="chat-send-button"
          >
            Send
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Chatbot;
