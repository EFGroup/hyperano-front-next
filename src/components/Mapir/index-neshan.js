import React from 'react'
import dynamic from 'next/dynamic';
// import NeshanMap from 'react-neshan-map-leaflet'

const NeshanMap = dynamic(() => import('react-neshan-map-leaflet'), { ssr: false });

function Neshan() {
  return (
    <NeshanMap
    options={{
        key: 'web.d2a614eed08545c4ad6cc5e529a709ac',
        maptype: 'dreamy',
        poi: true,
        traffic: false,
        center: [35.699739, 51.338097],
        zoom: 13
    }}

    onInit={(L, myMap) => {
        let marker = L.marker([35.699739, 51.338097])
        .addTo(myMap)
        .bindPopup('I am a popup.');

        myMap.on('click', function (e) {
        marker.setLatLng(e.latlng)
        });

        L.circle([35.699739, 51.348097], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
        }).addTo(myMap);
    }}
    />
  );
}

export default Neshan;