/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';

import Toast from 'react-native-toast-message';
import Navigation from './src/navigation/Navigation';
import Home from './src/Home';
import { NavigationContainer } from '@react-navigation/native';



const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

export default App;
