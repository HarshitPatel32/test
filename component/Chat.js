import { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/Chat.module.css";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [name, setName] = useState("");
  const [uuid, setUUID] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let savedUUID = localStorage.getItem("uuid");
    if (!savedUUID) {
      savedUUID = uuidv4();
      localStorage.setItem("uuid", savedUUID);
    }
    setUUID(savedUUID);
  }, []);

  useEffect(() => {
    if (uuid) {
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT, {
        query: { uuid },
      });

      socket.on("send", (data) => {
        setChat((prevChat) => [...prevChat, data]);
      });

      setSocket(socket);
      return () => socket.disconnect();
    }
  }, [uuid]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && name.trim()) {
      const data = { Name: name, message };
      socket.emit("message", data);
      setMessage("");
    }
  };

  return (
    <div className={styles.chatbot}>
      <h1>Socket.IO Chat</h1>
      <div className={styles.username}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <form onSubmit={sendMessage} className={styles.messageInput}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      <div className={styles.chatWindow}>
        {chat.map((item, index) => (
          <div key={index}>
            <strong>{item.Name}: </strong> {item.message}
          </div>
        ))}
      </div>
    </div>
  );
}
