import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import ForumScreen from '../screens/ForumScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserTab = ({ navigation, route }) => {
  // Verifica se há usuário logado
  const isLoggedIn = route.params?.username;

  return (
    <UserProfileScreen 
      isLoggedIn={isLoggedIn}
      username={route.params?.username}
      navigation={navigation}
    />
  );
};

const MainTabs = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Species') {
            iconName = focused ? 'ios-leaf' : 'ios-leaf-outline';
          } else if (route.name === 'Forum') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
      })}
    >
       <Tab.Screen 
         name="Species" 
         component={MainScreen} 
         initialParams={route.params}
       />
       <Tab.Screen 
         name="Forum" 
         component={ForumScreen}
         initialParams={route.params}
       />
       <Tab.Screen 
         name="User" 
         component={UserTab}
         initialParams={route.params}
       />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        initialParams={{ username: null }}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;