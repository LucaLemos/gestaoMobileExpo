import { Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

let MapView, Marker;

if (Platform.OS === 'web') {
  MapView = ({ style, children, initialRegion }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    
    useEffect(() => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD7tEhaLvbXk52_tvhHUQHeiWxsSbkT4jQ`;
        script.async = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }

      function initializeMap() {
        const center = initialRegion 
          ? { lat: initialRegion.latitude, lng: initialRegion.longitude }
          : { lat: -8.0522, lng: -34.9286 };
        
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 12
        });
        setMap(map);
      }

      return () => {
        markers.forEach(marker => marker.setMap(null));
      };
    }, []);

    useEffect(() => {
      if (!map || !children) return;

      const newMarkers = React.Children.map(children, child => {
        if (child.type === Marker) {
          const { coordinate, title, onPress, pinColor } = child.props;
          const marker = new window.google.maps.Marker({
            position: { lat: coordinate.latitude, lng: coordinate.longitude },
            map,
            title,
            icon: pinColor ? {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: pinColor,
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 10
            } : null
          });

          if (onPress) {
            marker.addListener('click', onPress);
          }

          return marker;
        }
        return null;
      }).filter(Boolean);

      setMarkers(prev => {
        prev.forEach(marker => marker.setMap(null));
        return newMarkers;
      });
    }, [children, map]);

    return (
      <div
        ref={mapRef}
        style={{
          ...style,
          height: '300px',
          backgroundColor: '#e0e0e0',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      />
    );
  };

  Marker = ({ children }) => {
    return children;
  };
} else {
  const ReactNativeMaps = require('react-native-maps');
  MapView = ReactNativeMaps.default;
  Marker = ReactNativeMaps.Marker;
}

export { MapView, Marker };