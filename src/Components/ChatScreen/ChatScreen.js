import "./ChatScreen.css";
import { useEffect, useState, useRef } from "react";
import { Avatar } from "@mui/material";
import ChatInput from "../ChatInput/ChatInput";
import axios from "axios";
import BASEURL from "../../BaseUrl";
import timeFormat from "../Helper/helper";

function ChatScreen(props) {
  const {
    currentChat,
    currentUser,
    socket,
    arrivalMessage,
    setRefreshContact,
    refreshContact,
  } = props;
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASEURL}/chat/${currentUser._id}/${currentChat._id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  }, [currentChat, currentUser?._id]);

  const handleSendMessage = (message) => {
    socket.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message,
    });

    axios
      .post(`${BASEURL}/chat/addChat`, {
        from: currentUser._id,
        to: currentChat._id,
        message,
      })
      .catch((err) => console.log(err.response.data.message));

    const msgs = [...messages];
    msgs.push({ fromSelf: true, chat: message });
    setMessages(msgs);
  };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, chat: msg });
  //     });
  //   }
  // }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  //scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="currentChatContainer">
      <div className="chatHeader">
        <Avatar
          alt={currentChat.userName}
          src={currentChat.profilePic}
          sx={{ width: 30, height: 30 }}
        >
          {currentChat.userName[0]}
        </Avatar>
        <h3>{currentChat.userName}</h3>
      </div>
      <div className="messageBox">
        {messages.map((msg, index) => (
          <div ref={scrollRef} key={index}>
            <div className={`message ${msg.fromSelf ? "sended" : "recieved"}`}>
              <div className="content">
                <p>{msg.chat}</p>
                <div>
                  <p className="time">{timeFormat(msg.date)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chatInput">
        <ChatInput
          handleSendMessage={handleSendMessage}
          setRefreshContact={setRefreshContact}
          refreshContact={refreshContact}
        />
      </div>
    </div>
  );
}

export default ChatScreen;
