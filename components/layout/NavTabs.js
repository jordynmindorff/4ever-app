import Memories from '../pages/Memories.js';
import Settings from '../pages/Settings.js';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const NavTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Memories') {
						iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
					} else if (route.name === 'Settings') {
						iconName = focused ? 'ios-settings' : 'ios-settings-outline';
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}>
			<Tab.Screen name='Memories' component={Memories} />
			<Tab.Screen name='Settings' component={Settings} />
		</Tab.Navigator>
	);
};

export default NavTabs;
