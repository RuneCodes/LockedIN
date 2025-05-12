import { Text, SafeAreaView, StyleSheet, View, Dimensions, TouchableHighlight, Image } from 'react-native';
import React from 'react';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const Navigation = () => {

  const menuButtonDimensions = 25;

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.navBG}>
       <TouchableHighlight
            onPress={this.changeScreenMenu}
        >
        <View style={styles.navButtons}>
            <Image
                source={require('./assets/home-icon.png')}
                style={{ height: menuButtonDimensions, width: menuButtonDimensions }}
            />
            
            <Text style={styles.menuText}>
                Home
            </Text>
        </View>
        
        </TouchableHighlight>
        
        <TouchableHighlight
            onPress={this.changeScreenRecord}
        >
        
        <View style={styles.navButtons}>
            <Image
                source={require('./assets/calendar-icon.png')}
                style={{ height: menuButtonDimensions, width: menuButtonDimensions }}
            />
            
            <Text style={styles.menuText}>
                Calendar
            </Text>
        </View>
        
        </TouchableHighlight>

        <TouchableHighlight
            onPress={this.changeScreenEdit}
        >
        
        <View style={styles.specialButton}>
            <Text style={styles.additionText}>
                +
            </Text>
        </View>
        
        </TouchableHighlight>
        
        <TouchableHighlight
            onPress={this.changeScreenEdit}
        >
        
        <View style={styles.navButtons}>
            <Image
                source={require('./assets/music-icon.png')}
                style={{ height: menuButtonDimensions, width: menuButtonDimensions }}
            />
            
            <Text style={styles.menuText}>
                Study
            </Text>
        </View>
        
        </TouchableHighlight>

        <TouchableHighlight
            onPress={this.changeScreenEdit}
        >
        
        <View style={styles.navButtons}>
            <Image
                source={require('./assets/settings-icon2.png')}
                style={{ height: menuButtonDimensions, width: menuButtonDimensions }}
            />
            
            <Text style={styles.menuText}>
                Settings
            </Text>
        </View>
        
        </TouchableHighlight>
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  additionText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#880000',
  },
  menuText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
  },
  navBG: {
    backgroundColor: '#880000',
    height: 1 * (deviceHeight / 8),
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  navButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  },
  specialButton: {
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 20,
    height: 1 * deviceHeight / 10,
    width: 2 * deviceWidth / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigation;
