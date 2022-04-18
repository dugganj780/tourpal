import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import NavigationDrawer from "../components/navigationDrawer";
import UserList from "../components/userList";
import { useNavigate } from "react-router-dom";
import NotAuthorisedCard from "../components/notAuthorisedCard";

import { auth, db } from "../firebase";

const UserListPage = () => {
  const currentUserUid = auth.currentUser.uid;
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRef = db.ref("users");
    userRef.on("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (currentUserUid === uid) {
            setIsAdmin(true);

            if (!users[uid].admin) {
              navigate("/tourlist");
            }
          }
        });
      }
    });
  }, []);

  return (
    <>
      <NavigationDrawer title="All Users" />
      <Grid container justify="center">
        <Grid xs={4} />
        <Grid item xs={4} align="center">
          {isAdmin && <UserList />}
          {!isAdmin && <NotAuthorisedCard />}
        </Grid>
        <Grid xs={4} />
      </Grid>
    </>
  );
};

export default UserListPage;
