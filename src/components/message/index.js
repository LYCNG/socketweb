import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

//message:{author,message,time}

function Message({ message, username }) {
  //   console.log(/\.(jpg|png|gif)$/.test(message.message));
  console.log(message.message.length / 25);
  if (message.author === username) {
    return (
      <ListItem
        align="center"
        sx={{
          height: `${(message.message.length / 25) * 30}`,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent="flex-end"
          sx={{ width: "100%", border: 0 }}
          spacing={2}
        >
          <Box
            sx={{
              maxWidth: 400,
              border: 1,
              borderRadius: 2,
              p: 1.2,
              position: "relative",
            }}
          >
            <div
              style={{
                background: "white",
                top: 10,
                right: -6,
                transform: "rotate(45deg)",
                width: 10,
                height: 10,
                border: "1px solid",
                borderWidth: "1px 1px 0px 0",
                position: "absolute",
              }}
            />

            {/\.(jpg|png|gif)$/.test(message.message) ? (
              <img
                alt="message-media"
                src={message.message}
                style={{ maxWidth: 400 }}
              />
            ) : (
              <Typography
                sx={{
                  display: "inline",

                  p: 1.5,
                  borderRadius: 2,
                  mr: 1,
                  wordWrap: "break-word",
                }}
                gutterBottom
                component="span"
                variant="body1"
                color="text.primary"
              >
                {message.message}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: "red" }}>{message.author}</Avatar>
        </Stack>
      </ListItem>
    );
  }
  return (
    <ListItem alignItems="flex-start">
      <Stack
        direction={"row"}
        justifyContent="flex-start"
        sx={{ width: "100%", border: 0 }}
        spacing={2}
      >
        <Avatar sx={{ bgcolor: "green" }}>{message.author}</Avatar>
        <Box
          sx={{
            maxWidth: 400,
            border: 1,
            borderRadius: 2,
            p: 1.2,
            position: "relative",
          }}
        >
          <div
            style={{
              background: "white",
              top: 10,
              left: -6,
              transform: "rotate(45deg)",
              width: 10,
              height: 10,
              border: "1px solid",
              borderWidth: "0px 0px 1px 1px",
              position: "absolute",
            }}
          />
          {/\.(jpg|png|gif)$/.test(message.message) ? (
            <img
              alt="message-media"
              src={message.message}
              style={{ maxWidth: 400 }}
            />
          ) : (
            <Typography
              sx={{
                display: "inline",

                p: 1.5,
                borderRadius: 2,
                mr: 1,
                wordWrap: "break-word",
              }}
              gutterBottom
              component="span"
              variant="body1"
              color="text.primary"
            >
              {message.message}
            </Typography>
          )}
        </Box>
      </Stack>
    </ListItem>
  );
}

export default Message;
