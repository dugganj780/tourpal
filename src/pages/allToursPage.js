import React, { useEffect, useState } from "react";
import PageTemplate from "../components/pageTemplateList";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import NotAuthorisedCard from "../components/notAuthorisedCard";

const AllToursPage = (props) => {
  const currentUserUid = auth.currentUser.uid;
  const [tours, setTours] = useState([]);
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
            if (!users[uid].admin) {
              navigate("/tourlist");
            }
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snapshot) => {
      const tour = snapshot.val();
      const tours = [];
      for (let id in tour) {
        tours.push(tour[id]);
      }
      setTours(tours);
    });
  }, []);

  return (
    <>
      {isAdmin && <PageTemplate title="All Tours" props={tours} />}
      {!isAdmin && <NotAuthorisedCard />}
    </>
  );
};

export default AllToursPage;
