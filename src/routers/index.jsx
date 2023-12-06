import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, SignIn, Splash } from '../pages';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? '#'
                  : '@';
              } else if (route.name === 'Profile') {
                iconName = focused ? '#' : '&';
              }
  
              // You can return any component that you like here!
              return <Text>{iconName}</Text>;
            },
            tabBarLabelStyle: {
                fontSize: 17,
              },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}
const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="MainApp" component={MainApp} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})