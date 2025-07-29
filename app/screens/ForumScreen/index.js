import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { fetchRooms, fetchMessages, sendMessage, createRoom } from '../../services/api';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import CreateRoomModal from './components/CreateRoomModal';

const ForumScreen = ({ route }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = route.params?.username ? true : false;

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom.id);
    }
  }, [selectedRoom]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (roomId) => {
    setLoading(true);
    try {
      const messagesData = await fetchMessages(roomId);
      setMessages(messagesData);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

const handleSendMessage = async (messageData) => {
  if (!selectedRoom || !messageData.content.trim()) return;
  
  try {
    // Optimistic update
    setMessages(prev => [...prev, {
      ...messageData,
      id: Date.now().toString(), // Temporary local ID
      roomId: selectedRoom.id
    }]);
    
    // Send to server
    await sendMessage(selectedRoom.id, {
      content: messageData.content,
      sender_id: messageData.sender_id
    });
    
    // Refresh messages from server
    loadMessages(selectedRoom.id);
  } catch (error) {
    // Rollback
    setMessages(prev => prev.filter(msg => msg.id !== messageData.id));
  }
};

  const handleCreateRoom = async (roomData) => {
    try {
      const newRoom = await createRoom(roomData);
      setRooms(prev => [...prev, newRoom]);
      setSelectedRoom(newRoom);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  return (
    <View style={styles.container}>
      <RoomList 
        rooms={rooms}
        selectedRoom={selectedRoom}
        onSelectRoom={setSelectedRoom}
        onCreateRoom={() => setIsModalVisible(true)}
        loading={loading}
      />
      
      {selectedRoom ? (
        <>
          <MessageList messages={messages} loading={loading} />
          <MessageInput onSend={handleSendMessage} />
        </>
      ) : (
        <View style={styles.placeholder}>
          <Text>Select a room or create a new one</Text>
          {!isLoggedIn && (
            <Button
              title="Login to create rooms"
              onPress={() => navigation.navigate('Login')}
              color="#3498db"
            />
          )}
        </View>
      )}
      
      <CreateRoomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={handleCreateRoom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ForumScreen;