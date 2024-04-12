import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Music from './src/Music';
import Home from './src/Home';
import Settings from './src/Settings';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabGroup(){
	return(
		<Tab.Navigator screenOptions={({route, navigation}) => ({
			tabBarIcon: ({color, focused, size }) => {
				let iconName;
				if (route.name === "Home"){
					iconName = focused ? "home" : "home-outline";
				} else if (route.name === "Music"){
					iconName = focused ? "musical-notes" : "musical-notes-outline";
				} else if (route.name === "Settings"){
					iconName = focused ? "settings-sharp" : "settings-outline";
				}
				return <Ionicons name = {iconName} size={size} color={color} />
				},
		})}>
			<Tab.Screen name = "Home" component={Home}/>
			<Tab.Screen name = "Music" component={Music}/>
			<Tab.Screen name = "Settings" component={Settings}/>
		</Tab.Navigator>
	)
}

export default function Navigation() {
  return (
		<NavigationContainer >
			<TabGroup/>
		</NavigationContainer>
  );
}

