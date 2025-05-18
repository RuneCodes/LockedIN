import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  StatusBar,
  Animated, 
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { DefaultTheme } from './src/theme';
import Calendar from './src/components/Calendar';

const NewEvent = () => {

  const navigation = useNavigation();

  const [value, setValue] = React.useState(new Date());
  const [day, setDay] = React.useState();
  const [month, setMonth] = React.useState();
  const [year, setYear] = React.useState();

  function jumpToDate() {
    const newDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    setValue(newDate);
    
  }

  function onDayChange(newDate) {
    if (newDate <= 31) {
      setDay(newDate);
    }
  }

  function onMonthChange(newMonth) {
    if (newMonth <= 12) {
      setMonth(newMonth);
    }
  }

  function onYearChange(newYear) {
    setYear(newYear);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Calendar date={value} />
      </View>
      <View style={[styles.card, styles.jumpToDateCard]}>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              value={day}
              placeholder="Assessment Name"
              onChangeText={onDayChange}
              style={styles.textinput}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <Text style={styles.coll}>
            Study Intensity
        </Text>
        <View style={styles.col}>
          <TextInput
            value={month}
            placeholder="on a scale of 1-10"
            onChangeText={onDayChange}
            style={styles.textinput}
            keyboardType="number-pad"
          />
        </View>
        <View style={{ padding: 4 }}>
          <Button
            title="go"
            onPress={() => navigation.navigate('Home')}
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
  title: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  col: { flex: 1, margin: 4 },
  row: { flexDirection: 'row', flex: 1 },
  coll: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NewEvent;