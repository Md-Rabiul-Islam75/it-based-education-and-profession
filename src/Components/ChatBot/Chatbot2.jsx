import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const senderId = "user123"; // Can be dynamic (e.g., from user login)

const Chatbot2 = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages on load
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/api/chat/getbysenderid?SenderId=${senderId}`
      );
      const fetched = Array.isArray(res.data)
        ? res.data
        : res.data.messages || [];
      setMessages(fetched);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  const handleSend = async () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const messageObj = {
      senderId,
      message: trimmed,
    };

    try {
      // Add user message to UI immediately
      setMessages((prev) => [...prev, { role: "user", message: trimmed }]);
      setNewMessage("");

      const res = await axios.post(
        "http://localhost:8082/api/chat/sendmessageai",
        messageObj
      );

      // Add bot response
      setMessages((prev) => [
        ...prev,
        { role: "bot", message: res.data.message },
      ]);
    } catch (err) {
      console.error("Sending message failed", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-6 p-4 bg-white shadow rounded-xl flex flex-col h-[80vh]">
      <div className="overflow-y-auto grow space-y-3 p-3 border rounded bg-gray-50">
        {Array.isArray(messages) &&
          messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-sm ${
                msg.role === "user"
                  ? "bg-blue-200 self-end"
                  : "bg-gray-300 self-start"
              }`}
            >
              {msg.message}
            </div>
          ))}

        <div ref={messageEndRef} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <textarea
          rows="2"
          className="w-full border rounded px-3 py-2 resize-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot2;
