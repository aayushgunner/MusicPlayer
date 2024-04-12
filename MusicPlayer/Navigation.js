import {NavigationContainer} from '@react-navigation/native';
import Music from './src/Music';
import Home from './src/Home';
import Settings from './src/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabGroup(){
	return(
		<Tab.Navigator>
			<Tab.Screen name = "Home" component={Music}/>
			<Tab.Screen name = "Music" component={Home}/>
			<Tab.Screen name = "Settings" component={Settings}/>
		</Tab.Navigator>
	)
}

export default function Navigation() {
  return (
		<NavigationContainer>
			<TabGroup/>
		</NavigationContainer>
  );
}
