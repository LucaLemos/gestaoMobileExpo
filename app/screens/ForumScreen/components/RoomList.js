import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Button } from 'react-native';

const RoomList = ({ rooms, selectedRoom, onSelectRoom, onCreateRoom, loading }) => {
  return (
    <View style={styles.container}>
      <Button 
        title="Create Room" 
        onPress={onCreateRoom} 
        color="#3498db"
      />
      
      {loading && rooms.length === 0 ? (
        <Text>Loading rooms...</Text>
      ) : (
        <FlatList
          data={rooms}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.roomButton,
                selectedRoom?.id === item.id && styles.selectedRoom
              ]}
              onPress={() => onSelectRoom(item)}
            >
              <Text style={styles.roomName}>{item.name}</Text>
              <Text style={styles.roomDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  listContent: {
    paddingVertical: 5,
  },
  roomButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    minWidth: 120,
  },
  selectedRoom: {
    backgroundColor: '#d4e6ff',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  roomName: {
    fontWeight: 'bold',
  },
  roomDescription: {
    fontSize: 12,
    color: '#666',
  }
});

export default RoomList;