import { createStackNavigator } from "@react-navigation/stack"
import Profile from "./Profile"
import Whishlist from "./Whishlist"


const Stack = createStackNavigator()

const ProfileStack = () =>{

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Whishlist" component={Whishlist}/>
        </Stack.Navigator>
    )

}

export default ProfileStack