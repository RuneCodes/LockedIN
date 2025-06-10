import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from "@react-native-community/slider";
import { useToken } from './TokenContext';

import { DefaultTheme } from './src/theme';
import Calendar from './src/components/Calendar';

const NewEvent = () => {

  const navigation = useNavigation();
  const [value, setValue] = React.useState(new Date());
  const [day, setDay] = React.useState();

  const [sliderValue, setSliderValue] = React.useState(0);
  const { setNewDataArray } = useToken();

  const postToBackend = () => {
    const tempArray = [sliderValue, value, day];
    console.log(tempArray);
    setNewDataArray(tempArray);
    navigation.navigate('Home');
  }
  
  function onDayChange(newDate) {
    setDay(newDate);
  }

  const returnHome = () => {
    navigation.navigate('Home');
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableHighlight 
        style={[styles.backButton, styles.shadowProp]} 
        onPress={() => returnHome()}
        underlayColor='#ffffff'
        >
        <Text style={styles.X}>X</Text>
      </TouchableHighlight>
      <View style={styles.card}>
        <Calendar 
        date={value}
        onDateChange={setValue}
           />
      </View>
      <View style={[styles.card, styles.jumpToDateCard]}>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              value={day}
              placeholder="Assessment Name"
              onChangeText={onDayChange}
              style={styles.textinput}
            />
          </View>
        </View>
        <Text style={styles.coll}>
            Study Intensity
        </Text>
        <View style={styles.col}>
          <Slider
            minimumValue={0}
            maximumValue={1}
            step={0.1}
            backgroundColor={'DefaultTheme.primary'}
            minimumTrackTintColor={DefaultTheme.border} 
            thumbTintColor='#cf9a99'
            value={sliderValue}
            onValueChange={(value) => setSliderValue(value)}
          />
        </View>
        <View style={{ padding: 4 }}>
          <Button
            title="go"
            onPress={() => postToBackend()}
            color={DefaultTheme.primary}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: DefaultTheme.background,
    padding: 8,
    marginTop: StatusBar.currentHeight,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  jumpToDateCard: {
    marginTop: 12,
    padding: 12,
  },
  textinput: {
    marginVertical: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: DefaultTheme.border,
    textAlign: 'center',
    borderRadius: 8,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  col: { flex: 1, margin: 4 },
  row: { flexDirection: 'row', flex: 1, marginBottom: 20 },
  coll: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 0,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  X: {
    fontSize: 10,
    fontWeight: 'bold',
  }
});

export default NewEvent;
