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
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from 'react-native-size-matters';
import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';
import ProfileStack from './src/ProfileStack';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './src/signUp/SignUp';

const Tab = createBottomTabNavigator()
const Screen = createStackNavigator()

const AuthNavigation = () => {
  return (
    <Screen.Navigator screenOptions={{headerShown:false}}>
      <Screen.Screen name="SignUp" component={SignUp} />
    </Screen.Navigator>
  )
}

const AppNavigation = () => {
  return (
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
        name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  )
}

function App() {
  const [token, setToken] = useState("")
  return (
    <Provider store={Store}>
      <NavigationContainer>
        {token ? AppNavigation() : AuthNavigation()}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
