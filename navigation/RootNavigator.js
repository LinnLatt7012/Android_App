import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
// Import mock screens
import BooksList from '../screens/BooksList';
import BookmarksList from '../screens/BookmarksList';

const Tab = createBottomTabNavigator();
  
const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
        case 'BooksList':
        iconName = 'file';
        break;
        case 'BookmarksList':
        iconName = 'home';
        break;
        default:
        break;
    }
return <FontAwesomeIcons name={iconName} color={color} size={24} />;
};

const RootNavigator = () => {
return (
    <NavigationContainer>
      <Tab.Navigator
          initialRouteName='BooksList'
          screenOptions={
            ({ route }) => ({
              tabBarActiveTintColor:'#e91e63',
              tabBarInactiveTintColor: '#4f0e63',
              tabBarIcon: ({ color }) => screenOptions(route, color)
            })
          }
      >
          <Tab.Screen name='BooksList' component={BooksList}  />
          <Tab.Screen name='BookmarksList' component={BookmarksList} />
      </Tab.Navigator>
    </NavigationContainer>
);
};
  
export default RootNavigator;