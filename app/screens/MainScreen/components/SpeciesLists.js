import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import PlantDetailsModal from './PlantDetailsModal';

const SpeciesList = ({ especies, selectedEspecies, onSelectEspecie, loading, searchText }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowDetails = (plant) => {
    setSelectedPlant({
      ...plant.items[0], // Mantém os dados principais
      items: plant.items // Passa todas as ocorrências
    });
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selectedEspecies.some(
      e => e.nome_cientifico === item.nome_cientifico
    );

    return (
      <View style={[styles.speciesCard, isSelected && styles.selectedCard]}>
        {/* Parte clicável para detalhes */}
        <TouchableOpacity
          style={styles.detailsSection}
          onPress={() => handleShowDetails(item)}
          activeOpacity={0.7}
          testID={`species-details-${index}`}
        >
          <View style={styles.cardContent}>
            <Text style={styles.speciesName}>
              {item.nome_popular || 'Sem nome popular'}
            </Text>
            <Text style={styles.scientificName}>
              {item.nome_cientifico}
            </Text>
            <Text style={styles.detailText}>
              Ocorrências: {item.count}
            </Text>
          </View>
          <View style={styles.infoIcon}>
            <Ionicons name="information-circle-outline" size={20} color="#3498db" />
          </View>
        </TouchableOpacity>
        
        {/* Seção do checkbox */}
        <View style={styles.checkboxSection}>
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => onSelectEspecie(item)}
            color="#3498db"
            testID={`species-checkbox-${index}`}
          />
        </View>
      </View>
    );
  };

  if (loading && especies.length === 0) {
    return (
      <View style={styles.loadingContainer} testID="loading-indicator">
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.listContainer} testID="species-list">
      <FlatList
        data={especies}
        renderItem={renderItem}
        keyExtractor={(item) => item.nome_cientifico}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText} testID="empty-message">
            {searchText ? 'Nenhum resultado encontrado' : 'Nenhuma espécie carregada'}
          </Text>
        }
        testID="species-flatlist"
      />

      {/* Modal de detalhes */}
      <PlantDetailsModal
        visible={modalVisible}
        plant={selectedPlant}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default SpeciesList;