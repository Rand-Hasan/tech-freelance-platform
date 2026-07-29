
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import {
  getMyConversations,
  getMessages,
} from "../services/MessageClientapi";
import "../../../Client/client- messages/styles/MessageClient.css";
import socket from "./socket";
export default function MessageClient() {
  const cookies = Cookies();

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
const [text, setText] = useState("");
  useEffect(() => {
  getConversations();

  socket.on("joined_status", (data) => {
    console.log(data);
  });

  socket.on("receive_message", (message) => {
    console.log("New Message:", message);

    setMessages((prev) => [...prev, message]);
  });

  return () => {
    socket.off("joined_status");
    socket.off("receive_message");
  };
}, []);
  async function getConversations() {
    try {
      const token = cookies.get("token-client");
console.log(cookies.get("token-client"));
      const res = await axios.get(`${baseURL}${getMyConversations}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Conversations:", res.data);

      setConversations(res.data.conversations || []);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  }

  async function handleGetMessages(conversationId) {
    try {
      const token = cookies.get("token-client");

      const res = await axios.get(
        `${baseURL}${getMessages}${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Messages:", res.data);

      setMessages(res.data.messages || []);
      setSelectedConversation(conversationId);
      socket.emit("join_conversation", conversationId);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  } 
  function sendMessage() {
  if (!selectedConversation) {
    alert("Select conversation first");
    return;
  }

  if (text.trim() === "") return;

  socket.emit("send_message", {
    conversationId: selectedConversation,
    content: text,
  });

  // setMessages((prev) => [
  //   ...prev,
  //   {
  //     id: Date.now(),
  //     content: text,
  //     senderId: "me",
  //   },
  // ]);

  setText("");
}

  return (
    <div className="messages-page">
      <h1>Messages</h1>
      <p>Your inbox and Freelancer conversations</p>

      <div className="chat-container">
        <div className="sidebarr">
          <input
            className="search"
            placeholder="Search messages..."
          />

          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                selectedConversation === chat.id ? "active" : ""
              }`}
              onClick={() => handleGetMessages(chat.id)}
            >
              <div className="avatar green">C</div>

              <div className="chat-info">
                <h4>Conversation #{chat.id}</h4>
            <p>Freelancer ID: {chat.freelancerId}</p>
              </div>

              <span>
                {new Date(chat.updatedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

        <div className="chat-section">
          <div className="chat-header">
            <div className="avatar green">C</div>

            <div>
              <h3>
                {selectedConversation
                  ? `Conversation #${selectedConversation}`
                  : "Select Conversation"}
              </h3>

              <p>
                {selectedConversation
                  ? "Messages"
                  : "Choose a conversation from the left"}
              </p>
            </div>
          </div>

          <div className="chat-body">
            {messages.length === 0 ? (
              <p>No messages</p>
            ) : (
              messages.map((msg) => (
                <div className="message" key={msg.id}>
                  {msg.content}
                </div>
              ))
            )}
          </div>

          <div className="chat-input">
    <input
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Type your reply..."
/>
        <button onClick={sendMessage}>
  ➤
</button>
          </div>
        </div>
      </div>
    </div>
  );
}