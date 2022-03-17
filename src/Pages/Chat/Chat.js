import { useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import BASEURL from "../../BaseUrl";
import ContactList from "../../Components/ContactList/ContactList";
import Home from "../../Components/Home/Home";
import ChatScreen from "../../Components/ChatScreen/ChatScreen";
import { io } from "socket.io-client";
import Spinner from "../../Components/Helper/Spinner";

function Chat() {
  const [contact, setContact] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("loginInfo"));
  const s = io(BASEURL);
  const [socket] = useState(s);
  const [refreshContact, setRefreshContact] = useState(false);
  const [loading, setLoading] = useState(false);
  //
  const [arrivalMessage, setArrivalMessage] = useState(null);
  //
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASEURL}/user/allUsers/${currentUser?._id}`)
      .then((res) => {
        setContact(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentUser?._id]);

  //socket
  useEffect(() => {
    if (currentUser && socket) {
      socket?.emit("add-user", currentUser._id);
    }
  }, [currentUser, socket]);

  //live messages
  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, chat: msg });
      });
    }
  }, [socket]);
  return (
    <div className="chatContainer">
      <div className="chatWrapper">
        {!loading && contact ? (
          <ContactList
            contact={contact}
            currentUser={currentUser}
            setCurrentChat={setCurrentChat}
            arrivalMessage={arrivalMessage}
            refreshContact={refreshContact}
          />
        ) : (
          <Spinner />
        )}
        {currentChat ? (
          <ChatScreen
            arrivalMessage={arrivalMessage}
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
            setRefreshContact={setRefreshContact}
            refreshContact={refreshContact}
          />
        ) : loading ? (
          <Spinner />
        ) : (
          <Home currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}

export default Chat;
