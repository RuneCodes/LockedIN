import { Text, SafeAreaView, StyleSheet, Dimensions, View, Switch, TouchableHighlight, Image } from 'react-native';
import React, {useState} from 'react';
import Navigation from './Navbar';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';


const Settings = () => {

  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function logout() {
    navigation.navigate("Login")
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Contentcontainer}>
        <View style={{alignItems: 'center'}}>
          <Image
              source = {require('./assets/lockedIN-logo.png')}
              style = {{height:100, width: 6 * deviceWidth / 6}}
          />
        </View>
        <View style={styles.horizontalline}>
        </View>
        <View style={styles.notifsbox}>
          <Text style={styles.normaltext}>
            Notifications
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#e7bcbc' }}
            thumbColor={isEnabled ? '#B67170' : '#e0e0e0'}
            ios_backgroundColor="#767577"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.horizontalline}>
        </View>
        <View style={styles.placeholderBox}>
          <Text style={styles.accounttextBold}>
            Account Information
          </Text>
          <Text style={styles.accounttext}>
            Email: jjadav@scarsdaleschools.org
          </Text>
          <Text style={styles.accounttext}>
            Member for 3 days!
          </Text>
          <Text style={styles.accounttext}>
            You have done 5 sessions!
          </Text>
          <Text style={styles.accounttext}>
            Spotify: jjadav
          </Text>
          <View style={styles.horizontalline}>
          </View>

        </View>
        <View style={styles.placeholderBoxother}>
          <Text style={styles.gcspotifytext}>
            Change
          </Text>
          <Image
            source = {require('./assets/classroom-color.png')}
            style = {styles.notifimage}
          />
          <Text style={styles.gcspotifytext}>
            Change
          </Text>
          <Image
            source = {require('./assets/small-spotify.png')}
            style = {styles.notifimage}
          />

        </View>
        <View style={styles.horizontalline}>
        </View>
         <TouchableHighlight
            onPress={() => { 
                alert('Text 914-498-9780 with your bugs, and they will be fixed as fast as possible') 
            }}
          >
          <Text style={styles.accounttext}>
              Report Bugs
          </Text>
        </TouchableHighlight>
      <View style={styles.horizontalline}>
      </View>
      <TouchableHighlight
        onPress={() => logout()}
        underlayColor='#ecf0f1'
        >
      <Text style={styles.logouttext}>
        LOGOUT 
      </Text>
      </TouchableHighlight>
      </View>
      <Navigation />
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
  Contentcontainer: {
    height: 7*(deviceHeight/8),
  },
  navbarContainer: {
      height: deviceHeight/6,
      width: deviceWidth,
      backgroundColor: 'maroon',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderTopWidth: 10,
      borderColor: 'darkwhite',
  },
  normaltext: {
    fontSize: 20,
    fontStyle: 'comfortaa',
    marginRight: 170,
    marginLeft: 10,
  },
  notifsbox:  {
    height: 40,
    width: 400,
    flexDirection: 'row',
  },
  notifimage: {
    height: 60,
    width: 60,
    marginBottom: 8,
  },
  horizontalline: {
    height: 5,
    width: 700,
    marginBottom: 10,
    backgroundColor: 'black',
  },
  placeholderBox: {
    flexDirection: 'column',
    justifyContent: 'right',
    height: 200,
    width: 350,

  },
  accounttext:  {
    fontSize: 20,
    fontStyle: 'comfortaa',
    marginBottom: 10,
    textAlign: 'center',
  },
  accounttextBold:  {
    fontSize: 20,
    fontStyle: 'comfortaa',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  placeholderBoxother: {
    flexDirection: 'row',
    height: 70,
    width: 400,
  },
  logouttext:  {
    fontSize: 20,
    fontStyle: 'comfortaa',
    marginBottom: 10,
    textAlign: 'center',
    color: 'red',
  },
  gcspotifytext:  {
    fontSize: 25,
    fontStyle: 'comfortaa',
    marginTop: 10,
    textAlign: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Settings;