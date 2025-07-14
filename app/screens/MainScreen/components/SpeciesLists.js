import React from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from '../styles';

const SpeciesList = ({ especies, selectedEspecies, onSelectEspecie, loading, searchText }) => {
  console.log('[DEBUG] SpeciesList - props:', {
    especiesCount: especies.length,
    searchText,
    selectedCount: selectedEspecies.length
  });

  const renderItem = ({ item, index }) => {
    console.log(`[DEBUG] Renderizando item ${index + 1}:`, {
      nome_popular: item.nome_popular,
      nome_cientifico: item.nome_cientifico,
      count: item.count
    });

    const isSelected = selectedEspecies.some(
      e => e.nome_cientifico === item.nome_cientifico
    );

    return (
      <TouchableOpacity
        style={[
          styles.speciesCard,
          isSelected && styles.selectedCard
        ]}
        onPress={() => {
          console.log('[DEBUG] Item pressionado:', item.nome_popular);
          onSelectEspecie(item);
        }}
        activeOpacity={0.7}
        testID={`species-item-${index}`}
      >
        <View style={styles.cardContent}>
          <Text style={styles.speciesName} testID="species-popular-name">
            {item.nome_popular}
          </Text>
          <Text style={styles.scientificName} testID="species-scientific-name">
            {item.nome_cientifico}
          </Text>
          <Text style={styles.detailText} testID="species-count">
            Ocorrências: {item.count}
          </Text>
        </View>
        
        <Checkbox
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => onSelectEspecie(item)}
          color="#3498db"
          testID="species-checkbox"
        />
      </TouchableOpacity>
    );
  };

  if (loading && especies.length === 0) {
    console.log('[DEBUG] Mostrando indicador de carregamento');
    return (
      <View style={styles.loadingContainer} testID="loading-indicator">
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  console.log('[DEBUG] Renderizando lista de espécies');
  return (
    <View style={styles.listContainer} testID="species-list">
      <Text style={styles.resultsText} testID="results-info">
        Mostrando {especies.length} de {selectedEspecies.length} selecionadas
      </Text>
      
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
    </View>
  );
};

export default SpeciesList;