import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/pageTemplateDetails";
import { db } from "../firebase";

const TourDetailsPage = (props) => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            setTour(tours[uid]);
          }
        });
      }
    });
  }, []);

  return <>{tour && <PageTemplate title={tour.title} props={tour} />};</>;
};

export default TourDetailsPage;
