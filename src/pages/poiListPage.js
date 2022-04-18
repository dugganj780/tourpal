import React, { useEffect, useState } from "react";
import PageTemplate from "../components/pageTemplateList";
import { auth, db } from "../firebase";

const PoiListPage = (props) => {
  const currentUserId = auth.currentUser.uid;

  const [pois, setPois] = useState([]);

  useEffect(() => {
    const poiRef = db.ref("pois");
    poiRef.on("value", (snapshot) => {
      const poi = snapshot.val();
      const pois = [];
      for (let id in poi) {
        if (poi[id].ownerid === currentUserId) {
          pois.push(poi[id]);
        }
      }
      setPois(pois);
    });
  }, []);

  return <PageTemplate title="My Destinations" props={pois} />;
};

export default PoiListPage;
