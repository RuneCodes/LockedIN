import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Dimensions,
  TouchableHighlight,
  Image,
  TextInput,
} from 'react-native';
import { Component } from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import ManualInput from "./ManualInput";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


class GoogleLogin extends Component {

  onSignIn = (userInfo) => {
    this.setState({ userInfo });
    this.props.navigation.navigate('Home');
  };

  onEntry = (userInfo) => {
    //console.log(userInfo);
    //console.log('Signin function executed');
  };

  loginState = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.yellowBox}>
          <Image
            source={require('./assets/lockedIN-logo2.png')}
            style={{ height: 180, width: 300 }}
          />
        </View>
        <View style={styles.signUpBox}>
          <GoogleSignInButton onSignIn={this.onSignIn} />
        </View>
        <ManualInput onToken={this.onEntry} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: 'center',
  },
  yellowBox: {
    height: 3.2 * (deviceHeight / 7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpBox: {
    height: deviceHeight / 14,
    width: 4 * (deviceWidth / 6),
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
  },
  Signtext: {
    color: 'black',
    fontSize: '20',
    justifyContent: 'center',
    fontFamily: 'avenir',
    textAlign: 'center',
  },
  ORtext: {
    color: '#880000',
  },
  text: {
    color: 'white',
    fontSize: '20',
    justifyContent: 'center',
    fontFamily: 'avenir',
    textAlign: 'center',
  },
});

export default GoogleLogin;
