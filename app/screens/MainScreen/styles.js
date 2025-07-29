import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  searchInput: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    fontSize: 16,
    elevation: 2,
  },
  mapContainer: {
    height: 250,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  resultsText: {
    textAlign: 'center',
    padding: 10,
    color: '#555',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listContent: {
    paddingBottom: 20,
  },
  speciesCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectedCard: {
    backgroundColor: '#f0f7ff',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  cardContent: {
    flex: 1,
    marginRight: 10
  },
  speciesName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db'
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 2
  },
  detailText: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 5
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontStyle: 'italic',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  pageText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  speciesCard: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  marginHorizontal: 10,
  marginBottom: 10,
  elevation: 2,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
},
detailsSection: {
  flex: 1,
  paddingRight: 10,
},
checkboxSection: {
  marginLeft: 10,
},
cardContent: {
  flex: 1,
},
detailsSection: {
  flex: 1,
  paddingRight: 10,
  flexDirection: 'row',
  alignItems: 'center',
},
checkboxSection: {
  marginLeft: 10,
},
infoIcon: {
  marginLeft: 10,
},
cardContent: {
  flex: 1,
},
});