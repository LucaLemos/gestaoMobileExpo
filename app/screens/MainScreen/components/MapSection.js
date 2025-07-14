import React from 'react';
import { View } from 'react-native';
import { MapView, Marker } from '../../../components/WebSafeMap'; // Changed import source
import styles from '../styles';

const MapSection = ({ especies }) => {
  console.log('[DEBUG] MapSection - Quantidade de marcadores:', especies.length);
  
  const defaultRegion = {
    latitude: -8.0522,
    longitude: -34.9286,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView 
        style={styles.map}
        initialRegion={defaultRegion}
        testID="map-view"
      >
        {especies.slice(0, 100).map((especie, index) => {
          console.log(`[DEBUG] Renderizando marcador ${index + 1}:`, {
            nome: especie.nome_popular,
            lat: especie.latitude,
            lng: especie.longitude
          });
          
          return (
            <Marker
              key={`marker-${especie.nome_cientifico}-${index}`}
              coordinate={{
                latitude: parseFloat(especie.latitude),
                longitude: parseFloat(especie.longitude)
              }}
              title={especie.nome_popular}
              description={especie.nome_cientifico}
              testID={`marker-${index}`}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default MapSection;