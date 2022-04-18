import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { auth, db } from "../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: "100%",
    margin: "10px",
  },
});

export default function UserList() {
  const [activeUser, setActiveUser] = useState(null);
  const [foundUsers, setFoundUsers] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const userRef = db.ref("users");
    userRef.on("value", (snapshot) => {
      const user = snapshot.val();
      const users = [];
      for (let id in user) {
        users.push(user[id]);
      }
      setFoundUsers(users);
    });
  }, []);

  function handleDeleteUser(id) {
    const userId = id;

    const userRef = db.ref("users");
    userRef.once("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === userId) {
            db.ref(`/users/${uid}`).remove();
            auth
              .deleteUser(id)
              .then(() => {
                console.log("Successfully deleted user");
              })
              .catch((error) => {
                console.log("Error deleting user:", error);
              });
          } else {
            console.log("Could not delete user");
          }
        });
      }
    });
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Users</Typography>
          {!foundUsers && <Typography variant="h4">No Users.</Typography>}
          {foundUsers[0] && (
            <List>
              {foundUsers.map((user) => {
                return (
                  <ListItem
                    key={user.uid}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon
                          onClick={() => handleDeleteUser(user.uid)}
                        />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.firstName + " " + user.surname}
                      secondary={user.email}
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
    </>
  );
}
