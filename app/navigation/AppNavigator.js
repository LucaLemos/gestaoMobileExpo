import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import ForumScreen from '../screens/ForumScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Species" component={MainScreen} />
    <Tab.Screen name="Forum" component={ForumScreen} />
  </Tab.Navigator>
);

export default AppNavigator;