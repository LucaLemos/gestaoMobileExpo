import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { addPlant } from '../../../services/api';

const AddPlantModal = ({ visible, onClose, onSubmit, currentUser, selectedLocation }) => {
  const [formData, setFormData] = useState({
    nome_cientifico: '',
    nome_popular: '',
    detalhes: '',
    data_plantio: '',
    fonte: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Verifica se pelo menos um dos campos está preenchido
    if (!formData.nome_cientifico.trim() && !formData.nome_popular.trim()) {
        console.log('Erro', 'Por favor, preencha pelo menos o nome científico ou o nome popular');
        return;
    }
    
    // Verifica se há localização selecionada
    if (!selectedLocation) {
      console.log('Erro', 'Por favor, selecione uma localização no mapa');
      return;
    }

    setLoading(true);
    try {
      console.log("aaaaaaaaaaaa")
      const response = await addPlant({
        ...formData,
        usuario_id: currentUser?.id || null,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude
      });

      if (response.success) {
        Alert.alert('Sucesso', 'Planta cadastrada com sucesso!');
        onSubmit(response.plant); // Notifica o componente pai sobre o sucesso
        onClose();
        // Limpa o formulário após o sucesso
        setFormData({
          nome_cientifico: '',
          nome_popular: '',
          detalhes: '',
          data_plantio: '',
          fonte: ''
        });
      } else {
        Alert.alert('Erro', response.message || 'Falha ao cadastrar planta');
      }
    } catch (error) {
      console.error('Erro ao cadastrar planta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a planta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Cadastrar Nova Planta</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome científico*"
              value={formData.nome_cientifico}
              onChangeText={(text) => setFormData({...formData, nome_cientifico: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Nome popular (opcional)"
              value={formData.nome_popular}
              onChangeText={(text) => setFormData({...formData, nome_popular: text})}
            />

            <TextInput
              style={styles.input}
              placeholder="Fonte (opcional)"
              value={formData.fonte}
              onChangeText={(text) => setFormData({...formData, fonte: text})}
            />

            <TextInput
              style={[styles.input, {height: 80}]}
              placeholder="Detalhes adicionais (opcional)"
              multiline
              value={formData.detalhes}
              onChangeText={(text) => setFormData({...formData, detalhes: text})}
            />

            <TextInput
              style={styles.input}
              placeholder="Data do plantio (AAAA-MM-DD)"
              value={formData.data_plantio}
              onChangeText={(text) => setFormData({...formData, data_plantio: text})}
            />

            <View style={styles.buttonRow}>
              <Button 
                title="Cancelar" 
                onPress={onClose} 
                color="#999"
                disabled={loading}
              />
              <Button 
                title={loading ? "Cadastrando..." : "Cadastrar"} 
                onPress={handleSubmit} 
                color="#2ecc71"
                disabled={loading || (!formData.nome_cientifico.trim() && !formData.nome_popular.trim())}
              />
            </View>
          </ScrollView>
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
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#27ae60',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default AddPlantModal;