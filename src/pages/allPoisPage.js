import React, { useEffect, useState } from "react";
import PageTemplate from "../components/pageTemplateList";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import NotAuthorisedCard from "../components/notAuthorisedCard";

const AllPoisPage = (props) => {
  const currentUserUid = auth.currentUser.uid;
  const [pois, setPois] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRef = db.ref("users");
    userRef.on("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (currentUserUid === uid) {
            setIsAdmin(true);
            // The Object is foo[key]
            if (!users[uid].admin) {
              navigate("/tourlist");
            }

            //setFirstName(users[uid].firstName);
            //setSurname(users[uid].surname);
            //setMessage("Please Update Your Account Details Here");
            //setButtonMessage("Update Details");
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const poiRef = db.ref("pois");
    poiRef.on("value", (snapshot) => {
      const poi = snapshot.val();
      const pois = [];
      for (let id in poi) {
        pois.push(poi[id]);
      }
      setPois(pois);
    });
  }, []);

  return (
    <>
      {isAdmin && <PageTemplate title="All Destinations" props={pois} />}
      {!isAdmin && <NotAuthorisedCard />}
    </>
  );
};

export default AllPoisPage;
