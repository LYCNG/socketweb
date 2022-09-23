import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Button, Box, TextField } from "@mui/material";
// const socket = io();
import Room from "./components/room/index";
import Basic from "./components/basic/index";
function App() {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  // const connectWebSocket = () => {
  //   //開啟 建立連線
  //   setSocket(io("http://localhost:8001"));
  // };

  const handleLeave = () => {
    setSocket(null);
  };
  const joinRoom = () => {
    const roomData = "hololive";
    if (username !== "") {
      setRoom(roomData);
      setShowChat(true);
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  // useEffect(() => {
  //   if (socket) {
  //     setShowChat(false);
  //     console.log("success connect!");
  //   }
  // }, [socket]);

  return (
    <div className="App">
      <h1 style={{ color: "green" }}>Websocket & React</h1>
      <div>
        <TextField value={username} onChange={handleChange} size="small" />
        {/* <Button
          onClick={connectWebSocket}
          variant="contained"
          color={"success"}
        >
          連線
        </Button> */}
        <Button onClick={joinRoom} variant="contained">
          加入房間
        </Button>
      </div>
      <Box sx={{ m: "auto", width: "50%" }}>
        {showChat && (
          <Room room={room} username={username} setShowChat={setShowChat} />
        )}
      </Box>
    </div>
  );
}

export default App;
