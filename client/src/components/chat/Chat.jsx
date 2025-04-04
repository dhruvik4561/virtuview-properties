import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();
  const typingTimeoutRef = useRef(null);

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        receiverId: chat.receiver.id,
        senderId: currentUser.id,
      });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stopTyping", {
        receiverId: chat.receiver.id,
        senderId: currentUser.id,
      });
    }, 1000);
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });

      socket.on("userTyping", (userId) => {
        if (userId === chat.receiver.id) {
          setTyping(true);
        }
      });

      socket.on("userStoppedTyping", (userId) => {
        if (userId === chat.receiver.id) {
          setTyping(false);
        }
      });
    }
    return () => {
      socket.off("getMessage");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.length > 0 ? (
          chats.map((c) => (
            <div
              className="message"
              key={c.id}
              style={{
                backgroundColor:
                  c.seenBy.includes(currentUser.id) || chat?.id === c.id
                    ? "white"
                    : "#fecd514e",
              }}
              onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
              <div className="messageInfo">
                <span className="username">{c.receiver.username}</span>
                <p className="lastMessage">{c.lastMessage}</p>
              </div>
              {!c.seenBy.includes(currentUser.id) && chat?.id !== c.id && (
                <div className="unreadBadge"></div>
              )}
            </div>
          ))
        ) : (
          <div className="noMessages">
            <i className="fas fa-comments"></i>
            <p>No messages yet</p>
          </div>
        )}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              <span>{chat.receiver.username}</span>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="center">
            {chat.messages.length > 0 ? (
              chat.messages.map((message) => (
                <div
                  className="chatMessage"
                  style={{
                    alignSelf:
                      message.userId === currentUser.id
                        ? "flex-end"
                        : "flex-start",
                    textAlign:
                      message.userId === currentUser.id ? "right" : "left",
                  }}
                  key={message.id}
                >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))
            ) : (
              <div className="noMessagesInChat">
                <i className="fas fa-comments"></i>
                <p>No messages in this chat yet</p>
              </div>
            )}
            {typing && (
              <div className="typingIndicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea 
              name="text" 
              placeholder="Type a message..." 
              onKeyDown={handleTyping}
            ></textarea>
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
