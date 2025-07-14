import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;