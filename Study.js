import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import Navigation from './Navbar';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

class Study extends Component {
   
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                  <Image
                      source = {require('./assets/lockedIN-logo2.png')}
                      style = {{height:300, width:300}}
                  />
                  <Text style = {styles.paragraph}>
                    "Nothing is impossible, the word itself says 'I'm possible'!" - Audrey Hepburn 
                  </Text>
                  --------------------------------------------------------------
                  <View style={styles.spotifyBOX}>
                    <Text style = {styles.spotifyTEXT}>
                      Connect to
                    </Text>
                    <Image
                        source = {require('./assets/Spotify.LOGO1.png')}
                        style = {styles.image}
                    />
                   </View> 
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
        height: 7*(deviceHeight/8),
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderbottomWidth: 10,
        borderColor: 'black',
    },
    paragraph: {
      fontSize: 30,
      color: '#880000',
      marginLeft: 20,
    },
    image: {
      height: 75,
      width: 75,
    },
    spotifyBOX: {
      jusftifyContent: "row",
      flexDirection: "row",
      alignItems: "center",
    },
    spotifyTEXT: {
      fontSize: 40,
      color: '#880000',
      margin: 10,
    },

});

export default Study;
