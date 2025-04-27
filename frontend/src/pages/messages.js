import React, { useState, useEffect } from "react";



export default function Messages() {
  const [text, setText] = useState("");
  const senderId = "user1";  // Hardcoded for now (you can replace with real userId later)
  const receiverId = "user2";  // Hardcoded for now

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert('Please enter a message');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId, receiverId, text })
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      console.log('Message sent!', result);
      setText("");  // Clear input after send

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSendMessage} className="w-full max-w-md space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none resize-none h-32"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}