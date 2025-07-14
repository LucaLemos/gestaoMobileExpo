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

  // Debug: Monitorar mudanças no state
  useEffect(() => {
    console.log('State atualizado:', {
      searchText: state.searchText,
      totalItems: state.pagination.totalItems,
      currentPage: state.pagination.currentPage,
      loading: state.loading,
      selectedCount: state.selectedEspecies.length
    });
  }, [state]);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('[DEBUG] Iniciando carregamento de dados...');
        const especies = await fetchEspecies();
        console.log('[DEBUG] Dados brutos recebidos - Quantidade:', especies.length);
        
        const grouped = groupEspecies(especies);
        console.log('[DEBUG] Dados agrupados - Grupos únicos:', grouped.length);
        
        setState(prev => ({
          ...prev,
          rawEspecies: especies,
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

  const groupEspecies = (especies) => {
    console.log('[DEBUG] Agrupando espécies...');
    const groups = {};
    
    especies.forEach((item, index) => {
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

      // Debug: Mostrar primeiros 3 itens
      if (index < 3) {
        console.log(`[DEBUG] Item ${index + 1}:`, {
          nome_popular: popularName,
          nome_cientifico: scientificName,
          latitude: item.latitude,
          longitude: item.longitude
        });
      }
    });
    
    return Object.values(groups);
  };

  const updateDisplayedEspecies = (especies, page) => {
    const startIndex = (page - 1) * state.pagination.itemsPerPage;
    const endIndex = startIndex + state.pagination.itemsPerPage;
    
    const filtered = filterEspecies(especies);
    console.log(`[DEBUG] Filtro aplicado - Resultados: ${filtered.length}`);
    
    const paginated = filtered.slice(startIndex, endIndex);
    console.log(`[DEBUG] Paginação - Página ${page}:`, paginated.length, 'itens');
    
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
      console.log('[DEBUG] Sem texto de busca - retornando todas espécies');
      return especies;
    }
    
    const searchLower = state.searchText.toLowerCase().trim();
    console.log(`[DEBUG] Buscando por: "${searchLower}"`);

    return especies.filter(item => {
      const nomePopular = item.nome_popular?.toLowerCase() || '';
      const nomeCientifico = item.nome_cientifico?.toLowerCase() || '';
      
      const match = nomePopular.includes(searchLower) || nomeCientifico.includes(searchLower);
      
      if (match) {
        console.log('[DEBUG] Match encontrado:', {
          nome_popular: item.nome_popular,
          nome_cientifico: item.nome_cientifico,
          termo_buscado: searchLower
        });
      }
      
      return match;
    });
  };

  const handleSearchChange = (text) => {
    console.log('[DEBUG] Input de busca alterado:', text);
    setState(prev => {
      const filtered = filterEspecies(prev.groupedEspecies);
      updateDisplayedEspecies(filtered, 1);
      return { ...prev, searchText: text };
    });
  };

  const handleSelectEspecie = (especie) => {
    console.log('[DEBUG] Selecionando espécie:', {
      nome: especie.nome_popular,
      cientifico: especie.nome_cientifico
    });
    
    setState(prev => {
      const isSelected = prev.selectedEspecies.some(
        e => e.nome_cientifico === especie.nome_cientifico
      );
      
      const newSelected = isSelected
        ? prev.selectedEspecies.filter(e => e.nome_cientifico !== especie.nome_cientifico)
        : [...prev.selectedEspecies, especie];
      
      console.log(`[DEBUG] Itens selecionados: ${newSelected.length}`);
      return {
        ...prev,
        selectedEspecies: newSelected
      };
    });
  };

  const changePage = (newPage) => {
    console.log('[DEBUG] Mudando para página:', newPage);
    updateDisplayedEspecies(state.groupedEspecies, newPage);
  };

  const totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={state.searchText}
          onChangeText={handleSearchChange}
          placeholder="Buscar por nome ou nome científico"
          style={styles.searchInput}
          testID="search-input"
        />
      </View>
      
      <MapSection especies={state.displayedEspecies} />
      
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