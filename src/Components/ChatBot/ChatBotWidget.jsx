import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatBotWidget = () => {
    const senderId = 'user123'; // Replace with dynamic user ID if needed
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Fetch messages on component mount
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:8082/api/chat/getbysenderid?SenderId=${senderId}`);
            const list = res.data.responseData.MessageList;
            setMessages(list.reverse()); // Show oldest messages at top
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {
            // Adjust URL and payload as per your actual POST API
            await axios.post(`http://localhost:8082/api/chat/sendmessageai`, {
                senderId,
                userQuestion: newMessage
            });

            setNewMessage('');
            fetchMessages(); // Reload messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="w-80 h-[32rem] bg-white border shadow-lg rounded-lg fixed bottom-20 right-5 z-50 flex flex-col">
            <div className="p-3 bg-blue-500 text-white font-bold text-center rounded-t-lg">
                ChatBot
            </div>

            {/* Message List */}
            <div className="flex-1 p-3 overflow-y-auto bg-gray-400">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-4">
                        <div className="text-right">
                            <p className="bg-blue-100 inline-block p-2 rounded-lg max-w-xs">
                                {msg.userQuestion}
                            </p>
                        </div>
                        <div className="text-left mt-1">
                            <p className="bg-green-100 inline-block p-2 rounded-lg max-w-xs">
                                {msg.answerByAI}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="p-2 border-t flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 border rounded px-2 py-1"
                />
                <button
                    onClick={handleSend}
                    className="btn btn-sm btn-primary"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBotWidget;
