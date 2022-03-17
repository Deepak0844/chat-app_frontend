import { useState } from "react";
import Picker from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./ChatInput.css";
import { IconButton } from "@mui/material";

function ChatInput({ handleSendMessage, setRefreshContact, refreshContact }) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };
  const handleEmojiClick = (event, emoji) => {
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  };
  const sendMessage = (e) => {
    setRefreshContact(!refreshContact);
    e.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
      setShowEmoji(false);
    }
  };
  return (
    <div className="inputContainer">
      <div className="emoji">
        <IconButton color="inherit" onClick={handleEmoji}>
          <EmojiEmotionsIcon />
        </IconButton>
        {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
      <form className="inputBox" onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <IconButton color="inherit" type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default ChatInput;
