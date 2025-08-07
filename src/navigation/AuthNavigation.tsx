
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../signUp/SignUp';
import ForgetPassword from '../forgetPassword/ForgetPassword';
import ResetPassword from '../resetPassword/ResetPassword';
import OTPScreen from '../otpscreen/OTPScreen';

const Stack = createStackNavigator()

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
      <Stack.Screen name="ResetPassword" component={ResetPassword}/>
      <Stack.Screen name="OTPScreen" component={OTPScreen}/>
    </Stack.Navigator>
  )
}

export default AuthNavigation