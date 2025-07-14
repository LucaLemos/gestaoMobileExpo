import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const CreateRoomModal = ({ visible, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (name.trim()) {
      onCreate({
        name,
        description,
        creator_id: 1, // Hardcoded for testing
        createdAt: new Date().toISOString()
      });
      setName('');
      setDescription('');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create New Room</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Room name"
            value={name}
            onChangeText={setName}
          />
          
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="#999" />
            <Button 
              title="Create" 
              onPress={handleCreate} 
              disabled={!name.trim()}
              color="#3498db"
            />
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
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  descriptionInput: {
    height: 80,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default CreateRoomModal;