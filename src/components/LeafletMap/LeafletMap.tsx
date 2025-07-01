import { icon, map, type LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
const MAP_CONTAINER_ID = 'map-container';

export function LeafletMap({
  lat,
  lng,
  message,
  width,
  height
}: {
  lat?: number | undefined;
  lng?: number | undefined;
  message?: string | undefined;
  width: number;
  height: number;
}) {
  // console.log(width, height);
  console.log(lat, lng);
  if (!lat) lat = 51.505;
  if (!lng) lng = -0.09;
  if (!width) width = 1000;
  if (!height) height = 800;
  // console.log(width, height);

  const mapRef = useRef<any>({});
  const [position, setPosition] = useState<LatLngTuple>([lat, lng]);
  const mapElement = document.getElementById(MAP_CONTAINER_ID);

  const myIcon = icon({
    iconUrl: 'http://fiel.us/ip-tracker/images/icon-location.svg',
    iconSize: [47, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });

  useEffect(() => fixPosition(), []);
  useEffect(() => fixPosition(), [lat, lng]);
  function fixPosition() {
    console.log('fixPos', lat, lng);
    setPosition([lat, lng]);
    mapRef?.current?.setView([lat, lng]);
  }

  useEffect(() => fixHeight(), [width, height]);
  useEffect(() => fixHeight(), []);
  function fixHeight() {
    console.log('fix height', height);
    if (mapElement) mapElement.style.height = `${height}px`;
  }

  return (
    <MapContainer
      id={MAP_CONTAINER_ID}
      ref={mapRef}
      center={position}
      zoom={12}
      scrollWheelZoom={false}
      className={`h-[${height}px] w-[${width}px] z-1`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} icon={myIcon}>
        {message && <Popup>{message}</Popup>}
      </Marker>
    </MapContainer>
  );
}
