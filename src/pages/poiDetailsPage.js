import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/pageTemplateDetails";
import { db } from "../firebase";

const PoiDetailsPage = (props) => {
  const { poiId } = useParams();
  const [poi, setPoi] = useState(null);

  useEffect(() => {
    const poiRef = db.ref("pois");
    poiRef.on("value", (snap) => {
      const pois = snap.val();
      if (pois !== null) {
        Object.keys(pois).forEach((uid) => {
          if (uid === poiId) {
            setPoi(pois[uid]);
          }
        });
      }
    });
  }, []);

  return <>{poi && <PageTemplate title={poi.title} props={poi} />};</>;
};

export default PoiDetailsPage;
