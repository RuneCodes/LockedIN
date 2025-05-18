import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {/* Your screen content here */}
  </View>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'maroon',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <View style={{ marginLeft: 15 }}>
            <Image
              source={require('https://www.svgrepo.com/show/135822/home-icon-silhouette.svg')}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </View>
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;