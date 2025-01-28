import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 37.7749, // San Francisco coordinates as default
  lng: -122.4194
};

interface Location {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  onPickupSelect: (location: string) => void;
  onDropoffSelect: (location: string) => void;
}

const MapComponent = ({ onPickupSelect, onDropoffSelect }: MapComponentProps) => {
  const [pickupMarker, setPickupMarker] = useState<Location | null>(null);
  const [dropoffMarker, setDropoffMarker] = useState<Location | null>(null);

  const onMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const geocoder = new google.maps.Geocoder();
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    try {
      const response = await geocoder.geocode({ location: latLng });
      if (response.results[0]) {
        const address = response.results[0].formatted_address;
        
        if (!pickupMarker) {
          setPickupMarker(latLng);
          onPickupSelect(address);
        } else if (!dropoffMarker) {
          setDropoffMarker(latLng);
          onDropoffSelect(address);
        } else {
          // Reset markers if both are set
          setPickupMarker(latLng);
          setDropoffMarker(null);
          onPickupSelect(address);
          onDropoffSelect('');
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  }, [pickupMarker, dropoffMarker, onPickupSelect, onDropoffSelect]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDP7mqDex6cHzYmfdKuHuoatjmv4CsOvjQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onClick={onMapClick}
      >
        {pickupMarker && (
          <Marker
            position={pickupMarker}
            label="P"
          />
        )}
        {dropoffMarker && (
          <Marker
            position={dropoffMarker}
            label="D"
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;