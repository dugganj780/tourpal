import React, { useEffect, useState } from "react";
import PageTemplate from "../components/pageTemplateList";
import { auth, db } from "../firebase";

const TourListPage = (props) => {
  const currentUserId = auth.currentUser.uid;
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snapshot) => {
      const tour = snapshot.val();
      const tours = [];
      for (let id in tour) {
        if (tour[id].ownerid === currentUserId) {
          tours.push(tour[id]);
        }
      }
      setTours(tours);
    });
  }, []);

  return <PageTemplate title="My Tours" props={tours} />;
};

export default TourListPage;
