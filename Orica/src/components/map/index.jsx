// MapMd.jsx
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import marker from "../../../node_modules/leaflet/dist/images/marker-icon.png";

const MapMd = ({ positionFrom, positionTo }) => {
  return (
    <MapContainer
      className="block w-full h-full rounded-lg shadow-base"
      center={[18.42241, 14.420486]}
      zoom={1}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        icon={
          new L.Icon({
            iconUrl: marker.src,
            iconRetinaUrl: marker.src,
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
          })
        }
        position={positionTo}
      ></Marker>

      <Marker
        icon={
          new L.Icon({
            iconUrl: marker.src,
            iconRetinaUrl: marker.src,
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
          })
        }
        position={positionFrom}
      ></Marker>
    </MapContainer>
  );
};

export default MapMd;
