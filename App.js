import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Homescreen";
import Calendar from "./Calendar";
import Login from "./Login";
import Study from "./Study";
import NewEvent from "./NewEvent";
import Settings from "./Settings";
import GoogleLogin from "./GoogleLogin";
import { TokenProvider } from './TokenContext';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
     <TokenProvider>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        > 
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='TokenInput' component={GoogleLogin} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Calendar' component={Calendar} />
        <Stack.Screen name='NewEvent' component={NewEvent} />
        <Stack.Screen name='Study' component={Study} />
        <Stack.Screen name="Settings" component={Settings} />

      </Stack.Navigator>
      </NavigationContainer>
      </TokenProvider>
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
});
