import { FC, useRef, useCallback, MutableRefObject, useState } from "react";
import MapGL, { ViewState, ViewportProps } from "react-map-gl";
import { DeckGL, MVTLayer } from "deck.gl";
import { useToggle } from "react-use";
import SidePopper from "@/components/SidePopper";
import { FeatureCollection } from "geojson";

export interface MapProps {
  width: string | number | undefined;
  height: string | number | undefined;
  viewState: ViewState;
  onViewStateChange: (viewState: ViewportProps) => void;
}
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const Map: FC<MapProps> = ({ width, height, viewState, onViewStateChange }) => {
  const deckRef = useRef() as MutableRefObject<DeckGL>;
  const [off, toggle] = useToggle(false);
  const [info, setInfo] = useState<FeatureCollection | undefined | string>(
    undefined
  );

  const layers = [
    new MVTLayer({
      id: "greenstand",
      data: "http://localhost:4326/greenstand-freetown.mbtiles/{z}/{x}/{y}.pbf",
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
    <MapGL
      width={width}
      height={height}
      viewState={viewState}
      onViewStateChange={onViewStateChange}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <DeckGL layers={layers} viewState={viewState} />
      <SidePopper handleClose={handleClose} on={off} info={info}>
        Side Popper
      </SidePopper>
    </MapGL>
  );
};

export default Map;
