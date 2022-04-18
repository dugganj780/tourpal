import React from "react";
import NavigationDrawer from "./navigationDrawer";
import Grid from "@mui/material/Grid";
import MapViewPoi from "./mapViewPoi";
import MapViewTour from "./mapViewTour";
import DetailsCard from "./detailsCard";
import NoPoisCard from "./noPoisMapView";
import PoiList from "./poiList";

function DetailsPageTemplate({ props, title, action }) {
  const { poi, pois } = props;

  function UsableMap(props) {
    if (poi) {
      return <MapViewPoi props={props} />;
    } else {
      if (pois) {
        return <MapViewTour props={props} />;
      } else {
        return <NoPoisCard props={props} />;
      }
    }
  }
  //const [nameFilter, setNameFilter] = useState("");
  //const [genreFilter, setGenreFilter] = useState("0");
  //const genreId = Number(genreFilter);

  return (
    <>
      <NavigationDrawer title={title} />
      <Grid container spacing={2}>
        <Grid item xs={6} spacing={2}>
          <UsableMap props={props} />
        </Grid>
        <Grid item xs={6}>
          <DetailsCard props={props} action={action} />
          {!poi && <PoiList props={props} />}
        </Grid>
      </Grid>
    </>
  );
}
export default DetailsPageTemplate;
