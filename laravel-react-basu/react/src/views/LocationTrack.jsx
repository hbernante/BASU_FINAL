import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PageComponent from '../components/PageComponent';
import TButton from '../components/core/TButton';
import { updateLocation, getLocation } from '../axios'; // Import the updateLocation and getLocation functions

function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { duration: 3 }); // Adjust duration here
      // Update the user's location when found
      updateLocation(e.latlng.lat, e.latlng.lng); // Call the updateLocation function
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), { duration: 3 });
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
    // Update the user's location to null when resetting
    updateLocation(null, null); // Call the updateLocation function with null values
  };

  useEffect(() => {
    // Fetch user's location when the component mounts
    const fetchUserLocation = async () => {
      try {
        const location = await getLocation(); // Call the getLocation function
        if (location) {
          setCurrentLocation({ lat: location.latitude, lng: location.longitude });
        }
      } catch (error) {
        console.error('Failed to get user location:', error);
      }
    };

    fetchUserLocation();
  }, []);

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
