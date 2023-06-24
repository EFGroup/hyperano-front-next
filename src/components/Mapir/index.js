import React, { useState, useEffect } from "react";

import { useGeolocation } from "hooks/geoHook";
import ReactMapboxGl, {
  Layer,
  Feature,
  RotationControl,
  ScaleControl,
  ZoomControl,
  Popup,
  Marker,
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { setRTLTextPlugin, getRTLTextPluginStatus } from "mapbox-gl";
import Image from "next/image";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",
});

const Mapbox = ({ center = [51.721715, 32.696533] }) => {
  const state = useGeolocation();
  const [coords, setCenter] = useState([state.longitude, state.latitude]);

  useEffect(() => {
    const status = getRTLTextPluginStatus();
    if (status === "unavailable") {
      setRTLTextPlugin(
        "https://www.parsimap.com/scripts/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js"
      );
    }
  }, []);

  useEffect(() => {
    setCenter(center);
  }, [center]);

  return (
    <>
      <Map
        style="https://www.parsimap.com/styles/street.json"
        // style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{ height: "500px", width: "100%", borderRadius: 10 }}
        center={coords}
        zoom={[14]}
        onClick={(map, event) => {
          setCenter([event.lngLat.lng, event.lngLat.lat]);
        }}
      >
        <Marker coordinates={center} anchor="center">
          <img
            src="https://www.digikala.com/statics/img/svg/logo.svg"
            width={30}
            height={30}
          />
        </Marker>
      </Map>
    </>
  );
};

export default Mapbox;
