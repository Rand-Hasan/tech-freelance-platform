import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { baseURL } from "../../../../services/Api/api";

import {
  getMyConversations,
  getMessages,
  startClientConversation,
  GetNomberOfMesseageNotRead,
} from "../services/MessageClientapi";

import "../../../Client/client- messages/styles/MessageClient.css";
import EmojiPicker from "emoji-picker-react";
import socket from "./socket";

export default function MessageClient() {
  // =========================
  // Router
  // =========================
  const { state } = useLocation();

  const projectId = state?.projectId;

  const navigate = useNavigate();

  const { freelancer_id } = useParams();

  // =========================
  // Cookies
  // =========================
  const cookies = new Cookies();

  // =========================
  // States
  // =========================
  const [myId, setMyId] = useState(null);

  const [conversations, setConversations] = useState([]);

  const [messages, setMessages] = useState([]);

  const [selectedConversation, setSelectedConversation] =
    useState(null);

  // ✅ ADDED
  const [selectedChat, setSelectedChat] = useState(null);

  const [text, setText] = useState("");

  const [showEmoji, setShowEmoji] = useState(false);

  // =========================
  // Refs
  // =========================
  const selectedConversationRef = useRef(null);

  const createdRef = useRef(false);

  // =========================
  // Emoji
  // =========================
  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  // =========================================================
  // GET CONVERSATIONS ON PAGE LOAD
  // =========================================================
  useEffect(() => {
    getConversations();
  }, []);

  // =========================================================
  // CREATE CONVERSATION
  // If freelancer_id exists in URL
  // =========================================================
  useEffect(() => {
    if (!freelancer_id || createdRef.current) {
      return;
    }

    createdRef.current = true;

    createConversation(freelancer_id);
  }, [freelancer_id]);

  // =========================================================
  // SOCKET
  // =========================================================
  useEffect(() => {
    // Get conversations
    getConversations();

    // =========================
    // Joined
    // =========================
    socket.on("joined_status", (data) => {
      console.log("Joined:", data);
    });

    // =========================
    // Left
    // =========================
    socket.on("left_status", (data) => {
      console.log("Left:", data);
    });

    // =========================
    // Receive Message
    // =========================
    socket.on("receive_message", (message) => {
      console.log("New Message:", message);

      // Add message only if it doesn't exist
      setMessages((prev) => {
        const exists = prev.some(
          (msg) => msg.id === message.id
        );

        if (exists) {
          return prev;
        }

        return [...prev, message];
      });

      // =========================
      // Increase unread
      // =========================
      if (
        selectedConversationRef.current !==
        message.conversationId
      ) {
        setConversations((prev) =>
          prev.map((chat) =>
            chat.conversationsId ===
            message.conversationId
              ? {
                  ...chat,
                  unread: (chat.unread || 0) + 1,
                }
              : chat
          )
        );
      }

      // =========================
      // Mark as read if conversation
      // is currently open
      // =========================
      if (
        selectedConversationRef.current ===
        message.conversationId
      ) {
        socket.emit("mark_as_read", {
          messageId: message.id,
          conversationId: message.conversationId,
        });
      }
    });

    // =======================================================
    // ALL MESSAGES READ
    // =======================================================
    socket.on(
      "all_messages_read_confirm",
      (data) => {
        console.log(
          "All messages read:",
          data
        );

        setMessages((prev) =>
          prev.map((msg) => ({
            ...msg,
            isRead: true,
          }))
        );

        setConversations((prev) =>
          prev.map((conversation) =>
            conversation.conversationsId ===
            data.conversationId
              ? {
                  ...conversation,
                  unread: 0,
                }
              : conversation
          )
        );
      }
    );

    // =======================================================
    // ONE MESSAGE READ
    // =======================================================
    socket.on(
      "message_read_confirm",
      (message) => {
        console.log(
          "Message read:",
          message
        );

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id
              ? {
                  ...msg,
                  isRead: true,
                }
              : msg
          )
        );
      }
    );

    // =======================================================
    // CLEANUP
    // =======================================================
    return () => {
      socket.off("joined_status");
      socket.off("left_status");
      socket.off("receive_message");
      socket.off(
        "all_messages_read_confirm"
      );
      socket.off(
        "message_read_confirm"
      );
    };
  }, []);

  // =========================================================
  // GET UNREAD MESSAGES
  // =========================================================
  async function getUnreadMessages(
    conversationId
  ) {
    try {
      const token =
        cookies.get("token-client");

      if (!conversationId) {
        console.log(
          "conversationId is missing"
        );

        return 0;
      }

      const url =
        `${baseURL}` +
        `${GetNomberOfMesseageNotRead}` +
        `${conversationId}`;

      console.log(
        "Unread conversationId:",
        conversationId
      );

      console.log(
        "Unread URL:",
        url
      );

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(
        "Unread response:",
        res.data
      );

      return res.data.number || 0;
    } catch (err) {
      console.log(
        "Unread error:",
        err.response?.data || err
      );

      return 0;
    }
  }

  // =========================================================
  // CREATE CONVERSATION
  // =========================================================
  async function createConversation(
    freelancerId
  ) {
    try {
      const token =
        cookies.get("token-client");

      console.log(
        "Creating conversation with freelancer:",
        freelancerId
      );

      const res = await axios.post(
        `${baseURL}${startClientConversation}${freelancerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Created conversation:",
        res.data
      );

      const newConversation =
        res.data.conversation;

      if (!newConversation) {
        console.log(
          "Conversation was not returned:",
          res.data
        );

        return;
      }

      /*
        Expected data:

        {
          conversationsId: 5,
          clientId: 15,
          client_name: "shantal",
          freelancerId: 14,
          freelancer_name: "nermin22"
        }
      */

      const conversationId =
        newConversation.conversationsId;

      console.log(
        "New conversation ID:",
        conversationId
      );

      // Add conversation if it doesn't exist
      setConversations((prev) => {
        const exists = prev.some(
          (chat) =>
            chat.conversationsId ===
            conversationId
        );

        if (exists) {
          return prev;
        }

        return [
          ...prev,
          newConversation,
        ];
      });

      // Open conversation
      await handleGetMessages(
        conversationId
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
      const token =
        cookies.get("token-client");

      console.log(
        "Client token:",
        token
      );

      const res = await axios.get(
        `${baseURL}${getMyConversations}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Conversations response:",
        res.data
      );

      console.log(
        "Conversations:",
        JSON.stringify(
          res.data.conversations,
          null,
          2
        )
      );

      // =====================================================
      // Add unread number
      // =====================================================
      const conversationsWithUnread =
        await Promise.all(
          res.data.conversations.map(
            async (conv) => {
              /*
                IMPORTANT:
                API uses conversationsId
                not id
              */

              const conversationId =
                conv.conversationsId;

              const unread =
                await getUnreadMessages(
                  conversationId
                );

              return {
                ...conv,
                unread,
              };
            }
          )
        );

      setConversations(
        conversationsWithUnread
      );
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
  async function handleGetMessages(
    conversationId
  ) {
    try {
      if (!conversationId) {
        console.log(
          "conversationId is missing"
        );

        return;
      }

      // =====================================================
      // Leave previous conversation
      // =====================================================
      if (
        selectedConversationRef.current
      ) {
        socket.emit(
          "leave_conversation",
          selectedConversationRef.current
        );
      }

      const token =
        cookies.get("token-client");

      console.log(
        "Opening conversation:",
        conversationId
      );

      console.log(
        "Current token:",
        token
      );

      // =====================================================
      // GET MESSAGES
      // =====================================================
      const res = await axios.get(
        `${baseURL}${getMessages}${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Messages:",
        res.data
      );

      // =====================================================
      // Set selected conversation
      // =====================================================
      setSelectedConversation(
        conversationId
      );

      selectedConversationRef.current =
        conversationId;

      // =====================================================
      // Set messages
      // =====================================================
      setMessages(
        res.data.messages || []
      );

      // =====================================================
      // Join socket room
      // =====================================================
      socket.emit(
        "join_conversation",
        conversationId
      );

      // =====================================================
      // Mark all as read
      // =====================================================
      socket.emit(
        "mark_all_as_read",
        {
          conversationId,
        }
      );

      // =====================================================
      // Reset unread
      // =====================================================
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.conversationsId ===
          conversationId
            ? {
                ...conversation,
                unread: 0,
              }
            : conversation
        )
      );

      // =====================================================
      // Find conversation
      // =====================================================
      const conversation =
        conversations.find(
          (c) =>
            c.conversationsId ===
            conversationId
        );

      // =====================================================
      // Get current client ID
      // =====================================================
      if (conversation) {
        setMyId(
          conversation.clientId
        );

        // ✅ ADDED
        setSelectedChat(conversation);

        console.log(
          "My ID:",
          conversation.clientId
        );

        console.log(
          "Selected Chat:",
          conversation
        );
      } else {
        console.log(
          "Conversation not found in state:",
          conversationId
        );
      }
    } catch (err) {
      console.log(
        "Get messages error:",
        err.response?.data || err
      );
    }
  }

  // =========================================================
  // SEND MESSAGE
  // =========================================================
  function sendMessage() {
    if (!selectedConversation) {
      alert(
        "Select conversation first"
      );

      return;
    }

    if (text.trim() === "") {
      return;
    }

    const newMessage = {
      id: Date.now(),

      content: text,

      senderId: myId,

      conversationId:
        selectedConversation,

      isRead: false,
    };

    console.log(
      "Sending message:",
      newMessage
    );

    // Show immediately
    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    // Send socket
    socket.emit("send_message", {
      conversationId:
        selectedConversation,

      content: text,
    });

    // Clear input
    setText("");
  }

  // =========================================================
  // UI
  // =========================================================
  function getFirstLetter(name) {
  if (!name) {
    return "?";
  }

  return name.trim().charAt(0).toUpperCase();
}
  return (
    <div className="messagess-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="messages-header">

        <div>
          <h1>
            Messages
          </h1>

          <p>
            Your inbox and Freelancer conversations
          </p>
        </div>

        <button
          className="create-contract-btn"
          onClick={() =>
            navigate(
              "/clientlayout/createcontract",
              {
                state: {
                  projectId,
                  freelancerId:
                    freelancer_id,
                },
              }
            )
          }
        >
          Create contract
        </button>

      </div>

      {/* =====================================================
          CHAT CONTAINER
      ====================================================== */}

      <div className="chat-container">

        {/* ===================================================
            SIDEBAR
        ==================================================== */}

        <div className="sidebarr">

          <input
            className="search"
            placeholder="Search messages..."
          />

          {conversations.map(
            (chat) => (

              <div
                key={
                  chat.conversationsId
                }

                className={`chat-item ${
                  selectedConversation ===
                  chat.conversationsId
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  handleGetMessages(
                    chat.conversationsId
                  )
                }
              >

              <div className="avatar green">
  {getFirstLetter(
    chat.freelancer_name
  )}
</div>

                <div className="chat-info">

                  {/* Freelancer name only */}
                  <h4>
                    {chat.freelancer_name ||
                      `Freelancer #${chat.freelancerId}`}
                  </h4>

                </div>

                {/* =================================================
                    UNREAD
                ================================================== */}

                <div className="chat-right">

                  {chat.unread > 0 && (
                    <span className="unread-badge">
                      {chat.unread}
                    </span>
                  )}

                </div>

                {/* =================================================
                    DATE
                ================================================== */}

                <span>
                  {chat.updatedAt
                    ? new Date(
                        chat.updatedAt
                      ).toLocaleDateString()
                    : ""}
                </span>

              </div>

            )
          )}

        </div>

        {/* ===================================================
            CHAT SECTION
        ==================================================== */}

        <div className="chat-section">

          {/* =================================================
              CHAT HEADER
          ================================================== */}

          <div className="chat-header">

            <div className="avatar green">
              F
            </div>

            <div>

              {/* ✅ CHANGED ONLY THIS */}
              <h3>
                {selectedChat
                  ? selectedChat.freelancer_name
                  : "Select Conversation"}
              </h3>

              <p>
                {selectedChat
                  ? "Messages"
                  : "Choose a conversation from the left"}
              </p>

            </div>

          </div>

          {/* =================================================
              CHAT BODY
          ================================================== */}

          <div className="chat-body">

            {messages.length === 0 ? (

              <p>
                No messages
              </p>

            ) : (

              messages.map(
                (msg) => {

                  console.log(
                    "Message sender:",
                    msg.senderId
                  );

                  console.log(
                    "My ID:",
                    myId
                  );

                  return (
                    <div
                      key={msg.id}

                      className={
                        msg.senderId ===
                        myId
                          ? "message my-message"
                          : "message other-message"
                      }
                    >

                      <div>
                        {msg.content}
                      </div>

                      {/* ================================
                          MESSAGE STATUS
                      ================================= */}

                      {msg.senderId ===
                        myId && (

                        <small>

                          <div className="message-status">

                            {msg.isRead
                              ? "✔️✔️ Read"
                              : "✔️ Sent"}

                          </div>

                        </small>

                      )}

                    </div>
                  );
                }
              )

            )}

          </div>

          {/* =================================================
              CHAT INPUT
          ================================================== */}

          <div className="chat-input">

            <button
              onClick={() =>
                setShowEmoji(
                  !showEmoji
                )
              }
            >
              😊
            </button>

            {showEmoji && (

              <EmojiPicker
                onEmojiClick={
                  onEmojiClick
                }
              />

            )}

            <input
              value={text}

              onChange={(e) =>
                setText(
                  e.target.value
                )
              }

              placeholder="Type your reply..."

              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
            >
              ➤
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}