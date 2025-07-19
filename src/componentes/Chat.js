import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './Chat.css';

export default function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const stompClient = useRef(null);
    const token = localStorage.getItem('google_token');

    useEffect(() => {
        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClient.current.subscribe('/topic/chat', (message) => {
                    const msg = JSON.parse(message.body);
                    setMessages((prev) => [...prev, msg]);
                });
            },
        });

        stompClient.current.activate();

        return () => {
            if (stompClient.current) stompClient.current.deactivate();
        };
    }, []);

    const sendMessage = () => {
        if (stompClient.current && stompClient.current.connected && input.trim() !== '') {
            const message = { user: user.name, content: input };
            stompClient.current.publish({
                destination: '/app/chat',
                body: JSON.stringify(message),
            });
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <div style={{ padding: '12px 16px', background: '#00cbc8', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                Chat
            </div>
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className="chat-message">
                        <strong>{msg.user}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    );
}
