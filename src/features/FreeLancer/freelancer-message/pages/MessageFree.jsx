import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import { useParams } from "react-router-dom";

import {
  getMyConversations,
  getMessages,
  startFreelancerConversation,
  GetNomberOfMesseageNotRead,
} from "../../../FreeLancer/freelancer-message/services/freelancer-messages";

import "../../../FreeLancer/freelancer-message/styles/MessageFree.css";
import socket from "../../../FreeLancer/freelancer-message/pages/socket";
import EmojiPicker from "emoji-picker-react";

export default function MessageFree() {
  const cookies = Cookies();

  const [showEmoji, setShowEmoji] = useState(false);
  const [myId, setMyId] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const [selectedClientName, setSelectedClientName] = useState("");

  const [text, setText] = useState("");

  const selectedConversationRef = useRef(null);
  const createdRef = useRef(false);

  const { clientId } = useParams();

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  // =========================================================
  // Create conversation when clientId exists in URL
  // =========================================================
  useEffect(() => {
    if (!clientId || createdRef.current) return;
    createdRef.current = true;
    createConversation(clientId);
  }, [clientId]);

  // =========================================================
  // Socket
  // =========================================================
  useEffect(() => {
    getConversations();

    // =========================================================
    // POLLING: Refresh conversations every 10 seconds
    // =========================================================
    const interval = setInterval(() => {
      getConversations();
    }, 10000);

    socket.on("joined_status", (data) => {
      console.log("Joined:", data);
    });

    socket.on("left_status", (data) => {
      console.log("Left:", data);
    });

    // =========================
    // Receive Message
    // =========================
    socket.on("receive_message", (message) => {
      console.log("New Message:", message);

      setMessages((prev) => {
        const existsById = prev.some((msg) => msg.id === message.id);
        if (existsById) return prev;

        const isDuplicate = prev.some(
          (msg) =>
            msg.content === message.content &&
            msg.senderId === message.senderId &&
            msg.conversationId === message.conversationId &&
            msg.id > 1e12
        );

        if (isDuplicate) return prev;

        return [...prev, message];
      });

      if (selectedConversationRef.current !== message.conversationId) {
        setConversations((prev) =>
          prev.map((chat) =>
            chat.conversationsId === message.conversationId
              ? { ...chat, unread: (chat.unread || 0) + 1 }
              : chat
          )
        );
      }

      if (selectedConversationRef.current === message.conversationId) {
        socket.emit("mark_as_read", {
          messageId: message.id,
          conversationId: message.conversationId,
        });
      }
    });

    // =========================
    // All messages read
    // =========================
    socket.on("all_messages_read_confirm", (data) => {
      console.log("All messages read:", data);

      setMessages((prev) =>
        prev.map((msg) => ({ ...msg, isRead: true }))
      );

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.conversationsId === data.conversationId
            ? { ...conversation, unread: 0 }
            : conversation
        )
      );
    });

    // =========================
    // One message read
    // =========================
    socket.on("message_read_confirm", (message) => {
      console.log("Message read:", message);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, isRead: true } : msg
        )
      );
    });

    // =========================
    // Cleanup
    // =========================
    return () => {
      clearInterval(interval);
      socket.off("joined_status");
      socket.off("left_status");
      socket.off("receive_message");
      socket.off("all_messages_read_confirm");
      socket.off("message_read_confirm");
    };
  }, []);

  // =========================================================
  // GET NUMBER OF UNREAD MESSAGES
  // =========================================================
  async function getUnreadMessages(conversationId) {
    try {
      const token = cookies.get("token-freelancer");

      if (!conversationId) return 0;

      const url = `${baseURL}${GetNomberOfMesseageNotRead}${conversationId}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.number || 0;
    } catch (err) {
      return 0;
    }
  }

  // =========================================================
  // CREATE CONVERSATION
  // =========================================================
  async function createConversation(clientId) {
    try {
      const token = cookies.get("token-freelancer");

      const res = await axios.post(
        `${baseURL}${startFreelancerConversation}${clientId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newConversation = res.data.conversation;
      if (!newConversation) return;

      setConversations((prev) => [
        ...prev.filter(
          (c) => c.conversationsId !== newConversation.conversationsId
        ),
        newConversation,
      ]);

      await handleGetMessages(
        newConversation.conversationsId,
        newConversation
      );
    } catch (err) {
      console.log(
        "Create conversation error:",
        err.response?.data || err
      );
    }
  }

  // =========================================================
  // GET MY CONVERSATIONS
  // =========================================================
  async function getConversations() {
    try {
      const token = cookies.get("token-freelancer");

      const res = await axios.get(`${baseURL}${getMyConversations}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const conversationsWithUnread = await Promise.all(
        res.data.conversations.map(async (conv) => {
          const unread = await getUnreadMessages(conv.conversationsId);
          return { ...conv, unread };
        })
      );

      setConversations(conversationsWithUnread);

      // =====================================================
      // Auto-join all conversation socket rooms
      // =====================================================
      conversationsWithUnread.forEach((conv) => {
        socket.emit("join_conversation", conv.conversationsId);
      });
    } catch (err) {
      console.log(
        "Get conversations error:",
        err.response?.data || err
      );
    }
  }

  // =========================================================
  // GET MESSAGES
  // =========================================================
  async function handleGetMessages(conversationId, conversationData = null) {
    try {
      if (!conversationId) return;

      // Leave previous conversation
      if (selectedConversationRef.current) {
        socket.emit("leave_conversation", selectedConversationRef.current);
      }

      const token = cookies.get("token-freelancer");

      const res = await axios.get(
        `${baseURL}${getMessages}${conversationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Set selected conversation
      setSelectedConversation(conversationId);
      selectedConversationRef.current = conversationId;

      // Get selected client's name and myId
      const conversation =
        conversationData ||
        conversations.find((c) => c.conversationsId === conversationId);

      if (conversation) {
        setSelectedClientName(conversation.client_name || "");
        setMyId(conversation.freelancerId);
      }

      // =====================================================
      // Set messages (merge with pending local messages)
      // =====================================================
      setMessages((prev) => {
        const apiMessages = res.data.messages || [];
        const pending = prev.filter(
          (msg) =>
            msg.id > 1e12 &&
            msg.conversationId === conversationId &&
            !apiMessages.some(
              (am) =>
                am.content === msg.content &&
                am.senderId === msg.senderId
            )
        );
        return [...apiMessages, ...pending];
      });

      // Join socket room
      socket.emit("join_conversation", conversationId);

      // Mark all messages as read
      socket.emit("mark_all_as_read", { conversationId });

      // Reset unread
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.conversationsId === conversationId
            ? { ...conversation, unread: 0 }
            : conversation
        )
      );
    } catch (err) {
      console.log("Get messages error:", err.response?.data || err);
    }
  }

  // =========================================================
  // SEND MESSAGE
  // =========================================================
  function sendMessage() {
    if (!selectedConversation) {
      alert("Select conversation first");
      return;
    }

    if (text.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      content: text,
      senderId: myId,
      conversationId: selectedConversation,
      isRead: false,
    };

    // Show immediately (sender sees own message)
    setMessages((prev) => [...prev, newMessage]);

    // Send via socket
    socket.emit("send_message", {
      conversationId: selectedConversation,
      content: text,
    });

    setText("");
  }

  // =========================================================
  // UI
  // =========================================================
  function getFirstLetter(name) {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  }

  return (
    <div className="messages-page">
      <h1>Messages</h1>
      <p>Your inbox and client conversations</p>

      <div className="chat-container">
        {/* SIDEBAR */}
        <div className="sidebarr">
          <input className="search" placeholder="Search messages..." />

          {conversations.map((chat) => (
            <div
              key={chat.conversationsId}
              className={`chat-item ${
                selectedConversation === chat.conversationsId ? "active" : ""
              }`}
              onClick={() => handleGetMessages(chat.conversationsId)}
            >
              <div className="avatar green">
                {getFirstLetter(chat.client_name)}
              </div>

              <div className="chat-info">
                <h4>{chat.client_name}</h4>
              </div>

              <div className="chat-right">
                {chat.unread > 0 && (
                  <span className="unread-badge">{chat.unread}</span>
                )}
              </div>

              <span>
                {chat.updatedAt
                  ? new Date(chat.updatedAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          ))}
        </div>

        {/* CHAT SECTION */}
        <div className="chat-section">
          <div className="chat-header">
            <div className="avatar green">
              {getFirstLetter(selectedClientName)}
            </div>

            <div>
              <h3>
                {selectedConversation
                  ? selectedClientName
                  : "Select Conversation"}
              </h3>
              <p>
                {selectedConversation
                  ? "Messages"
                  : "Choose a conversation from the left"}
              </p>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="chat-body">
            {messages.length === 0 ? (
              <p>No messages</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.senderId === myId
                      ? "message my-message"
                      : "message other-message"
                  }
                >
                  <div>{msg.content}</div>

                  {msg.senderId === myId && (
                    <small>
                      <div className="message-status">
                        {msg.isRead ? "Read" : "Sent"}
                      </div>
                    </small>
                  )}
                </div>
              ))
            )}
          </div>

          {/* INPUT */}
          <div className="chat-input">
            <button onClick={() => setShowEmoji(!showEmoji)}>
             😊
            </button>

            {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}

            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your reply..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>  ➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}
