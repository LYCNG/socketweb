import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import moment from "moment";
import io from "socket.io-client";
import Message from "../message/index";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// const chatSocket = io("http://localhost:8001");

let socket;
function Room({ username, room, setShowChat }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]); //{username:string,message:string,time:string}

  const MessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const msgData = {
        room: room,
        author: username,
        message: currentMessage,
        time: moment(Date.now()).format("HH:mm:ss"),
      };
      //以 emit 送訊息，並以 send_message 為名稱送給 server 捕捉
      socket.emit("send_message", msgData);
      setMessageList((list) => [...list, msgData]);
      setCurrentMessage("");
    }
  };
  const leaveRoom = (e) => {
    e.preventDefault();
    socket.emit("leave_room", {
      username,
      room,
      time: moment(Date.now()).format("HH:mm:ss"),
    });
  };

  useEffect(() => {
    socket = io("http://localhost:8001");
    socket.emit("join_room", { username, room }, ({ error }) => {
      if (error) return alert(error);
    });
    socket.on("receive_message", (message) => {
      setMessageList((messages) => [...messages, message]);
    });
    socket.on("disconnect_room", (message) => {
      socket.close();
      setShowChat(false);
    });
    return () => socket.off("receive_message");
  }, [room, username]);

  return (
    <Card sx={{ minWidth: 275, border: 1, borderColor: "blue" }}>
      <CardHeader
        title={"Live Chat: " + room}
        sx={{ color: "blue" }}
        id="room-title"
        action={
          <IconButton aria-label="leave" color="default" onClick={leaveRoom}>
            <ExitToAppIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardContent
        sx={{ minHeight: 200, maxHeight: 500, minWidth: 500 }}
        id="message-record-contain"
      >
        <Box
          sx={{
            border: 1,
            borderRadius: 2,
            borderColor: "green",
            minWidth: "99%",
          }}
        >
          <List sx={{ overflowY: "auto", height: 500, overflowX: "hidden" }}>
            {messageList.map((message, index) => (
              <Message key={index} message={message} username={username} />
            ))}
          </List>
        </Box>
      </CardContent>
      <Divider />
      <CardActions id="message-input-contain">
        <TextField
          fullWidth
          size="small"
          onChange={MessageChange}
          value={currentMessage}
        />
        <IconButton size="large" color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Room;
