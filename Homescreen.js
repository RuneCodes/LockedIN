import { Text, SafeAreaView, StyleSheet, View, FlatList,Dimensions, TouchableHighlight, Image } from 'react-native';
import { useState, useEffect } from 'react';
import Navigation from './Navbar';
import { useToken } from './TokenContext';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const HomeScreen = () => {

  state = {
      menuButtonDimensions: 20,
      dayForm: 'loading...',
  }

  const months = ["Jan", "Feb","Mar","Apr","May","June","July", "Aug","Sept", "Oct","Nov","Dec"];
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const { token } = useToken();

  const getCurrentDate = () => {

      var month = today.getMonth() + 1;
      const dayOfWeek = today.getDay(); 
 
      return weekDays[dayOfWeek] + ', ' + months[month-1] + ' ' + todayDate;
  }

  const [assessmentData, setAssessmentData] = useState([
    {
      id: 0,
      title: 'CS HW',
      due: 'Fileinfo Project',
      time: 'Due 11:59, June 5',
      image: 'science',
      classification: 'to-do',
    },
    {
      id: 1,
      title: 'APP DEV Project',
      due: 'Develop a fully functioning App!',
      time: 'Due 10:00, June 7',
      image: 'science',
      classification: 'project',
    },
    {
      id: 2,
      title: 'BIOLOGY ASSESSMENT',
      due: 'The Mitochondria is...',
      time: 'Due 9:59, June 6',
      image: 'science',
      classification: 'test',
    },
    {
      id: 3,
      title: 'HISTORY QUIZ - CIVIL WAR',
      due: 'Go to iLAB.',
      time: 'Due 3:00, June 9',
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
  ]);

  const ACCESS_TOKEN = token

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("https://classroom.googleapis.com/v1/courses", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        const coursesData = await response.json();
        const courses = coursesData.courses || [];
  
        for (const course of courses) {
        const courseId = course.id;
        const courseWorkResponse = await fetch(
          `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        const courseWorkData = await courseWorkResponse.json();
        const assignments = courseWorkData.courseWork || [];
        const submissionRequest = await fetch(
          `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/-/studentSubmissions?userId=me`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        const submissionData = await submissionRequest.json();
        const submissions = submissionData.studentSubmissions  || [];
        addToArray(assignments, submissions);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
        }
    }; 

    fetchData();

    const intervalId = setInterval(fetchData, 600000);

    return () => clearInterval(intervalId); 

  }, []);

  const addToArray = (newData, submittedData) => {

    const itemsToAdd = [];
    let index = assessmentData.length;
    for(let k = 0; k < newData.length; k++) {
      const isInArray = assessmentData.find(element => element.title === newData[k].title);
      const isSubmitted = submittedData.find(element => element.courseWorkId === newData[k].id);
      if (typeof isInArray === 'undefined' && isSubmitted.state !== 'TURNED_IN') {
        const tempObject = { 
          id: index, 
          title: newData[k].title, 
          due: newData[k].description.length > 18 ? newData[k].description.substring(0, 17) : newData[k].description, 
          time: 'Due '+ newData[k].dueTime.hours + ":" + newData[k].dueTime.minutes +", " + months[newData[k].dueDate.month] + " " +newData[k].dueDate.day, 
          image: (newData[k].maxPoints > 50 || newData[k].title.toLowerCase().indexOf("project") > -1 )? 'science' : 'humanities', 
          classification: (newData[k].maxPoints > 50 || newData[k].title.toLowerCase().indexOf("project") > -1 )? 'project' : 'to-do', 
        };
      
        itemsToAdd.push(tempObject);
        index++;
      }
    }

    const withoutClassroom = assessmentData.filter(element => element.classification !== 'classroom');
    const classroom = assessmentData.filter(element => element.classification === 'classroom');
    const updatedList = [...withoutClassroom, ...itemsToAdd, ...classroom];
    setAssessmentData(updatedList);
  };

  const removeMultipleQuotes = (string) => {
  return string.replace(/^["']+|["']+$/g, '');
}

  const countClassification = (type) => {
    return assessmentData.filter(icon => icon.classification === type).length;
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
            data={assessmentData.filter(item => item.classification === filterClassification || item.classification === 'classroom')}
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
    marginBottom: 15,
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
    fontSize: 13,
  },
  assessmentDescription: {
    color: '#454444',
    opacity: 0.8,
    textAlign: 'left', 
    fontSize: 11,
  },
  assessmentTime: {
    color: '#454444',
    opacity: 0.8,
    fontSize: 12,
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

export default HomeScreen;
