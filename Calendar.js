import { Text, SafeAreaView, StyleSheet, View, FlatList,Dimensions, TouchableHighlight, Image } from 'react-native';
import { useState, useEffect } from 'react';
import Navigation from './Navbar';
import { useToken } from './TokenContext';

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
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getCurrentDate = () => {

      var month = today.getMonth() + 1;
      const dayOfWeek = today.getDay(); 
      const months = ["Jan", "Feb","Mar","Apr","May","June","July", "Aug","Sept", "Oct","Nov","Dec"];
       return weekDays[dayOfWeek] + ', ' + months[month-1] + ' ' + todayDate;
  }

  const [Monday, setMondayData] = useState([]);
  const [Tuesday, setTuesdayData] = useState([]);
  const [Wednesday, setWednesdayData] = useState([]);
  const [Thursday, setThursdayData] = useState([]);
  const [Friday, setFridayData] = useState([]);
  const [Saturday, setSaturdayData] = useState([]);
  const [Sunday, setSundayData] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);

  const dataFunctionsArray = [setSundayData, setMondayData, setTuesdayData, setWednesdayData, setThursdayData, setFridayData, setSaturdayData];
  const dataArray = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday];
  const availableTimes = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM',
    '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM',
  ];

  const { token, newDataArray } = useToken();
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
        console.log(courses);
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

  useEffect(() => {
    if (allAssignments.length > 0) {
      updateArrays();
    }
  }, [allAssignments]);

  const addToArray = (newData, submittedData) => {
    
    for(let k = 0; k < newData.length; k++) {
      const isSubmitted = submittedData.find(element => element.courseWorkId === newData[k].id);
      if (isSubmitted.state !== 'TURNED_IN') {
      try {
        const dueDate = newData[k].dueDate;
        if (!dueDate || typeof dueDate.day !== 'number' || typeof newData[k].dueTime.hours !== 'number') {
          continue; 
        }
        const dateDifference = newData[k].dueDate.day - todayDate;
        const dateInMiliseconds = new Date(newData[k].dueDate.year, newData[k].dueDate.month, newData[k].dueDate.day);
        if (dateDifference < 7 && dateDifference >= 0 && dateInMiliseconds  - today <= 3000000000 && dateInMiliseconds  - today >= 0) {
          let description = '';
          try {
            description = newData[k].description.length > 18 ? newData[k].description.substring(0, 17) : newData[k].description;
          } catch (e) {
            description = "No Description.";
          }
          const tempObject = { 
            id: newData[k].dueTime.hours > 11 ? (newData[k].dueTime.hours % 12 +  " PM") : (newData[k].dueTime.hours + " AM"), 
            title: newData[k].title.length > 18 ? newData[k].title.substring(0, 18) : newData[k].title, 
            duration: '30',
            description: description, 
            event: true,
            day: newData[k].dueDate.day,
            shouldStudy: ((newData[k].maxPoints > 50 || newData[k].title.toLowerCase().indexOf("test") > -1 || newData[k].title.toLowerCase().indexOf("assessment") > -1 || newData[k].title.toLowerCase().indexOf("quiz") > -1 || newData[k].title.toLowerCase().indexOf("cumulative") > -1 || newData[k].title.toLowerCase().indexOf("exam") > -1) ? true : false),
          };
          setAllAssignments(oldData => [...oldData, tempObject]);
        }
      } catch (error) {
        console.log(error);
      }
      }
    }
    try {
      if (newDataArray.length > 0) {
        const addedDay = new Date(newDataArray[1]);
        console.log(addedDay);
        console.log(addedDay.getDate());
        console.log(addedDay.getHours());
        const tempObject = { 
          id: addedDay.getHours() > 11 ? (addedDay.getHours() % 12 +  " PM") : (addedDay.getHours() + " AM"), 
          title: newDataArray[2] > 18 ? newDataArray[2].substring(0, 18) : newDataArray[2], 
          duration: '30',
          description: "No Description", 
          event: true,
          day: addedDay.getDate(),
          shouldStudy: ((newDataArray[0] >= 0.5 || newDataArray[2].toLowerCase().indexOf("test") > -1 || newDataArray[2].toLowerCase().indexOf("assessment") > -1 || newDataArray[2].toLowerCase().indexOf("quiz") > -1 || newDataArray[2].toLowerCase().indexOf("cumulative") > -1 || newDataArray[2].toLowerCase().indexOf("exam") > -1) ? true : false),
        };
        console.log(tempObject);
        setAllAssignments(oldData => [...oldData, tempObject]);
      }
    } catch (e)
    {
      console.log(e);
    }
  }

  const createSchedule = () => {
    for(let i = 0; i < allAssignments.length; i++)
    {
      if(allAssignments[i].shouldStudy) {
        allAssignments[i].shouldStudy = false;
        for(let j = todayDate; j < allAssignments[i].day; j++)
        {
          
          const studyingOnDay = allAssignments.filter(a => a.day === today);
          let randomTime = '11 AM';
          let existing = 'undefined';
          do {
            randomTime = availableTimes[Math.floor(Math.random() * availableTimes.length)];
            existing = studyingOnDay.find(element => element.id === randomTime);
          } while (existing === 'undefined')
          const tempObject = { 
            id: randomTime, 
            title: "Study for " + (allAssignments[i].title.length > 10 ?allAssignments[i].title.substring(0, 10) : allAssignments[i].title), 
            duration: '30',
            description: "Time to LockIN!", 
            event: true,
            day: j,
            shouldStudy: false,
          };
          setAllAssignments(oldData => [...oldData, tempObject]);
        }
      }
    }
  }

 const updateArrays = () => {
  createSchedule();
  for (let m = 0; m < dataArray.length; m++) {
    const dayArray = [];
    const dayNumber = m + todayDate;
    const assignmentsForDay = allAssignments.filter(a => a.day === dayNumber);
    for (let n = 0; n < availableTimes.length; n++) {
      const existing = assignmentsForDay.find(element => element.id === availableTimes[n]);
      if (existing) {
        dayArray.push(existing);
      } else {
        dayArray.push({
          id: availableTimes[n],
          title: 'empty',
          duration: '30',
          description: 'empty',
          event: false,
          day: todayDate + m,
        });
      }
    }
    dataFunctionsArray[m](dayArray);
    
    //dataFunctionsArray[m](dayArray);
    //dataFunctionsArray[ dateDifference ](oldData => [...oldData, tempObject])
  }
};

   
  const removeMultipleQuotes = (string) => {
    return string.replace(/^["']+|["']+$/g, '');
  }

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
    <View style={[ item.event && item.day == todayDate + highlightedIndex ? styles.item : styles.nonitem, 
                  { height: (parseInt(item.duration, 10) / 40) * 2 * deviceHeight / 18, }]}>
      <View style={styles.sidebar}>
      </View>
      <View style={styles.calendarText}>
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
            data={dataArray[highlightedIndex]}
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
    opacity: 0,
  },
  calendarText: {
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 7.5 * deviceWidth / 10,
  },
  calendarTitle: {
    fontWeight: 'bold',
    color: '#454444',
    width: 2.6 * deviceWidth / 10,
    marginRight: 3,
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
