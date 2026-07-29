
import "../../../FreeLancer/freelancer-message/styles/MessageFree.css";

const chats = [
  {
    id: 1,
    name: "Sarah Chen",
    message: "Hi Alex, the checkout redesign looks gr...",
    time: "2 hours ago",
    avatar: "SC",
    color: "#2AA198",
  },
  {
    id: 2,
    name: "Marcus Webb",
    message: "I have a new project that matches y...",
    time: "5 hours ago",
    avatar: "MW",
    color: "#7C3AED",
  },
  {
    id: 3,
    name: "DataFlow Inc",
    message: "Your payment has been relea...",
    time: "1 day ago",
    avatar: "DF",
    color: "#0F766E",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    message: "Thanks for the detailed proposal...",
    time: "2 days ago",
    avatar: "ER",
    color: "#DC2626",
  },
];

export default function MessageFree() {
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

          {chats.map((chat, index) => (
            <div
              className={`chat-item ${index === 0 ? "active" : ""}`}
              key={chat.id}
            >
              <div
                className="avatar"
                style={{ background: chat.color }}
              >
                {chat.avatar}
              </div>

              <div className="chat-info">
                <h4>{chat.name}</h4>
                <p>{chat.message}</p>
              </div>

              <span>{chat.time}</span>
            </div>
          ))}
        </div>

        <div className="chat-section">

          <div className="chat-header">

            <div className="avatar green">
              SC
            </div>

            <div>
              <h3>Sarah Chen</h3>
              <p>Project milestone review</p>
            </div>

          </div>

          <div className="chat-body">

            <div className="message">
              Hi Alex, the checkout redesign looks great!
              Can we schedule a call this week to review the milestone
              deliverables?
            </div>

          </div>

          <div className="chat-input">

            <input placeholder="Type your reply..." />

            <button>➤</button>

          </div>

        </div>
      </div>
    </div>
  );
}