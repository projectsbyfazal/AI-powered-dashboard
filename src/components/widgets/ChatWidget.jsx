"use client";

import { useEffect, useRef, useState } from "react";
import WidgetCard from "../dashboard/WidgetCard";
import axios from "axios";
import { HiOutlineRefresh } from "react-icons/hi";

const ChatWidget = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState("");
    const chatsRef = useRef(null);

    const scrollToBottom = () => {
        chatsRef.current?.scrollTo({
            top: chatsRef.current.scrollHeight,
            behavior: "instant",
        });
    };

    useEffect(() => {
        if (localStorage.getItem("chats")) {
            const hasChats = JSON.parse(localStorage.getItem("chats"))
            setMessages((Array.isArray(hasChats) && hasChats?.length > 0) ? hasChats : [
                { type: "ai", text: "Hi! How can I help you today?" }
            ])
            setTimeout(scrollToBottom, 500)
        } else {
            setMessages([
                { type: "ai", text: "Hi! How can I help you today?" }
            ]);
        }
    }, [])

    const handleSend = async () => {
        if (!input.trim()) return;
        try {
            setLoading(true)
            const userMsg = { type: "user", text: input };
            setMessages((prev) => [...prev, userMsg]);
            setInput("");
            setTimeout(scrollToBottom, 500)

            const { data } = await axios.post("/api/chat", { message: input, chats: messages });

            if (data?.reply) {
                setMessages((prev) => {
                    const updatedMsgs = [
                        ...prev,
                        { type: "ai", text: data.reply || "Sorry! service is temporary unavailable." }
                    ];

                    localStorage.setItem("chats", JSON.stringify(updatedMsgs));

                    return updatedMsgs;
                });
                setTimeout(scrollToBottom, 500);
            }
        } catch (error) {
            console.log(error)
            setMessages((prev) => {
                const updatedMsgs = [
                    ...prev,
                    { type: "ai", text: error.response?.data?.reply || "Sorry! service is temporary unavailable." }
                ];

                return updatedMsgs;
            });
        } finally {
            setLoading(false)
        }
    };

    const resetChats = () => {
        localStorage.removeItem("chats")
        setMessages([
            { type: "ai", text: "Hi! How can I help you today?" }
        ]);
    }

    return (
        <WidgetCard title="AI Assistant">
            <div className="w-full bg-white rounded-xl flex flex-col border border-gray-200 overflow-hidden">
                {
                    messages.length > 1 ?
                        <button onClick={resetChats} className="bg-gray-200 cursor-pointer flex items-center justify-center py-1 text-sm">
                            <HiOutlineRefresh className="me-2" /> Clear chat history
                        </button> : null
                }

                <div ref={chatsRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-3" style={{ maxHeight: '320px', scrollbarWidth: 'thin' }}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm leading-relaxed shadow-sm
                                    ${msg.type === "user"
                                        ? "bg-indigo-500 text-white rounded-br-none"
                                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && <span className="text-gray-600 text-sm"> AI - typing...</span>}
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                }} className="border-t border-gray-200 p-3 flex items-center gap-2 bg-white">
                    <input
                        type="text"
                        placeholder="Ask something..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        disabled={!input}
                        className="bg-indigo-500 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition"
                    >
                        Send
                    </button>
                </form>

            </div>
        </WidgetCard>
    );
};

export default ChatWidget;