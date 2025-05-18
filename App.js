import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Homescreen";
import Calendar from "./Calendar";
import Login from "./Login";
import Study from "./Study";
import NewEvent from "./NewEvent";

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        > 
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Calendar' component={Calendar} />
        <Stack.Screen name='NewEvent' component={NewEvent} />
        <Stack.Screen name='Study' component={Study} />

      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
