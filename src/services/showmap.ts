// Display a map based on coordinates with Leaflet and OpenStreetMap
import {
  map as leafletMap,
  Map as LeafletMap,
  icon,
  latLng,
  tileLayer,
  MapOptions,
  marker
} from 'leaflet';

let myMap: LeafletMap;
var myIcon = icon({
  iconUrl: '../images/icon-location.svg',
  iconSize: [47, 60],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

export function showMap(
  lat: number,
  lng: number,
  message: string | undefined = undefined
) {
  const options: MapOptions = {
    center: latLng(lat, lng),
    zoom: 12
  };
  if (!myMap) myMap = leafletMap('map', options);
  else myMap.setView([lat, lng], 12);

  tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    // `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
    {
      //style URL
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      crossOrigin: true,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  ).addTo(myMap);

  if (message)
    marker([lat, lng], { icon: myIcon }).addTo(myMap).bindPopup(message);
  else marker([lat, lng], { icon: myIcon }).addTo(myMap);
}
