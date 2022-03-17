import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./ContactList.css";
import axios from "axios";
import BASEURL from "../../BaseUrl";
import timeFormat from "../Helper/helper";
import { useHistory } from "react-router-dom";

function ContactList(props) {
  const {
    contact,
    currentUser,
    setCurrentChat,
    refreshContact,
    arrivalMessage,
  } = props;

  const { userName, profilePic } = currentUser;
  const [selectedUser, setSelectedUser] = useState(null);

  const [contactMessage, setContactMessage] = useState([]);
  const [lastMessage, setLastMessage] = useState([]);

  const selectUser = (index, user) => {
    setSelectedUser(index);
    setCurrentChat(user);
  };

  //last message from contact
  useEffect(() => {
    setContactMessage([]);
    contact.map((item) =>
      axios
        .get(`${BASEURL}/chat/${currentUser._id}/${item._id}`)
        .then((res) => {
          setContactMessage([...contactMessage, res.data]);
        })
        .catch((err) => console.log(err))
    );
    setLastMessage([]);
  }, [refreshContact, arrivalMessage, currentUser._id]);

  useEffect(() => {
    setLastMessage([]);
    contactMessage.map((item) =>
      setLastMessage([...lastMessage, item[item.length - 1]])
    );
  }, [arrivalMessage, contactMessage]);

  const [find, setFind] = useState(null);
  const [findByUser, setFindByUser] = useState([]);
  useEffect(() => {
    setFindByUser(
      contact.filter((item) => (find ? item.userName.includes(find) : item))
    );
  }, [find]);

  return (
    <>
      {findByUser && (
        <div className="contactContainer">
          <div className="contactHeader">
            <Tooltip title={userName} placement="right" arrow>
              <Avatar
                alt={userName}
                src={profilePic}
                sx={{ width: 35, height: 35 }}
              >
                {userName[0]}
              </Avatar>
            </Tooltip>
            <MenuIcon />
          </div>
          <div className="contactList">
            <input
              placeholder="Search..."
              className="searchInput"
              onChange={(e) => setFind(e.target.value)}
            ></input>
            {findByUser.length > 0 ? (
              findByUser?.map((user, index) => (
                <div
                  key={user._id}
                  className={`contact ${
                    index === selectedUser ? "selected" : "unSelected"
                  }`}
                  onClick={() => selectUser(index, user)}
                >
                  <div className="userAvatar">
                    <Avatar
                      alt={user.userName}
                      src={user.profilePic}
                      sx={{ width: 39, height: 39 }}
                    >
                      {user.userName[0]}
                    </Avatar>
                  </div>
                  <div className="userName">
                    <p>{user.userName}</p>
                    {lastMessage.map(
                      (item, index) =>
                        user._id === item?.from && (
                          <div key={index} className="lastMessage">
                            <h6>{item?.chat}</h6>
                            <span>{timeFormat(item?.date)}</span>
                          </div>
                        )
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="noResult">no user Found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function MenuIcon() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileClick = () => {
    history.push("/profile");
    setAnchorEl(null);
  };

  const logoutFn = () => {
    localStorage.clear();
    setAnchorEl(null);
    history.push("/signin");
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="primary"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={profileClick}>Profile</MenuItem>
        <MenuItem onClick={logoutFn}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default ContactList;
