/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Home';
import Cart from './src/Cart';
import Profile from './src/Profile';
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from 'react-native-size-matters';
import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';

const Tab = createBottomTabNavigator()

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            options={{
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "grey",
              tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
              tabBarLabelStyle: { fontSize: moderateScale(10) }
            }}
            name="Home" component={Home}
          />
          <Tab.Screen
            options={{
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "grey",
              tabBarIcon: ({ color, size }) => <Feather name="shopping-cart" color={color} size={size} />,
              tabBarLabelStyle: { fontSize: moderateScale(10) }
            }}
            name="Cart" component={Cart} />
          <Tab.Screen
            options={{
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "grey",
              tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
              tabBarLabelStyle: { fontSize: moderateScale(10) }
            }}
            name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
