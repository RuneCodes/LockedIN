import { Text, SafeAreaView, StyleSheet, View, FlatList,Dimensions, TouchableHighlight, Image } from 'react-native';
import { useState } from 'react';
import Navigation from './Navbar';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const Calendar = () => {

  state = {
      menuButtonDimensions: 20,
      dayForm: 'loading...',
  }

  const abbreviatedWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  const getCurrentDate =()=> {

      var month = today.getMonth() + 1;
      const dayOfWeek = today.getDay(); 
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["Jan", "Feb","Mar","Apr","May","June","July", "Aug","Sept", "Oct","Nov","Dec"];
 
      return weekDays[dayOfWeek] + ', ' + months[month-1] + ' ' + todayDate;
  }

  const DATA = [
    {
    id: '7 AM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '8 AM',
    title: 'Biology',
    duration: '30',
    description: 'Study for the test',
    event: true,
    day: todayDate,
  },
  {
    id: '9 AM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '10 AM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '11 AM',
    title: 'History',
    duration: '60',
    description: 'Practice presentation on Al Gore',
    event: true,
    day: todayDate,
  },
  {
    id: 'Noon',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '1 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '2 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '3 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '4 PM',
    title: 'Computer Science',
    duration: '30',
    description: 'Work on LockedIN 😎',
    event: true,
    day: todayDate,
  },
  {
    id: '5 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '6 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '7 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '8 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '9 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '10 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '11 PM',
    title: 'Math',
    duration: '30',
    description: 'Work on H.W.',
    event: true,
    day: todayDate,
  },
  {
    id: '12 PM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '1 AM',
    title: 'empty',
    duration: '30',
    description: 'empty',
    event: false,
    day: todayDate,
  },
  {
    id: '2 AM',
    title: 'test event',
    duration: '30',
    description: 'hello!',
    event: true,
    day: todayDate + 3,
  },
];

 const DATE_DATA = Array.from({ length: 7 }).map((_, i) => ({
  id: `bubble-${i}`,
  date: abbreviatedWeekdays[(todayIndex + i) % 7],
  number: todayDate + i,
}));

  const Item = ({ item }) => (
  <View style={[styles.totalitem,
                item.duration <= 30 ? {marginBottom: 50} : {marginBottom: 10}]}>
    <View style={styles.leftTime}>
      <Text style={styles.leftText}>{item.id}</Text>
    </View>
    <View style={[ item.event && item.day == todayDate + highlightedIndex ? styles.item : styles.nonitem, // change logic so event renders to an empty style if it is for that date, current model is not sustainable.
                  { height: (parseInt(item.duration, 10) / 40) * 2 * deviceHeight / 18, }]}>
      <View style={styles.sidebar}>
      </View>
      <View style={[styles.calendarText]}>
        <Text style={styles.calendarTitle}>{item.title}</Text>
        <Text style={styles.calendarSubtext}>{item.description}</Text>
        <Text style={styles.calendarTime}>{item.duration} min</Text>
      </View>
    </View>
  </View>
);

  const [highlightedIndex, sethighlightedIndex] = useState(0);
  const changeHighlightedIndex = (newIndex) => (
    sethighlightedIndex(newIndex)
  );

  const Bubble = ({ bubble, index, highlightedIndex }) => (
    <View style={[styles.bubble, 
                  styles.shadowProp,
                  index == highlightedIndex && {backgroundColor: '#880000'}
                  ]}>
      <Text style={styles.bubbleText}>{bubble.date}</Text>
      <Text style={styles.bubbleText}>{bubble.number}</Text>
    </View>
  );

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.generalContainer}>
        <View style={styles.largerContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('./assets/lockedIN-logo.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.dateIcons}>
          {DATE_DATA.map((bubble, index) => (
            <TouchableHighlight
              underlayColor='#ffffff'
              key={bubble.id}
              onPress={() => changeHighlightedIndex(index)}
            >
              <Bubble bubble={bubble} index={index} highlightedIndex={highlightedIndex}/>
            </TouchableHighlight>
          ))}
        </View>
        <View style={styles.scrollContainer}>
          {
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
          /> }
        </View>
      </View>
      <Navigation />

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 8,
  },
  // MAIN CONTAINER
  generalContainer: {
    backgroundColor: '#00000',
    flex: 1,
  },
  paragraph: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // CALENDAR
  totalitem:{
    flexDirection: 'row',
  },
  leftTime: {
    width: 1.5 * deviceWidth / 10,
    justifyContent: 'top',
    alignItems: 'center',
  },
  leftText: {
    color: '#454444',
    opacity: 0.6,
    fontSize: 13,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  item: {
    width: 8 * deviceWidth / 10,
    backgroundColor: 'rgba(182, 113, 112, 0.5)',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nonitem: {
    width: 8 * deviceWidth / 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'red', // for testing purposes, remove!
    opacity: 0,
  },
  calendarText: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 7.5 * deviceWidth / 10,
  },
  calendarTitle: {
    fontWeight: 'bold',
    color: '#454444',
    width: 2.1 * deviceWidth / 10,
  },
  calendarSubtext: {
    color: '#454444',
    opacity: 0.8,
    width: 3.5 * deviceWidth / 10,
    textAlign: 'left', 
    fontSize: 13,
  },
  calendarTime: {
    color: '#454444',
    opacity: 0.8,
    fontSize: 11,
    paddingRight: 5,
    width: 1.4 * deviceWidth / 10,
  },
  sidebar: {
    backgroundColor: '#B67170',
    width: 1 * deviceWidth / 70,
  },
  // Date Icons
  dateIcons: {
    width: 12 * deviceWidth / 13,
    height: 1.4 * deviceHeight / 18,
    margin: 10,
    marginLeft: deviceWidth / 26,
    marignRight: deviceWidth / 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bubble: {
    width: 1 * deviceWidth / 10,
    height: 1.4 * deviceHeight / 18,
    backgroundColor: '#B67170',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayBubble: {
    width: 1 * deviceWidth / 10,
    backgroundColor: '#880000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    color: 'white',
    fontSize: 10,
    margin: 2,
  },
  // Scroll Container
  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },
  // Image Container
  imageContainer: {
    marginTop: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    width: 8 * deviceWidth / 10,
    height: .5 * deviceHeight / 10,
  },
  largerContainer: {
    alignItems: 'center',
  },  
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  // shadow
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Calendar;
