import type { NextPage } from "next";
import { useState, Dispatch } from "react";
import { FlyToInterpolator, ViewState, ViewportProps } from "react-map-gl";
import Map from "@/components/Map";
import * as Locations from "@/locations/index";

const MapPage: NextPage = () => {
  console.log("Locations.freetown", Locations.usa);
  const [viewState, setViewState] = useState<ViewState>(Locations.freetown);
  const handleChangeViewState = ({ viewState, ...rest }) => {
    setViewState(viewState);
  };

  const handleFlyTo = (destination: ViewState) =>
    setViewState({
      ...viewState,
      ...destination,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  return (
    <Map
      height="100vh"
      width="100vw"
      viewState={viewState}
      onViewStateChange={handleChangeViewState}
    />
  );
};

export default MapPage;
