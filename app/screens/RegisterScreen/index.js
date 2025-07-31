import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { registerUser } from '../../services/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({ username, password });
      if (response.success) {  
        navigation.navigate('MainTabs', {
          username: response.user?.username || username,
          screen: 'User' // Redireciona para a aba User após cadastro
        })
      } else {
        
      }
    } catch (error) {
      console.error('Registration error:', error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="Cadastrar"
            onPress={handleRegister}
            color="#3498db"
          />
          <Button
            title="Voltar"
            onPress={() => navigation.goBack()}
            color="#95a5a6"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    gap: 10,
  }
});

export default RegisterScreen;