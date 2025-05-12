import { Text, SafeAreaView, StyleSheet, View, FlatList,Dimensions, TouchableHighlight, Image } from 'react-native';
import Navigation from "./Navbar";
import React, { useState } from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function App() {

  state = {
      menuButtonDimensions: 20,
      dayForm: 'loading...',
  }

  const getCurrentDate = ()=> {

      var month = today.getMonth() + 1;
      const dayOfWeek = today.getDay(); 
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["Jan", "Feb","Mar","Apr","May","June","July", "Aug","Sept", "Oct","Nov","Dec"];
 
      return weekDays[dayOfWeek] + ', ' + months[month-1] + ' ' + todayDate;
  }

  const ASSESSMENT_DATA = [
    {
    id: 0,
    title: 'CS HW',
    due: 'Due Thur, June 5',
    time: '12:00 - 1:00 PM',
    image: 'science',
    classification: 'to-do',
    },
    {
    id: 1,
    title: 'APP DEV Project',
    due: 'Due Sat, June 7',
    time: '5:00 - 6:00 PM',
    image: 'science',
    classification: 'project',
  },
  {
    id: 2,
    title: 'BIOLOGY ASSESSMENT',
    due: 'Due Fri, June 6',
    time: '3:00 - 4:00 PM',
    image: 'science',
    classification: 'test',
  },
  {
    id: 3,
    title: 'HISTORY QUIZ - CIVIL WAR',
    due: 'Due Mon, June 9',
    time: '10:00 - 11:00 AM',
    image: 'humanities',
    classification: 'test',
  },
  {
    id: 4,
    title: 'Google Classroom Autosync',
    due: '',
    time: '',
    image: 'classroom',
    classification: 'classroom',
  },
];

  const countClassification = (type) => {
    return ASSESSMENT_DATA.filter(icon => icon.classification === type).length;
};

  const abbreviatedWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  const [currentClassification, setClassification] = useState('TESTS');
  const updateClassification = (newClassification) => (
    setClassification(newClassification)
  );

  const assessmentImageArray = {
    humanities: require('./assets/humanities.png'),
    science: require('./assets/science.png'),
    classroom: require('./assets/classroom.png'),
  }

  const Assessment = ({ assessment }) => (
  <View style={[styles.assessment,
                styles.shadowProp]}>
    <View style={styles.assessmentText}>
      <Text style={styles.assessmentTitle}>{assessment.title}</Text>
      <Text style={styles.assessmentDescription}>{assessment.due}</Text>
      <Text style={styles.assessmentTime}>{assessment.time}</Text>
    </View>
    <View style={{ justifyContent: 'center'}}>
      <Image 
        source={assessmentImageArray[assessment.image] || require('./assets/humanities.png')}
        style={{ height: 3 * deviceHeight / 35, width: 3 * deviceHeight / 35, marginRight: 20 }}
      />
    </View>
  </View>
);

  const ICON_DATA = [
    {
      id: '0',
      name: 'Projects',
      count: countClassification('project'),
      classification: 'project',
    },
    {
      id: '1',
      name: 'Tests',
      count: countClassification('test'),
      classification: 'test',
    },
    {
      id: '2',
      name: 'To-do\'s',
      count: countClassification('to-do'),
      classification: 'to-do',
    }
  ];

  const [currentIndex, changeCurrentIndex] = useState(0);

  const setCurrentIndex = (newIndex) => (
    changeCurrentIndex(newIndex)
  );


  const TopIcons = ({ icon, currentIndex }) => (
    <View style={[currentIndex == icon.id ? styles.highlightedIcon : styles.icon, 
                styles.shadowProp]}>
      <Text style={styles.iconText}>{icon.count} {icon.name}</Text>
    </View>
  );

  const filterClassification = ICON_DATA[currentIndex].classification;

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.generalContainer}>
        <Text style={styles.paragraph}>
          {getCurrentDate()}
        </Text>
        <View style={styles.topIconContainer}>
          <View style={styles.topIconStyle}>
            {ICON_DATA.map((icon, index) => (
              <TouchableHighlight
              underlayColor='#ffffff'
              key={icon.id}
              onPress={() => setCurrentIndex(index)}>
              <TopIcons icon={icon} indexIndex={index} currentIndex={currentIndex}/>
              </TouchableHighlight>
            ))}
          </View>
        </View>
        <View style={styles.homeScrollContainer}>
          <FlatList
            data={ASSESSMENT_DATA.filter(item => item.classification === filterClassification || item.classification === 'classroom')}
            renderItem={({item}) => <Assessment assessment={item} />}
            keyExtractor={item => item.id}
          />
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
  // ASSIGNMENT ICONS
  assessment: {
    height: 2.8 * deviceHeight / 18,
    width: 8.5 * deviceWidth / 10,
    backgroundColor: 'rgba(182, 113, 112, 0.75)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 3,
  },
  assessmentText: {
    flexDirection: 'column',
    width: 4.5 * deviceWidth / 10,
    justifyContent: 'space-evenly',
    marginLeft: 20,
    marginRight: 10,
  },
  assessmentTitle: {
    fontWeight: 'bold',
    color: '#454444',
    maxHeight: 2 * deviceHeight / 19,
    fontSize: 18,
  },
  assessmentDescription: {
    color: '#454444',
    opacity: 0.8,
    textAlign: 'left', 
    fontSize: 13,
  },
  assessmentTime: {
    color: '#454444',
    opacity: 0.8,
    fontSize: 15,
    fontWeight: '600',
  },

  // Scroll Container
  homeScrollContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 7,
  },

  // topicon
  topIconContainer: {
    alignItems: 'center',
  },
  topIconStyle: {
    width: 9.5 * deviceWidth / 13,
    height: 1 * deviceHeight / 18,
    margin: 10,
    marginLeft: deviceWidth / 26,
    marginRight: deviceWidth / 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    backgroundColor: 'rgba(182, 113, 112, 0.5)',
    width: 2.2 * deviceWidth / 10,
    borderRadius: 7,
    height: 1 * deviceHeight / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedIcon: {
    backgroundColor: 'rgba(182, 113, 112, 1)',
    width: 2.2 * deviceWidth / 10,
    borderRadius: 7,
    height: 1 * deviceHeight / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: 'black',
    fontWeight: '500',
    opacity: .8,
  },
  // shadow
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
