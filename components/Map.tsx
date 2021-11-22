// @ts-nocheck
import { FC, useRef, MutableRefObject, useState } from "react";
import { ViewState, StaticMap } from "react-map-gl";
import { DeckGL, MVTLayer } from "deck.gl";
import { useToggle } from "react-use";
import SidePopper from "@/components/SidePopper";
import { FeatureCollection } from "geojson";
import * as Locations from "@/locations/index";

export interface MapProps {
  width: string | number | undefined;
  height: string | number | undefined;
}
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const Map: FC<MapProps> = ({ width, height }) => {
  const deckRef = useRef() as MutableRefObject<DeckGL>;
  const [off, toggle] = useToggle(false);
  const [info, setInfo] = useState<FeatureCollection | undefined | string>(
    undefined
  );
  const [viewState, setViewState] = useState<ViewState>(Locations.freetown);
  const [initialViewState, setInitialViewState] = useState(Locations.freetown);

  const handleOnViewStateChange = (e) => {
    console.log(e);
    const { longitude, latitude, zoom } = e.viewState;
    setViewState(e.viewState);
  };

  const layers = [
    new MVTLayer({
      id: "greenstand",
      data: "https://api.maptiler.com/tiles/11727018-5df1-42cd-8924-d9e04dce1aad/{z}/{x}/{y}.pbf?key=XhqZqBw9V2UrmNetMf7t",
      minZoom: 0,
      maxZoom: 13,
      opacity: 0.5,
      autoHighlight: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 1,
      minRadius: 3,
      radiusMinPixels: 4,
      lineWidthMinPixels: 1,
      lineWidthMaxPixels: 1,
      visible: true,
      pickable: true,
      getLineColor: [36, 183, 102],
      getFillColor: [36, 183, 102],
      onClick: (info, event) => {
        console.log(info);
        setInfo(info.object);
        toggle(true);
      },
    }),
  ];

  const handleClose = () => {
    toggle(false);
  };

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <DeckGL
        layers={layers}
        viewState={viewState}
        onViewStateChange={handleOnViewStateChange}
        controller={true}
        getCursor={({}) => "pointer"}
      >
        <StaticMap
          mapStyle="https://api.maptiler.com/maps/topo/style.json?key=XhqZqBw9V2UrmNetMf7t"
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
      <SidePopper handleClose={handleClose} on={off} info={info}>
        Side Popper
      </SidePopper>
    </main>
  );
};

export default Map;
