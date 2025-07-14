import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Temporary message object structure
      onSend({
        content: message,
        sender_id: 1, // Temporary hardcoded sender ID
        timestamp: new Date().toISOString()
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        multiline
      />
      <Button
        title="Send"
        onPress={handleSend}
        disabled={!message.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  }
});

export default MessageInput;