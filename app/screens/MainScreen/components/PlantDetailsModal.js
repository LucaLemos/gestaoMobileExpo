import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPlantComments, addPlantComment } from '../../../services/api';

const PlantDetailsModal = ({ visible, plant, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentUserId] = useState(1);

  // Carregar comentários
  useEffect(() => {
    if (!plant?.id) return;

    const loadComments = async () => {
      try {
        const data = await getPlantComments(plant.id);
        setComments(data);
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };
    
    if (visible) loadComments();
  }, [visible, plant?.id]);
  
  // Adicionar comentário
  const handleAddComment = async () => {
    if (!newComment.trim() || !plant?.id) return;
  
    try {
      const response = await addPlantComment({
        plantId: plant.id,
        userId: currentUserId, // ID fixo para testes
        text: newComment
      });
      
      setComments([response, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Full error details:', error);
      Alert.alert(
        'Erro', 
        error.message || 'Não foi possível adicionar o comentário'
      );
    }
  };

  if (!plant) return null;

  // Função para renderizar cada item da lista de localizações
  const renderLocationItem = ({ item, index }) => (
    <View style={styles.locationItem}>
      <Ionicons name="location-sharp" size={20} color="#27ae60" style={styles.locationIcon} />
      <View style={styles.locationDetails}>
        <Text style={styles.locationText}>
          <Text style={styles.locationLabel}>Latitude:</Text> {item.latitude}
        </Text>
        <Text style={styles.locationText}>
          <Text style={styles.locationLabel}>Longitude:</Text> {item.longitude}
        </Text>
        {item.data_plantio && (
          <Text style={styles.locationText}>
            <Text style={styles.locationLabel}>Plantada em:</Text> {new Date(item.data_plantio).toLocaleDateString()}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Planta</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nome Científico:</Text>
              <Text style={styles.detailValue}>{plant.nome_cientifico || 'Não informado'}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nome Popular:</Text>
              <Text style={styles.detailValue}>{plant.nome_popular || 'Não informado'}</Text>
            </View>
            
            {plant.detalhes && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Detalhes:</Text>
                <Text style={[styles.detailValue, styles.detailsText]}>{plant.detalhes}</Text>
              </View>
            )}
            
            <Text style={styles.sectionTitle}>Localizações Registradas:</Text>
            
            <FlatList
              data={plant.items || [plant]}
              renderItem={renderLocationItem}
              keyExtractor={(item, index) => `location-${index}`}
              scrollEnabled={false}
              style={styles.locationsList}
            />

            <Text style={styles.sectionTitle}>Comentários:</Text>
            
            {comments.length > 0 ? (
              <FlatList
                data={comments}
                renderItem={({ item }) => (
                  <View style={styles.commentItem}>
                    <Text style={styles.commentAuthor}>{item.author || 'Anônimo'}</Text>
                    <Text style={styles.commentText}>{item.comment_text}</Text>
                    <Text style={styles.commentDate}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            ) : (
              <Text style={styles.emptyText}>Nenhum comentário ainda</Text>
            )}

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Adicionar comentário..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity 
                style={styles.commentButton}
                onPress={handleAddComment}
                disabled={!newComment.trim()}
              >
                <Text style={styles.commentButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
            
          <View style={styles.fixedFooter}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#27ae60',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 120,
    color: '#555',
  },
  detailValue: {
    flex: 1,
    color: '#333',
  },
  detailsText: {
    marginTop: 5,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#27ae60',
  },
  locationsList: {
    marginBottom: 15,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationIcon: {
    marginRight: 10,
  },
  locationDetails: {
    flex: 1,
  },
  locationText: {
    marginBottom: 3,
    color: '#555',
  },
  locationLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  commentItem: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#27ae60',
  },
  commentText: {
    marginVertical: 5,
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    minHeight: 50,
  },
  commentButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  fixedFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  closeButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PlantDetailsModal;