import React, { useEffect, useState } from 'react';
import turf from 'turf';
import Mapir from "mapir-react-component";
import isfahan from "assets/json/isfahan.json";
import "mapir-react-component/dist/index.css";

const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYzN2I2NDFlZDhkMmVkN2NiZjY1OWU0YTNjMjgyMWFlOGE1M2MxNWYyZTQ5NTdjZTU5NjUyZGJmZGRiZDZkYmEzMjQ5YTAwYmVkZWYxM2YzIn0.eyJhdWQiOiIyMTY0MCIsImp0aSI6ImYzN2I2NDFlZDhkMmVkN2NiZjY1OWU0YTNjMjgyMWFlOGE1M2MxNWYyZTQ5NTdjZTU5NjUyZGJmZGRiZDZkYmEzMjQ5YTAwYmVkZWYxM2YzIiwiaWF0IjoxNjc5OTI0NjE4LCJuYmYiOjE2Nzk5MjQ2MTgsImV4cCI6MTY4MjUxNjYxOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.KfZMMyFfBEGueCgIFoXQr0TdHtRsgO_BpsSn3eKHJ0VuG_AeSpoGwPPCzG-svUtTmEtS7YrL0QtUnJI7IvqVyGsB224UAPl2jqbE7fRYFWAb1LqLB2oXwz6IjnQW3bKljQSojw9RT2qCM4swQUm1KTMycgoi_H7rBSKIwpRQzOcKxEu1CvznhTfC4T4_692f1L8vkg3ehOj12pZbgH_fpawtfDeODvUTNBOqo8izd3UoY7JJVyhwUQ8QKDtKN_bl_J5FSu0-04uvn_kAIjsf08C2sWfxt6q89eyF3UOd7xWjNqBJ7JVCbAhJbk_BEcXf5sXFyGytgGH7bIKhoyh4lw';

const Map = Mapir.setToken({
  hash: true,
  transformRequest: url => {
    return {
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Mapir-SDK": "reactjs",
        "x-api-key": apiKey,
      }
    };
  }
});

const worldBBox = turf.bboxPolygon([-180, -90, 180, 90]);
const polygon = turf.feature(isfahan);
const masked = turf.difference(worldBBox, polygon);

export default function MapDialog({
    getTextAddress = (address) => console.log("address:", address),
    getLocation = (location) => console.log("location", location),
    fixed = false,
    height = "30vh",
    width = "100%",
    borderRadius = 16,
    center = [51.721715, 32.696533],
  }) {

  const [coord, setCoord] = useState([51.721715, 32.696533]);
  const [marker, setMarker] = useState([51.721715, 32.696533]);

  const reverseFunction = (map, e) => {
    var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Mapir-SDK": "reactjs",
        "x-api-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getTextAddress(data.postal_address);
      });
  };
  
  // const handleSuccess = (pos) => {
  //   const { latitude, longitude } = pos.coords;
  //   setCoord([longitude, latitude]);
  //   // setLocationError(false);
  // };

  // const handleError = (error) => {
  //   // console.log('errorllll', error);
  //   // setLocationError(true);
  //   // ErrorToast("لطفا موقعیت مکانی دستگاه خود را روشن نمایید");
  // };

  // useEffect(() => {
  //   const { geolocation } = navigator;
  //   if (!geolocation) {
  //     return;
  //   }
  //   geolocation.getCurrentPosition(handleSuccess, handleError);
  // }, []);

  // useEffect(() => {
  //   if (coord && fixed) {
  //     setCoord(coord);
  //     setMarker(coord);
  //   }
  // }, [coord, fixed]);

  useEffect( () => {
    setCoord(center)
    setMarker(center)
  }, [center])

  return (
    <Mapir
      Map={Map}
      center={coord}
      interactive={true}
      userLocation={!fixed}
      zoom={[!fixed ? 14 : 12]}
      style={"https://map.ir/vector/styles/main/mapir-xyz-light-style.json"}
      // style={"https://map.ir/vector/styles/main/mapir-Dove-style.json"}
      // style={"https://map.ir/vector/styles/main/mapir-xyz-style-min-poi.json"}
      // style={"https://map.ir/vector/styles/main/mapir-style-dark.json"}
      containerStyle={{
        width,
        height,
        borderRadius,
      }}
      onClick={(Map, e) => {
        if (!fixed) {
          setCoord([e.lngLat.lng, e.lngLat.lat]);
          setMarker([e.lngLat.lng, e.lngLat.lat]);
          reverseFunction(Map, e);
          getLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng });
        }
      }}>
      <Mapir.Marker
        anchor="bottom"
        draggable={!fixed}
        coordinates={coord}
        Image={"/marker.png"}
      />
      <Mapir.ZoomControl position={"top-left"} />
      <Mapir.GeoJSONLayer
        data={masked}
        fillPaint={{
          'fill-color': 'white',
          'fill-opacity': 0.999,
        }}
      />
    </Mapir>
  );
}