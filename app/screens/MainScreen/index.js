import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Button, Text, TextInput } from 'react-native';
import MapSection from './components/MapSection';
import SpeciesList from './components/SpeciesLists';
import styles from './styles';
import { fetchEspecies } from '../../services/api';

const MainScreen = () => {
  const [state, setState] = useState({
    rawEspecies: [],
    groupedEspecies: [],
    displayedEspecies: [],
    selectedEspecies: [],
    loading: true,
    searchText: '',
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0
    }
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const plantas = await fetchEspecies();
        const grouped = groupEspecies(plantas);
        
        setState(prev => ({
          ...prev,
          rawEspecies: plantas,
          groupedEspecies: grouped,
          pagination: {
            ...prev.pagination,
            totalItems: grouped.length
          },
          loading: false
        }));
        
        updateDisplayedEspecies(grouped, 1);
      } catch (error) {
        console.error('[ERRO] Falha ao carregar dados:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    loadData();
  }, []);

  const groupEspecies = (plantas) => {
    const groups = {};
    
    plantas.forEach((item) => {
      const scientificName = item.nome_cientifico || 'Desconhecido';
      const popularName = item.nome_popular || 'Desconhecido';
      
      if (!groups[scientificName]) {
        groups[scientificName] = {
          nome_popular: popularName,
          nome_cientifico: scientificName,
          count: 0,
          items: [],
          latitude: item.latitude, // Adicionado para o mapa
          longitude: item.longitude // Adicionado para o mapa
        };
      }
      
      groups[scientificName].count++;
      groups[scientificName].items.push(item);
    });
    
    return Object.values(groups);
  };

  const updateDisplayedEspecies = (especies, page) => {
    const startIndex = (page - 1) * state.pagination.itemsPerPage;
    const endIndex = startIndex + state.pagination.itemsPerPage;
    
    const filtered = filterEspecies(especies);
    
    const paginated = filtered.slice(startIndex, endIndex);
    
    setState(prev => ({
      ...prev,
      displayedEspecies: paginated,
      pagination: {
        ...prev.pagination,
        currentPage: page,
        totalItems: filtered.length
      }
    }));
  };

  const filterEspecies = (especies) => {
    if (!state.searchText.trim()) {
      return especies;
    }
    
    const searchLower = state.searchText.toLowerCase().trim();

    return especies.filter(item => {
      const nomePopular = item.nome_popular?.toLowerCase() || '';
      const nomeCientifico = item.nome_cientifico?.toLowerCase() || '';
      
      const match = nomePopular.includes(searchLower) || nomeCientifico.includes(searchLower);
      
      return match;
    });
  };

  const handleSearchChange = (text) => {
    setState(prev => {
      const filtered = filterEspecies(prev.groupedEspecies);
      updateDisplayedEspecies(filtered, 1);
      return { ...prev, searchText: text };
    });
  };

  const handleSelectEspecie = (especie) => {
    setState(prev => {
      const isSelected = prev.selectedEspecies.some(
        e => e.nome_cientifico === especie.nome_cientifico
      );
      
      let newSelected;
      if (isSelected) {
        // Remove todas as ocorrências desta espécie
        newSelected = prev.selectedEspecies.filter(
          e => e.nome_cientifico !== especie.nome_cientifico
        );
      } else {
        // Adiciona TODOS os itens desta espécie (do array items)
        newSelected = [
          ...prev.selectedEspecies,
          ...especie.items // Isso adicionará todos os pontos geográficos
        ];
      }
      
      return {
        ...prev,
        selectedEspecies: newSelected
      };
    });
  };

  const changePage = (newPage) => {
    updateDisplayedEspecies(state.groupedEspecies, newPage);
  };

  const totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);

  return (
    <View style={styles.container}>
      
      <MapSection especies={state.selectedEspecies} />
      
      <View style={styles.searchContainer}>
        <TextInput
          value={state.searchText}
          onChangeText={handleSearchChange}
          placeholder="Buscar por nome ou nome científico"
          style={styles.searchInput}
          testID="search-input"
        />
      </View>

      <SpeciesList
        especies={state.displayedEspecies}
        selectedEspecies={state.selectedEspecies}
        onSelectEspecie={handleSelectEspecie}
        loading={state.loading}
        searchText={state.searchText}
      />
      
      {!state.loading && state.pagination.totalItems > 0 && (
        <View style={styles.paginationContainer}>
          <Button
            title="Anterior"
            onPress={() => changePage(state.pagination.currentPage - 1)}
            disabled={state.pagination.currentPage === 1}
            testID="prev-button"
          />
          
          <Text style={styles.pageText} testID="page-indicator">
            Página {state.pagination.currentPage} de {totalPages}
          </Text>
          
          <Button
            title="Próxima"
            onPress={() => changePage(state.pagination.currentPage + 1)}
            disabled={state.pagination.currentPage === totalPages}
            testID="next-button"
          />
        </View>
      )}
      
      {state.loading && (
        <View style={styles.loadingContainer} testID="loading-indicator">
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
    </View>
  );
};

export default MainScreen;