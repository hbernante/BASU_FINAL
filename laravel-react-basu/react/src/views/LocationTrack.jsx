// import { useState, useRef, useEffect } from "react";
// import PageComponent from "../components/PageComponent";
// import { MapContainer, TileLayer } from "react-leaflet";
// import osmProviders from "./osm-providers";
// import "leaflet/dist/leaflet.css";

// const LocationTrack = () => {
//   const [center, setCenter] = useState({ lat:14.53106135, lng:121.02142205 });
//   const ZOOM_LEVEL = 9; // Move the constant here
//   const mapRef = useRef(); // Create a ref for Map component
//   const [retryCount, setRetryCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Your code to fetch data, e.g., fetching tiles from MapTiler
//         const response = await fetch(osmProviders.maptiler.url);

//         if (response.ok) {
//           // If successful response, reset retry count
//           setRetryCount(0);
//         } else if (response.status === 429 && retryCount < 3) {
//           // If 429 and within retry limit, implement backoff strategy
//           const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
//           setRetryCount(retryCount + 1);

//           // Delay before retrying
//           setTimeout(() => {
//             fetchData();
//           }, delay);
//         } else {
//           // Handle other error scenarios
//           console.error("Error:", response.status, response.statusText);
//         }
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     };

//     fetchData();
//   }, [retryCount]);

//   return (
//     <PageComponent title="LocationTrack">
//       GPS Map
//       <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
//         <TileLayer
//           url={osmProviders.maptiler.url}
//           attribution={osmProviders.maptiler.attribution}
//         />
//       </MapContainer>
//     </PageComponent>
//   );
// };

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import PageComponent from "../components/PageComponent";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import TButton from "../components/core/TButton";


export default function LocationTrack() {

  const location = useGeolocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error){
      mapRef.current.leafletElement.flyTo([location.coordinates.lat, location.coordinates.lng], 20, {animate: true})
    }else{
      alert(location.error.message)
    }
  }


  const MarkersMap = () => {
    const [center, setCenter] = useState({ lat: 14.53106135, lng: 121.02142205 })
    const ZOOM_LEVEL = 20;
  }

  return (
    <PageComponent title="LocationTracker">

      <div>
        <h1>GPS Service</h1>
      </div>
      <MapContainer
        center={[14.53106135, 121.02142205]}
        zoom={20}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {location.loaded && !location.error && (
          <Marker position={[location.coordinates.lat, location.coordinates.lng]}>

          </Marker>
        )}

        <Marker position={[14.53106135, 121.02142205]}>
          <Popup>
            Asia Pacific College <br /> Main Campus
          </Popup>
        </Marker>
      </MapContainer>

          <div className="row my-4">
            <div className="col d-flex justify-content-center">
              <TButton className="btn btn-primary" onClick={showMyLocation}>
                  Locate Me
              </TButton>
            </div>
          </div>

    </PageComponent>
  );
}
