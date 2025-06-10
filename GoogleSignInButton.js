import React, { useState } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton({ onSignIn }) {

  const navigation = useNavigation();
  //https://auth.expo.io
  const redirectURL =  'https://auth.expo.io/@hcoulson26/lockedin-with-api'; //AuthSession.makeRedirectUri({useProxy: true}) 

  const [request, response, promptAsync] = Google.useAuthRequest({
    //expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: '516737559102-jga8re2v46uiabotpt2mbrs897653632.apps.googleusercontent.com',
    //androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: '516737559102-0uuvlfa4chn6gpqohjh3vvfr1k2devcd.apps.googleusercontent.com',
    scopes: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
    'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
  ],
    redirectUri:  redirectURL,
    behavior: 'web',
  });

  React.useEffect(() => {
    
    console.log('OAuth response:', response); 
    console.log('REQUEST' + request);
    if (response?.type === 'success') {
      const { authentication } = response;
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
        .then(res => res.json())
        .then(data => { 
          console.log("TEST " + JSON.stringify(data))
        })
      console.log(authentication);
      console.log("RESPONSE SUCESSS");
    } else if (response?.type === 'error') {
    console.error('OAuth error:', response.error, response.params);
  } else if (response?.type === 'dismiss') {
    console.log('OAuth flow was dismissed by the user.');
    navigation.navigate('TokenInput');
  }
  
  }, [response]);


  return (
    <TouchableHighlight
        onPress={() => promptAsync({ useProxy: true })}
        underlayColor='#ffffff'
      >
      <Text style={styles.Signtext}>
          Activate Google Sign in
    </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    Signtext : {
      color: 'black',
      fontSize: '20',
      justifyContent: 'center',
      fontFamily: 'avenir',
      textAlign: 'center',
    },
});
