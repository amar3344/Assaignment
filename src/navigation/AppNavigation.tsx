import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Cart from '../Cart';
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from 'react-native-size-matters';
import ProfileStack from '../ProfileStack';

const Tab = createBottomTabNavigator()

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

export default AppNavigation