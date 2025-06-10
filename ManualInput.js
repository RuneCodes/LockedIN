import React, { useState } from 'react';
import { TextInput, Button, Text, View, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useToken } from './TokenContext';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function ManualInput({ onToken }) {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const { setToken } = useToken();

  function handleExtract() {
    const hash = input.split('#')[1];
    if (hash) {
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      setToken(accessToken);
      if (accessToken) onToken(accessToken);
    }
    navigation.navigate('Home');

  }


  return (
    <View style={styles.container}>
      <TextInput 
      value={input} 
      onChangeText={setInput} 
      style={styles.inputField} 
      placeholder="OAuth URL" 
      multiline={true}
      />

      <TouchableHighlight
            onPress={handleExtract}
            underlayColor='#ffffff'
            style={styles.loginBox}
          >
        <Text style={styles.text}>
            Proceed
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export let token;


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputField: {
    color: '#880000',
    fontSize: deviceHeight / 29,
    textAlign: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#880000',
    paddingHorizontal: 10,
    width: 4 * (deviceWidth / 6),
    height: deviceHeight / 6,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  loginBox: {
    height: deviceHeight / 10,
    marginTop: 70,
    marginBottom: 4,
    width: 4 * (deviceWidth / 1),
    backgroundColor: '#880000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: '20',
    justifyContent: 'center',
    fontFamily: 'avenir',
    textAlign: 'center',
  },
});
