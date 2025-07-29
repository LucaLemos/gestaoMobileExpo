import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import { MapView, Marker } from '../../../components/WebSafeMap';
import AddPlantModal from './AddPlantModal';

const MapSection = ({ especies }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (e) => {
    console.log("Evento de clique no mapa:", e);
    
    let coords;
    if (Platform.OS === 'web') {
      if (!e.latLng) {
        console.error("Objeto latLng não encontrado no evento");
        return;
      }
      coords = {
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng()
      };
    } else {
      if (!e.nativeEvent || !e.nativeEvent.coordinate) {
        console.error("Coordenadas não encontradas no evento nativo");
        return;
      }
      coords = e.nativeEvent.coordinate;
    }
    
    setSelectedLocation(coords);
    setIsModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -8.0522,
          longitude: -34.9286,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={handleMapPress}
      >
        {especies.map((especie, index) => {
          // Verifique se a espécie tem coordenadas válidas
          if (!especie.latitude || !especie.longitude) return null;
          
          return (
            <Marker
              key={`${especie.nome_cientifico}-${index}`}
              coordinate={{
                latitude: parseFloat(especie.latitude),
                longitude: parseFloat(especie.longitude)
              }}
              title={especie.nome_popular || especie.nome_cientifico}
              description={`Ocorrências: ${especie.count}`}
              pinColor="#2ecc71" // Cor verde para as plantas
            />
          );
        })}
      </MapView>

      <AddPlantModal
        visible={isModalVisible}
        selectedLocation={selectedLocation}
        onClose={() => setIsModalVisible(false)}
        onSubmit={(data) => {
          console.log("Dados do formulário:", data);
          setIsModalVisible(false);
        }}
      />
    </View>
  );
};

export default MapSection;