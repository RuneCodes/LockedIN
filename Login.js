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

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


class Login extends Component {
  

  state = {
    logIn: 'Log In',
    signUp: 'Sign In with Google',
    username: '',
    password: '',
    userInfo: '',
    uri: 'https://codehs.com/uploads/c799accde67e1fd3bbd699119b4e1c83',
  };

  handleNamePress = () => {
    this.setState({
      nameDisplay: 'block',
      scoreDisplay: 'none',
      standingsDisplay: 'none',
    });
  };

  loginState = () => {
    this.setState({
      logIn: 'Woo hoo, you logged in!',
      uri: 'https://codehs.com/uploads/e6a75f14f57912fe8bd1722a30b98942',
      signUp: 'Sign Up',
    });
    this.props.navigation.navigate('Home');
  };

  signupState = () => {
    this.props.navigation.navigate("TokenInput")
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.yellowBox}>
          <Image
            source={require('./assets/lockedIN-logo2.png')}
            style={{ height: 200, width: 300 }}
          />
          <TextInput
            style={styles.inputField}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            placeholder="username"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.inputField}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            placeholder="password"
            secureTextEntry={true}
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.loginBox}>
          <TouchableHighlight style={styles.loginBox} onPress={this.loginState}>
            <Text style={styles.text}>{this.state.logIn}</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.ORtext}> --------- OR ----------</Text>
        <View style={styles.signUpBox}>
          <TouchableHighlight
            onPress={this.signupState}
            underlayColor='#ffffff'

          >
            <Text style={styles.Signtext}>
            Google Sign in Page
          </Text>
              </TouchableHighlight>
        </View>
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
    height: 4.5 * (deviceHeight / 7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    color: '#880000',
    fontSize: deviceHeight / 20,
    textAlign: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#880000',
    paddingHorizontal: 10,
    width: 4 * (deviceWidth / 6),
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  loginBox: {
    height: deviceHeight / 10,
    marginTop: 4,
    marginBottom: 4,
    width: 4 * (deviceWidth / 1),
    backgroundColor: '#880000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBox: {
    height: deviceHeight / 10,
    width: 4 * (deviceWidth / 6),
    marginTop: 30,
    marginBottom: 4,
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
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: '20',
    justifyContent: 'center',
    fontFamily: 'avenir',
    textAlign: 'center',
  },
});

export default Login;
