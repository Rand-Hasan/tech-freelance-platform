import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import { useParams } from "react-router-dom";
import {
  getMyConversations,
  getMessages,startFreelancerConversation
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
const [text, setText] = useState("");
const selectedConversationRef = useRef(null);
const { clientId } = useParams();
const onEmojiClick = (emojiData) => {
  setText((prev) => prev + emojiData.emoji);
};
const createdRef = useRef(false);

useEffect(() => {
  if (!clientId || createdRef.current) return;

  createdRef.current = true;
  createConversation(clientId);
}, [clientId]);
 useEffect(() => {
  getConversations();

  socket.on("joined_status", (data) => {
    console.log(data);
  });
socket.on("left_status", (data)=>{
  console.log("Left:", data);
});
socket.on("receive_message", (message) => {
  console.log("New Message:", message);

  setMessages((prev) => {
    const exists = prev.some((msg) => msg.id === message.id);

    if (exists) return prev;

    return [...prev, message];
  });


  if (selectedConversation === message.conversationId) {
    socket.emit("mark_as_read", {
      messageId: message.id,
      conversationId: message.conversationId,
    });
  }
});
socket.on("all_messages_read_confirm", (data) => {
  console.log(data);

  setMessages((prev) =>
    prev.map((msg) => ({
      ...msg,
      isRead: true,
    }))
  );
});
socket.on("message_read_confirm", (message) => {
  setMessages((prev) =>
    prev.map((msg) =>
      msg.id === message.id
        ? { ...msg, isRead: true }
        : msg
    )
  );
});
  return () => {
    socket.off("joined_status");
    socket.off("receive_message");
     socket.off("all_messages_read_confirm");
     socket.off("message_read_confirm");
     socket.off("left_status");
  };


  
}, []);
//////////////الانشاء//////////////
async function createConversation(clientId) {
  try {
    const token = cookies.get("token-freelancer");

    const res = await axios.post(
      `${baseURL}${startFreelancerConversation}${clientId}`,
      {},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
console.log("createConversation called");
    console.log("Created:", res.data);

    const newConversation = res.data.conversation;

    setConversations((prev)=>[
      ...prev.filter(c=>c.id !== newConversation.id),
      newConversation
    ]);

await handleGetMessages(newConversation.id);

  } catch(err){
    console.log(err.response?.data || err);
  }
}
/////////////////////
  async function getConversations() {
    try {
      const token = cookies.get("token-freelancer");

      const res = await axios.get(`${baseURL}${getMyConversations}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log("Create Conversation:", clientId, );
      console.log("Conversations:", res.data);
      console.log(res.data.conversations[0]);
console.log(cookies.get("token-freelancer"));
      setConversations(res.data.conversations || []);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  }

  async function handleGetMessages(conversationId) {
    try {
       if (selectedConversationRef.current) {
      socket.emit(
        "leave_conversation",
        selectedConversationRef.current
      );
    }
      const token = cookies.get("token-freelancer");

      const res = await axios.get(
        `${baseURL}${getMessages}${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
setSelectedConversation(conversationId);
    selectedConversationRef.current = conversationId;

      console.log("Messages:", res.data);

    setSelectedConversation(conversationId);
setMessages(res.data.messages || []);

socket.emit("join_conversation", conversationId);

socket.emit("mark_all_as_read", {
  conversationId,
});
       
  const conversation = conversations.find(
  (c) => c.id === conversationId
);

if (conversation) {
  setMyId(conversation.freelancerId);
}
      
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

  const newMessage = {
    id: Date.now(),
    content: text,
    senderId: myId,
    conversationId: selectedConversation,
    isRead: false,
  };

  setMessages((prev) => [...prev, newMessage]);

  socket.emit("send_message", {
    conversationId: selectedConversation,
    content: text,
  });

  setText("");
}

  return (
    <div className="messages-page">
     
      <h1>Messages</h1>
      <p>Your inbox and client conversations</p>

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
                <p>Client ID: {chat.clientId}</p>
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
            messages.map((msg) => 
              ( <div key={msg.id} 
              className={ msg.senderId === myId ?
               "message my-message" : "message other-message" } >
                 <div>{msg.content}</div> {msg.senderId === myId &&
             ( <small> 
          <div className="message-status">
    {msg.isRead ? "✔✔ Read" : "✔ Sent"}
  </div>
               </small> )} 
              </div> )) 
            )} </div>

          <div className="chat-input">
            <button onClick={() => setShowEmoji(!showEmoji)}>
    😊
  </button>

  {showEmoji && (
    <EmojiPicker onEmojiClick={onEmojiClick} />
  )}
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