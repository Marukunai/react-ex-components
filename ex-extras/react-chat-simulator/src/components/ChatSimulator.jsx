import React, { useReducer, useState, useRef, useEffect } from 'react';
import { chatReducer, initialMessages } from '../reducer/chatReducer';

const CURRENT_USER = 'Usuari Actual';

function ChatSimulator() {
    // 1. useReducer per a la llista de missatges
    const [messages, dispatch] = useReducer(chatReducer, initialMessages);
    
    // 2. useState per a l'input del missatge
    const [input, setInput] = useState('');
    
    // 3. useRef per enfocar l'input i mantenir el scroll
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null); // Ref per al final de la llista (scroll)

    // 4. useEffect: Per al focus inicial i el scroll
    useEffect(() => {
        // Focus automàtic a l'input al muntatge
        inputRef.current.focus(); 
        
        // Desplaçament automàtic a l'últim missatge
        scrollToBottom();
    }, [messages]); // Cada cop que 'messages' canvia, tornem a fer scroll

    const scrollToBottom = () => {
        // Utilitzem la ref de l'element buit al final de la llista
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 5. Dispatch de l'acció amb el text i l'usuari
        dispatch({
            type: 'ADD_MESSAGE',
            payload: { text: input.trim(), user: CURRENT_USER },
        });
        
        // Neteja l'input i el torna a enfocar
        setInput('');
        inputRef.current.focus(); 
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="chat-window">
            
            <div className="messages-list">
                {messages.map(msg => (
                    // 6. Component Missatge
                    <div 
                        key={msg.id} 
                        className={`message-bubble ${msg.user === CURRENT_USER ? 'mine' : 'other'}`}
                    >
                        <div className="message-header">
                            <span className="user-name">{msg.user}</span>
                            <span className="timestamp">{formatTime(msg.timestamp)}</span>
                        </div>
                        <p className="message-text">{msg.text}</p>
                    </div>
                ))}
                
                {/* 7. Element de Referència per al Scroll (useRef) */}
                <div ref={messagesEndRef} /> 
            </div>

            {/* Formulari d'Input */}
            <form onSubmit={handleSend} className="chat-form">
                <input
                    type="text"
                    ref={inputRef} // Passem la ref per focus i lectura
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escriu el teu missatge..."
                    className="message-input"
                />
                <button type="submit" className="btn-send">
                    Enviar 💬
                </button>
            </form>
        </div>
    );
}

export default ChatSimulator;