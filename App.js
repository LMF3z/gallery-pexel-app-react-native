import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import pexelsLogo from './src/assets/pexels-logo.jpg';
import HomeScreen from './src/screens/HomeScreen';
import ImageScreen from './src/screens/ImageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          options={{
            headerLeft: () => <Image source={pexelsLogo} style={styles.logo} />,
            headerRight: () => (
              <Text
                style={{ color: '#fff', fontSize: 18 }}
                onPress={() => setOpenSearch(!openSearch)}
              >
                {openSearch ? 'Cancel' : 'Search'}
              </Text>
            ),
            title: 'Pexels app',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#0d0d0d',
            },
          }}
        >
          {(props) => <HomeScreen {...props} openSearch={openSearch} />}
        </Stack.Screen>

        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{
            title: 'Image details',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#0d0d0d',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
    marginEnd: 5,
    borderRadius: 5,
  },
});
