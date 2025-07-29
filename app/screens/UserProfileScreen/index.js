import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const UserProfileScreen = ({ isLoggedIn, username, navigation }) => {
  const handleLogout = () => {
    // Lógica adicional de logout pode ser adicionada aqui
    navigation.navigate('MainTabs', { username: null });
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.title}>Perfil do Usuário</Text>
          <View style={styles.userInfo}>
            <Text style={styles.infoText}>Logado como:</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
          <Button
            title="Sair"
            onPress={handleLogout}
            color="#e74c3c"
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>Acesso do Usuário</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Fazer Login"
              onPress={() => navigation.navigate('Login')}
              color="#3498db"
            />
            <Button
              title="Criar Conta"
              onPress={() => navigation.navigate('Register')}
              color="#2ecc71"
            />
          </View>
        </>
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#3498db',
  },
  userInfo: {
    marginBottom: 30,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  buttonContainer: {
    gap: 15,
  },
});

export default UserProfileScreen;