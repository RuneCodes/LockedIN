import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import Navigation from './Navbar';
import { WebView } from 'react-native-webview';
//import DeviceInfo from 'react-native-device-info';
import * as Device from 'expo-device';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
console.log(Device.deviceType);

class Study extends Component {

  quotes = ["\'Nothing is impossible, the word itself says \'I\'m possible\'!\" - Audrey Hepburn ", "\'Opportunities don't happen, you create them.\' - Chris Grosser ", "\'If you can dream it, you can do it.\' - Walt Disney ", "\'Be yourself; everyone else is already taken.\' - Oscar Wilde ", "\'Just one small positive thought in the morning can change your whole day.\' - Dalai Lama "]
  index = parseInt(Math.random() * 5)
   
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                  <Image
                      source = {require('./assets/lockedIN-logo2.png')}
                      style = {{height:200, width:300}}
                  />
                  <Text style = {styles.paragraph}>
                    {this.quotes[this.index]}
                  </Text>
                 {Device.deviceType == 1 ? 
                 <WebView
                    source={{ uri: 'https://open.spotify.com/playlist/2YZtMaQ7Jfxi0oX9s70nIs?si=e3622fc1ae254260' }}
                    style={styles.webView}
                  /> : 
                  <View style={styles.spotifyBOX}>
                  <Text style={styles.spotifyTEXT}>Connect to</Text>
                  <Image
                    source={require('./assets/Spotify.LOGO1.png')}
                    style={styles.image}
                  />
                </View>}
                   
              </View>
              <Navigation />          
            </View>
      );
   }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
        
    },
    contentContainer: {
        height: 7 *(deviceHeight/8),
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000',
        borderbottomWidth: 10,
        borderColor: 'black',
    },
    paragraph: {
      fontSize: 30,
      color: '#880000',
      marginLeft: 20,
    },
    webView: {
      width: 9*(deviceWidth/13),
      margin: 20,
    },
    image: {
      height: 75,
      width: 75,
    },
    spotifyBOX: {
      jusftifyContent: "row",
      flexDirection: "row",
      alignItems: "center",
      margin: 20,
    },
    spotifyTEXT: {
      fontSize: 40,
      color: '#880000',
      margin: 10,
    },

});

export default Study;
