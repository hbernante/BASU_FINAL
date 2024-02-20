import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PageComponent from '../components/PageComponent';
import TButton from '../components/core/TButton';

function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { duration: 0.5 }); // Adjust duration here
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), { duration: 0.5 });
    }
  }, [map, position]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

const LocationTrack = () => {
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      // If geolocation is not supported, show an alert to the user
      alert('Geolocation is not supported by your browser.');
    } else {
      // If geolocation is supported, check if permission is granted
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Permission is granted, do nothing
        },
        () => {
          // Permission is not granted, prompt the user to enable location services
          setShowLocationPrompt(true);
        }
      );
    }
  }, []);

  const handleEnableLocationServices = () => {
    setShowLocationPrompt(false);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Permission is granted after user enables location services, do nothing
      },
      () => {
        // If permission is still not granted after enabling location services, show an alert
        alert('Please enable location services in your browser settings.');
      }
    );
  };

  const handleResetLocation = () => {
    setCurrentLocation(null);
  };

  return (
    <PageComponent>
      <MapContainer
        center={{ lat: 14.5311, lng: -0.09 }}
        zoom={20}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={currentLocation} setPosition={setCurrentLocation} />
      </MapContainer>
      {showLocationPrompt && (
        <div className="location-prompt">
          <p>Please enable location services to use this feature.</p>
          <button onClick={handleEnableLocationServices}>Enable Location Services</button>
        </div>
      )}
      {currentLocation && (
        <div className="reset-button">
          <TButton onClick={handleResetLocation}>Reset Location</TButton>
        </div>
      )}
    </PageComponent>
  );
};

export default LocationTrack;
