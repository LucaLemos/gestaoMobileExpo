import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const MessageList = ({ messages, loading }) => {
  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.sender}>{item.senderId}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      inverted // For chat-like behavior (new messages at bottom)
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          {loading ? 'Loading messages...' : 'No messages yet'}
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxWidth: '80%',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  }
});

export default MessageList;