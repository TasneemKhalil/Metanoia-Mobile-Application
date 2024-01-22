import React, { useState, PureComponent, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Text, VirtualizedList, Dimensions, ScrollView, Button,SafeAreaView ,StyleSheet, Image} from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import COLORS from '../conts/colors';
import { registerTaskAsync } from 'expo-notifications';
// import { Divider } from '@rneui/base';
import { Divider } from 'react-native-paper';
import {userr, pass, id, username} from '../user'
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')

const CheckButton = ({ callback, data, item}) => {
  const [checked, setChecked] = useState(false);
  

  useEffect(()=>{
    data.map(check => {
      if(check.user_id == id){
          if(check.task_id == item.task_id && item.done == "yes"){
            setChecked(true)
          }
        }
      }
    )//end posts map
  },[])

  return (
    <TouchableOpacity
      style={{marginRight:20, marginLeft:10, marginTop:10, alignSelf:'center'}}
      onPress={() => {
        setChecked(!checked);
        if (callback) {callback();}
      }}>
      {checked ? (<FontAwesome name="check-circle" size={28} color={COLORS.A_blue} style={{}}/>) : (<FontAwesome5 name="circle" size={25} color='#666' style={{}} />)}
    </TouchableOpacity>
  );
};
/////////////////////////////////////////////////////////////////////////////////////////////////
  


const CalendarPage = ({navigation}) => {
  const [selected, setSelected] = useState();
 
  //if there is no data fetched
  //schedule data if user has no saved scedule
  const [tasks, setTasks] = useState([
    {task_id:'1', title:'task-1', task_body:'idk whatever', date:'2023-05-10', due_date:'', category:'Homework', priority:'5', subject_id:'', project_id:'', user_id:'0', done:'yes', alarm:''},
    {task_id:'2', title:'task-2', task_body:'', date:'2023-05-10', due_date:'05-06-2023', category:'Quiz', priority:'4', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'3', title:'task-2', task_body:'', date:'2023-05-10', due_date:'05-06-2023', category:'Project', priority:'5', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'4', title:'task', task_body:'', date:'2023-05-10', due_date:'', category:'Exam', priority:'1', subject_id:'', project_id:'', user_id:'1', done:'yes', alarm:''},
    {task_id:'5', title:'another task', task_body:'', date:'2023-05-10', due_date:'', category:'Exam', priority:'1', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'6', title:'whatever', task_body:'', date:'2023-05-10', due_date:'', category:'Homework', priority:'2', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'7', title:'no name', task_body:'', date:'2023-05-11', due_date:'', category:'Project', priority:'3', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'8', title:'hi', task_body:'', date:'2023-05-10', due_date:'', category:'none', priority:'3', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'9', title:'task', task_body:'', date:'2023-05-10', due_date:'', category:'none', priority:'3', subject_id:'', project_id:'', user_id:'0', done:'yes', alarm:''},
    {task_id:'10', title:'task-1', task_body:'idk whatever', date:'2023-05-11', due_date:'', category:'Homework', priority:'5', subject_id:'', project_id:'', user_id:'0', done:'yes', alarm:''},
    {task_id:'11', title:'task-2', task_body:'', date:'2023-05-11', due_date:'05-06-2023', category:'Exam', priority:'4', subject_id:'', project_id:'', user_id:'0', done:'yes', alarm:''},
    {task_id:'12', title:'task-2', task_body:'', date:'2023-05-12', due_date:'', category:'Project', priority:'5', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'13', title:'task', task_body:'', date:'2023-05-13', due_date:'', category:'Exam', priority:'1', subject_id:'', project_id:'', user_id:'1', done:'yes', alarm:''},
    {task_id:'14', title:'another task', task_body:'', date:'2023-05-10', due_date:'', category:'Exam', priority:'1', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'15', title:'whatever', task_body:'', date:'2023-05-10', due_date:'05-06-2023', category:'lecture', priority:'2', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'16', title:'no name', task_body:'', date:'2023-05-10', due_date:'', category:'Project', priority:'3', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'17', title:'hi', task_body:'', date:'2023-05-12', due_date:'', category:'none', priority:'3', subject_id:'', project_id:'', user_id:'0', done:'no', alarm:''},
    {task_id:'18', title:'task', task_body:'', date:'2023-05-12', due_date:'', category:'none', priority:'3', subject_id:'', project_id:'', user_id:'0', done:'yes', alarm:''},
  ])

  const getTasks = (item) =>{
    var mytasks = false;
  
    if(item.user_id == id && item.date == selected){
      mytasks = true
    }
  
    return (
      <View>
        {mytasks &&(
          <TouchableOpacity>
            <View style= {{marginTop:10, height:60, backgroundColor:'#1111', marginHorizontal:10, borderRadius:15}}>
              <View style={{ flexDirection:'row', flex:1, marginTop:-2}}>
                <View style={{alignSelf:'center', marginTop:-10}}>
                  <CheckButton data={tasks} item={item} />
                </View>
                
                <Text style={{fontSize:19, marginTop:0, marginStart:-12, alignSelf:'center'}}>{item.title}</Text>

                {(item.category == 'none' || item.category == 'task') &&
                  <View style={{alignSelf:'center', height:30, paddingHorizontal:0, justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                    <Image
                      source={require('../assets/task_50_blue.png')} 
                      style={{width:30, height:30, alignSelf:'center'}}
                    />
                  </View>
                }


                {(item.category == 'Quiz' || item.category == 'Exam') &&
                  <View style={{alignSelf:'center', justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                    <Image
                      source={require('../assets/exam_50_blue.png')} 
                      style={{width:30, height:30, alignSelf:'center'}}
                    />
                  </View>
                }

                {(item.category == 'Homework' || item.category == 'Project') &&
                  <View style={{alignSelf:'center', height:30, paddingHorizontal:0, justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                    <Image
                      source={require('../assets/hw_50_blue.png')} 
                      style={{width:30, height:30, alignSelf:'center'}}
                    />
                  </View>
                }

                {(item.category == 'lecture') &&
                  <View style={{alignSelf:'center', height:30, paddingHorizontal:0, justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                    <Image
                      source={require('../assets/lec_50_blue.png')} 
                      style={{width:30, height:30, alignSelf:'center'}}
                    />
                  </View>
                } 
              </View>

            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  useEffect(()=>{
    var date = moment().utcOffset('+05:30').format('YYYY-MM-DD');
    setSelected(date)
  },[])
  

  function CustomCalendar(props) {

    const marked = useMemo(() => ({
      [selected]: {
        customStyles: {
          container: {
            backgroundColor: COLORS.A_yellow,
            borderRadius: 100,
          },
          text: {
            color: 'black',
          }
        }
      }
    }), [selected]);

    

    return (
      <Calendar
        // current= {todayy}
        markingType="custom"
        markedDates={marked}
        // selected = {marked}
        onDayPress={(day) => {
          setSelected(day.dateString);
          props.onDaySelect && props.onDaySelect(day);
        }}
        // {...props}
        style={{
          borderTopEndRadius:30,
          borderTopStartRadius:30,
          marginHorizontal:-20,
          marginBottom: 10,
          elevation: 5,
        }}
        theme={{
          calendarBackground:COLORS.A_dark_blue,//'#444',
          dayTextColor: '#fff',
          textDisabledColor: '#444',
          monthTextColor: 'white',//'#fff'
          todayTextColor: 'white',
          // dayTextColor: 'white',
        }}
      />
    );
  }

  console.log('selected day',selected)
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>

        <View style={styles.logo}>
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}/>
          
          <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'700', fontSize:28}}>Calendar</Text> 
          </View>

          <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:8}} onPress={()=> navigation.openDrawer()}/> 

        </View>

      {/* just padding */}
      <View style={{height:0.8, width:'100%', backgroundColor:"#ddd", marginBottom:5, marginTop:-5}}></View>

      {/* ////////////////////////////////////end of header/////////////////////////////////////// */}
      
      <CustomCalendar/>
      {/* just padding */}
      <View style={{height:50, width:'120%', backgroundColor:COLORS.A_dark_blue, marginTop:-10, marginStart:-20}}></View>

      {/* ///////////////////////////////////end of calender//////////////////////////////////////////// */}

      <View style={{backgroundColor:COLORS.A_white, height:height-530, marginHorizontal:-20, marginTop:-40, borderTopEndRadius:30, borderTopStartRadius:30}}>

        <View style={{justifyContent:'space-between', flexDirection:'row', marginHorizontal:25, marginTop:10}}>
            
          <Text style={{fontSize:20, fontWeight:'700'}}>Tasks:</Text>

          <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
            <Octicons name="diff-added" size={25} color="black" style={{marginTop:3}}/>
            {/* {addTask()} */}
          </TouchableOpacity>

        </View>

        <View style={{ justifyContent:'center', backgroundColor:'#eeed', flex:1, marginTop:0, marginHorizontal:10, height:height-365}}>

          <FlatList
            data={tasks} 
            keyExtractor={item => item.task_id}

            renderItem={({item})=>{
              return(
                <View>
                  {getTasks(item)}
                </View>
              ) 
            }}
          />

      </View>
      </View>

    </SafeAreaView>
   </View> 

  );
};

export default CalendarPage;

  //styleing 
  const styles = StyleSheet.create({
    contentContainer:{
      flex:1,
      paddingTop: 25, 
      paddingHorizontal: 20,
    },

    container: {
      height: "100%",
      flex: 1,
      backgroundColor: COLORS.A_white,
    },

    image: {
      width: 60,
      height: 60,
      marginRight:5,
      marginLeft:0
    },

    logo:{
      flexDirection: 'row',
      marginHorizontal:-10,
    },


    CalenderTask:{
      // flex:1,
      // flexDirection:'row',
      margin:4,
      height:40,
      width:360,
      backgroundColor:'red',
      borderRadius:8,
    },

  });