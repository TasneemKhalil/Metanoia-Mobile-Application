
import {Keyboard, View, Text, TouchableWithoutFeedback, Dimensions, FlatList, Image, ScrollView, TouchableOpacity,SafeAreaView, Modal, TextInput, Alert, StyleSheet, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import COLORS from '../conts/colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')
import { Divider } from '@rneui/base';
import {userr, pass, id, username, bio, user_email, user_phone, user_photo} from '../user'
import moment from 'moment';
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import CalendarStrip,{getSelectedDate,} from 'react-native-calendar-strip';
import DatePicker from 'react-native-modern-datepicker';
import { ip } from '../getIP';


var change = false;
var update ={checked:'', item:''}

console.log(id)

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

var today = moment().format('YYYY-MM-DD')
export default function DailyPage({ navigation }) {
  

  const ref = useRef()
  let datesWhitelist = [{ start: moment(), end: moment().add(6, 'days') }];

  const [tasks, setTasks] = useState([])

  const [value, setValue] = useState(today);
  const [showTasksList, setShowTasksList] = useState(true);
  const [showDoneList, setShowDoneList] = useState(false);

  const url = "http://"+ip+":3000/tasks"
  
  // try{ 
    useEffect(() => {
      fetch(url)
      .then((resp) => resp.json())
      .then((json) => {setTasks(json)})
      .catch(function(error) {
      //   console.log('There has been a problem with your fetch operation: ' );
      })
    },[])

  // }catch (error){
  //   console.log('error')
  // }
  
 
  
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const CheckButton = ({ callback, data, item }) => {
  const [checked, setChecked] = useState(false);

  useEffect(()=>{
    data.map(check => {
      if(check.user_id == id){
        if(check.task_id == item.task_id && item.done == "yes"){
          setChecked(true)
        }
      }
    })//end posts map
  },[])

  return (
    <TouchableOpacity
      style={{marginRight:20, marginLeft:10, marginTop:10, alignSelf:'center'}}
      onPress={() => {
        update ={checked,item}

        setChecked(!checked);
        
        if (callback) {callback()}
        {updateTasks(update)}
      }}>

      {checked ? (<FontAwesome name="check-circle" size={33} color={COLORS.A_blue} style={{marginTop:-1}}/>) : (<FontAwesome5 name="circle" size={30} color='#666' style={{marginTop:-1}} />)}
    </TouchableOpacity>
  );
};


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const updateTasks = (update)=>{
  
  try{

    fetch("http://"+ip+":3000/taskDoneUndone", {
      method: "post", 
      headers:{ "Content-Type": "application/json", },
      body: JSON.stringify({
        "update": update,
      })
    })
    .then(res=>res)
    .then(data =>{
      if(data.status == 200){
      const url = "http://"+ip+":3000/tasks"

    fetch(url)
    .then((resp) => resp.json())
    .then((json) => {setTasks(json)})
    .catch(function(error) {
      // console.log('There has been a problem with your fetch operation: ' );
    })}
    })
  // try{
    const url = "http://"+ip+":3000/tasks"

    fetch("http://"+ip+":3000/tasks")
    .then((resp) => resp.json())
    .then((json) => {setTasks(json)})
    .catch(function(error) {
      // console.log('There has been a problem with your fetch operation: ' );
    })
  }catch(error){

   }
      
}

////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
const getTasks = (item, tasks) =>{
  var mytasks = false;

  // fetch("http://"+ip+":3000/tasks")
  // .then((resp) => resp.json())
  // .then((json) => {setTasks(json)})

  if(item.user_id == id && item.date == today && item.done == "no"){
    mytasks = true
  }

  return (
    <View>
      {mytasks &&(
        <TouchableOpacity onPress={()=>{navigation.navigate('taskpage', {item})}}>
          <View style= {{marginTop:10, height:80, backgroundColor:'#1111', marginHorizontal:10, borderRadius:15}}>
            <View style={{ flexDirection:'row', flex:1, marginTop:0}}>

              <CheckButton data={tasks} item={item} />
              <Text style={{fontSize:19, marginTop:6, marginStart:-12, alignSelf:'center'}}>{item.title}</Text>
              
            </View>

            {/* //priority// */}
            <View style={{ flex:1, justifyContent:'center', borderRadius:15}}>

              

              <View style={{flex:1, borderRadius:15, flexDirection:'row', marginTop:0}}>
                
                
                <MaterialCommunityIcons name="clock-time-four-outline" size={25} color={COLORS.A_dark_blue} style={{alignSelf:'center', marginStart:10}}/>
                {(item.due_date != null && item.due_date != '') && <Text style={{alignSelf:'center', marginStart:2, fontSize:13}}>({item.due_date})</Text>}
                {(item.due_date == null || item.due_date == '') && <Text style={{alignSelf:'center', marginStart:2, fontSize:13}}>Not Set</Text>}

                <MaterialIcons name= "alarm" size={24} color={COLORS.A_dark_blue} style={{alignSelf:'center', marginStart:5}}/>
                {(item.alarm != null && item.alarm != '') && <Text style={{alignSelf:'center', marginStart:2, fontSize:13}}>({item.alarm})</Text>}
                {(item.alarm == null || item.alarm == '') && <Text style={{alignSelf:'center', marginStart:2, fontSize:13}}>Not Set</Text>}


                {(item.category == 'none' || item.category == 'task') &&
                  <View style={{alignSelf:'center', height:30, paddingHorizontal:0, justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                    <Image
                      source={require('../assets/task_50_blue.png')} 
                      style={{width:30, height:30, alignSelf:'center'}}
                    />
                  </View>
                }


                {(item.category == 'quiz' || item.category == 'exam') &&
                  <View style={{alignSelf:'center', justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                    <Image
                      source={require('../assets/exam_50_blue.png')} 
                      style={{width:30, height:30, alignSelf:'center'}}
                    />
                  </View>
                }

                {(item.category == 'homework' || item.category == 'project') &&
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
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
const getDoneTasks = (item, tasks) =>{
  var mytasks = false;

  if(item.user_id == id && item.date == today && item.done == "yes"){
    mytasks = true
  }

  return (
    <View>
      {mytasks &&(
        <TouchableOpacity onPress={()=>{navigation.navigate('taskpage', {item})}}>
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


              {(item.category == 'quiz' || item.category == 'exam') &&
                <View style={{alignSelf:'center', justifyContent:'center', borderRadius:150, marginStart:10, position:'absolute', right:10}}>
                  <Image
                    source={require('../assets/exam_50_blue.png')} 
                    style={{width:30, height:30, alignSelf:'center'}}
                  />
                </View>
              }

              {(item.category == 'homework' || item.category == 'project') &&
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
////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  

  //add task page
  const [modalVisible, setModalVisible] = useState(false);

  //tasks info
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [Description, setDescription] = useState('');

  //set priority
  const [priority, setPriority] = useState('');
  const [revealedAlert, setRevealedAlert] = useState(false);
  
  //set Due Date
  const [Due, setDue] = useState('')
  const [selectedDate, setSelectedDate] = useState(value);
  const [revealedTime, setRevealedTime] = useState(false);

  //set category
  const [Category, setCategory] = useState('');
  const [revealedCat, setRevealedCat] = useState(false);

  //set reminder
  const [remind, setremind] = useState('')
  const [selectedReminder, setSelectedReminder] = useState(value);
  const [revealedAlarm, setRevealedAlarm] = useState(false);

  const [color, setcolor] = useState('black')
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const CloseAddTaskPage = ()=>{
    setTaskTitle('')
    setTaskSubject('')
    setDescription('')

    setPriority('')
    setRevealedAlert(false)

    setDue('')
    setSelectedDate(today)
    setRevealedTime(false)

    setCategory('')
    setRevealedCat(false)

    setremind('')
    setSelectedReminder('')
    setRevealedAlarm(false)
    setcolor('black')

    fetch("http://"+ip+":3000/tasks")
    .then((resp) => resp.json())
    .then((json) => {setTasks(json)})
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' );
    })

  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  const DissmissAddTaskPage = ()=>{
    setRevealedAlert(false)
    setRevealedTime(false)
    setRevealedCat(false)
    setRevealedAlarm(false)
    // setcolor('black')
  }

  const SaveNewTask = ()=>{
    var user_id = id;
    var title;
    var taskpriority;
    var category;
    var due;

    if(taskTitle == '' || taskTitle == null){
      title = 'title'
    }else{
      title = taskTitle
    }

    if(priority == '' || priority == null){
      taskpriority = 'Average'
    }else{
      taskpriority = priority;
    }

    if(Category == '' || Category == null){
      category = 'task'
    }else{
      category = Category
    }

    if(Due == '' || Due == null){
      due = selectedDate
    }else{
      due = Due
    }
    
    //send data to database
    // try{
      fetch("http://"+ip+":3000/AddNewTask", {
        method: "post", 
        headers:{ "Content-Type": "application/json", },
        body: JSON.stringify({
          "title": title,
          "taskSubject": taskSubject,
          "Description": Description,
          "taskpriority": taskpriority,
          "due": due,
          "category": category,
          "remind": remind,
          "user_id": user_id,
          "date": today,
        })
      })
      // .then(res=>res)
      // .then(data =>{})
      // .catch(function(error) {
      // });

      const url = "http://"+ip+":3000/tasks"

    fetch(url)
    .then((resp) => resp.json())
    .then((json) => {setTasks(json)})
    .catch(function(error) {
      // console.log('There has been a problem with your fetch operation: ' );
    })

    
    CloseAddTaskPage()
    
  }
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const addTask= ()=>{
    
    return(
      <Modal
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity onPress={()=> {DissmissAddTaskPage(),setModalVisible(false)}} style={{backgroundColor:"#00000778", flex:1}}>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={()=> {Keyboard.dismiss()}}
            style={[ 
              StyleSheet.absoluteFillObject,
              {
                backgroundColor:COLORS.A_white, 
                marginTop:70,
                marginBottom:80,  
                marginHorizontal:10,
                flex:1, 
                padding:40, 
                borderRadius:10,
              },
            ]}
          >

            {/* /////////////////////////////task body start//////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////// */}
            <ScrollView style={{marginTop:-35, marginHorizontal:-25, marginBottom:15}}>

              <View style={{alignSelf:'center', marginTop:10, flexDirection:'row'}}>
                <Text style={{fontSize:20, fontWeight:'600'}}>Add New Task: </Text>
                <FontAwesome5 name="pencil-alt" size={24} color="black" style={{marginTop:1}}/>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:5, marginHorizontal:30}}/>

              {/* /////////add task title/////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{ marginTop:5, alignSelf:'center', marginBottom:5, }}> 
                <Text style={{fontSize:18, fontWeight:'600'}}>Title: </Text>
                <TextInput
                  autoCorrect={false} 
                  // placeholder='Title'
                  // placeholderTextColor={'#666'}
                  style={{ 
                    width:width-90, 
                    height: 35, 
                    marginTop:-3,
                    backgroundColor: '#ebecf0',//'#c8dfea'//too dark,
                    // flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor:COLORS.A_blue,
                  }}

                  onChangeText={setTaskTitle}
                  value={taskTitle}
                />
              </View>

              <View style={{ marginTop:5, alignSelf:'center', marginBottom:10}}> 
                <Text style={{fontSize:18, fontWeight:'600'}}>Subject: </Text>
                <TextInput
                  autoCorrect={false} 
                  // placeholder='Title'
                  // placeholderTextColor={'#666'}
                  style={{ 
                    width:width-90, 
                    height: 35, 
                    marginTop:-3,
                    backgroundColor: '#ebecf0',//'#c8dfea'//too dark,
                    // flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor:COLORS.A_blue,
                  }}

                  onChangeText={setTaskSubject}
                  value={taskSubject}
                />
              </View>
              {/* //add task description//////////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={1} style={{alignSelf:'center',}}> 
                <Text style={{fontSize:18, marginBottom:0, fontWeight:'600'}}>Description: </Text>
                <TextInput
                  // autoCorrect={false}
                  
                  style={{ 
                    width:width-90,
                    height: 130, 
                    backgroundColor: '#ebecf0',//'#c8dfea'//too dark,
                    // flexDirection: 'row',
                    paddingHorizontal: 15,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor:COLORS.A_blue
                  }}
                  multiline={true}
                  onChangeText={setDescription}
                  value={Description}
                />
              </KeyboardAvoidingView>

              {/* /////set priority////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{marginTop:20, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedAlert(prevState => !prevState)}>
                  <MaterialCommunityIcons name={revealedAlert ? "close" : "alert-circle-outline"} size={30} color={COLORS.A_dark_blue} />
                  {(priority != null && priority != '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500', color:color}}>{priority}</Text>}
                  {(priority == null || priority == '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500', color:color}}>Set Priority</Text>}
                </TouchableOpacity>
              </View>

              {revealedAlert &&
              <View style={{marginTop:10, alignSelf:'center', width:width-80, }}> 
                {/* <Text style={{fontSize:20, fontWeight:'600', marginBottom:15, marginStart:-5}}>Priority: </Text> */}
                
                <View style={{flexDirection:'row', justifyContent:'space-evenly', marginHorizontal:0}}>

                  <View style={{justifyContent:'center', backgroundColor:'#E60026', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity style={{}} onPress={()=>{setPriority('Very Important'), setcolor('#E60026')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#FFBF00', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Important'), setcolor('#FFBF00')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#BEBFC5', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Average'), setcolor('#555')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#00B9E8', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Slightly Important'), setcolor('#00B9E8')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center', backgroundColor:'#007FFF', height:35, width:35, borderRadius:100}}>
                    <TouchableOpacity onPress={()=>{setPriority('Not Important'), setcolor('#007FFF')}}>
                      <Ionicons name="md-alert-outline" size={20} color="white" style={{alignSelf:'center', marginTop:-4}}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <Divider width={1} orientation='vertical' style={{marginTop:15, marginBottom:0, marginHorizontal:10}}/>
              </View>}

              {/* /////set deadline////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{marginVertical:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedTime(prevState => !prevState)}>
                  <MaterialCommunityIcons name={revealedTime ? "close" : "clock-time-four-outline"} size={30} color={COLORS.A_dark_blue}  />
                  {( Due != null && Due != '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Due to: {Due}</Text>}
                  {( Due == null || Due == '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set Deadline</Text>}
                </TouchableOpacity>
              </View>

              {revealedTime && 
                <DatePicker 
                  options={{
                    backgroundColor: COLORS.A_white,
                    mainColor:COLORS.A_blue,
                  }}

                  selected = {selectedDate}
                  onSelectedChange={date => {setSelectedDate(date), setDue(date)}}
                />}


              {/* /////set Category////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */} 
              <View style={{marginBottom:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedCat(prevState => !prevState)}>
                  <MaterialIcons name={revealedCat ? "close" : "category"} size={28} color={COLORS.A_dark_blue}  />
                  {( Category != null && Category !='') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>{Category}</Text>}
                  {( Category == null || Category =='') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set Category</Text>}
                </TouchableOpacity>
              </View>

              {revealedCat &&
                <ScrollView 
                  horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={{ paddingVertical: 20 }}
                  style={{ height:70, width:'90%', alignSelf:'center', marginBottom:5, marginTop:-10}}
                >

                  {/* default none */}
                  {/* no remainder expect user set one  */}
                  <TouchableOpacity 
                    onPress={()=>{setCategory('task')}}
                    style={{flexDirection:'row', alignSelf:'center', backgroundColor:COLORS.A_dark_blue, height:45, paddingHorizontal:15, justifyContent:'center', borderRadius:150, marginStart:5 }}>
                    <Image
                      // source={require('../assets/task_100_white.png')} 
                      source={require('../assets/task_50_white.png')} 
                      style={{width:30, height:30, alignSelf:'center', marginStart:-5, marginRight:5}}
                    />
                    <Text style={{alignSelf:'center', textAlign:'center', color:'white', fontSize:18}}>Task</Text>
                  </TouchableOpacity>

                  {/* exam */}
                  {/* if exam -- remaind the user to set the time to be reminded of the exam */}
                  <TouchableOpacity
                    onPress={()=>{setCategory('exam')}}
                    style={{flexDirection:'row', alignSelf:'center', backgroundColor:COLORS.A_dark_blue, height:45, paddingHorizontal:15, justifyContent:'center', borderRadius:150, marginStart:5 }}>
                    <Image
                      // source={require('../assets/task_100_white.png')} 
                      source={require('../assets/exam_50_white.png')} 
                      style={{width:30, height:30, alignSelf:'center', marginStart:-3, marginRight:5}}
                    />
                    <Text style={{alignSelf:'center', textAlign:'center', color:'white', fontSize:18}}>Exam / Quiz</Text>
                  </TouchableOpacity>

                  {/* Homework */}
                  {/* remainder will be set at due date midnite if not set by user */}
                  <TouchableOpacity 
                    onPress={()=>{setCategory('homework')}}
                    style={{flexDirection:'row', alignSelf:'center', backgroundColor:COLORS.A_dark_blue, height:45, paddingHorizontal:15, justifyContent:'center', borderRadius:150, marginStart:5 }}>
                    <Image
                      // source={require('../assets/task_100_white.png')} 
                      source={require('../assets/hw_50_white.png')} 
                      style={{width:30, height:30, alignSelf:'center', marginStart:-3, marginRight:7}}
                    />
                    <Text style={{alignSelf:'center', textAlign:'center', color:'white', fontSize:18}}>Homework / project</Text>
                  </TouchableOpacity>

                </ScrollView>
              }

              {/* /////set remainder////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */} 
              <View style={{marginBottom:10, marginHorizontal:20, flexDirection:'row'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setRevealedAlarm(prevState => !prevState)}>
                  <MaterialIcons name={revealedAlarm ? "close" : "alarm"} size={28} color={COLORS.A_dark_blue}  />
                  {(remind != null && remind != '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>{remind}</Text>}
                  {(remind == null || remind == '') && <Text style={{alignSelf:'center', marginStart:5, fontSize:18, fontWeight:'500'}}>Set reminder</Text>}
                </TouchableOpacity>
              </View>

              {revealedAlarm && 
                <DatePicker 
                  options={{
                    backgroundColor: COLORS.A_white,
                    mainColor:COLORS.A_blue,
                  }}

                  selected = {selectedReminder}
                  onSelectedChange={date => {setSelectedReminder(date), setremind(date)}}
                />}
              

            </ScrollView>

            
            <TouchableOpacity style={{height:50, width:80, position:'absolute', bottom:10, right:10, alignSelf:'center', justifyContent:'center', borderRadius:30}} onPress={()=>{SaveNewTask(),setModalVisible(false)}}>
              <Text style={{textAlign:'center', fontSize:18, fontWeight:'500', color:COLORS.A_dark_blue}}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:50, width:80, position:'absolute', bottom:10, right:70, alignSelf:'center', justifyContent:'center', borderRadius:30}} onPress={()=>{CloseAddTaskPage(),setModalVisible(false)}}>
              <Text style={{textAlign:'center', fontSize:17, fontWeight:'500', color:COLORS.A_gray}}>Cancle</Text>
            </TouchableOpacity>
            
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      
    )
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  return (
        
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>

        <View style={styles.logo}>
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}
          />
              
          <View style={{alignSelf:'center', marginStart:-5, flex:1}}>
            <Text style={{ fontWeight:'700', fontSize:28}}>Metanoia</Text> 
          </View>

          <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>  
        </View>
   
        <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:-5}}/>

        {/* /////////////////////////////////////////////////////////////////////////// */}
        {/* /////////////////////////////////////////////////////////////////////////// */}
        {/* /////////////////////////////////////////////////////////////////////////// */}

        <View style={{marginTop:10}}>
        {/* {console.log("today", today)} */}

          <View>
            <CalendarStrip
              // scrollable={false}
              ref={ref}
              showMonth={false}
              leftSelector={[]}
              rightSelector={[]}
              selectedDate={today}
              
              startingDate={moment()}
              useIsoWeekday={false}
              minDate={moment()}
              maxDate={moment().add(6, 'days')}
              
              daySelectionAnimation={{type: 'border', duration: 20, borderWidth: 1, borderHighlightColor: 'white'}}
              style={{height: 70, paddingTop: 0, paddingBottom: 0, marginHorizontal:-10, paddingHorizontal:5, borderRadius:15}}
              calendarHeaderStyle={{color: 'white'}}
              calendarColor={COLORS.A_dark_blue}
              dateNumberStyle={{color: 'white'}}
              dateNameStyle={{color: 'white'}}
              highlightDateNumberStyle={{color: COLORS.A_yellow}}
              highlightDateNameStyle={{color: COLORS.A_yellow}}
              datesWhitelist={datesWhitelist}
              datesBlacklist={[]}
              
              onDateSelected={(date)=>{
               today = date.format('YYYY-MM-DD')
               setValue(date)
              }} 
            />
            
          </View>

          {/* /////////////////////////////////////////////////////////////////////////// */}
          {/* /////////////////////////////////////////////////////////////////////////// */}
          {/* /////////////////////////////////////////////////////////////////////////// */}
          <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:5}}/>
          
          <View style={{justifyContent:'space-between', flexDirection:'row', marginHorizontal:0}}>
            
            <Text style={{fontSize:22, fontWeight:'600'}}>Tasks:</Text>

            <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
              <Octicons name="diff-added" size={30} color="black" />
              {addTask()}
            </TouchableOpacity>

          </View>

          <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:0}}/>


          {/* ///////tasks list/////////////////////////////////////////////////////////////////////// */}
          <TouchableOpacity onPress={()=>{setShowTasksList(prevState => !prevState), setShowDoneList(false)}}>
            <MaterialIcons name="sort" size={22} color="black" style={{marginTop:-31, marginStart:70 ,position:'absolute'}}/>
          </TouchableOpacity>
          

          {showTasksList &&
          <View style={{backgroundColor:'#eeed', marginHorizontal:-10, height:height-365}}>
            <FlatList
              data={tasks} 
              keyExtractor={item => item.task_id}

              renderItem={({item})=>{
                return(
                  <View>
                    {getTasks(item, tasks)}
                    
                  </View>
                ) 
              }}
            />
          </View>}
          
          {/* //////////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////////////////////////////////////////////////////////////// */}
          {/* done */}
          <View style={{justifyContent:'space-between', flexDirection:'row', marginHorizontal:3}}> 
            <Text style={{fontSize:20, fontWeight:'600', marginTop:5}}>Done: </Text>
          </View>
          <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:0}}/>

          <TouchableOpacity onPress={()=>{setShowDoneList(prevState => !prevState), setShowTasksList(showDoneList) }}>
            <MaterialIcons name="sort" size={22} color="black" style={{marginTop:-30, marginStart:60 ,position:'absolute'}}/>
          </TouchableOpacity>

          {showDoneList &&
          <View style= {{backgroundColor:'#eeed', height:height-365, marginHorizontal:-10}}>
            <FlatList
              data={tasks} 
              keyExtractor={item => item.task_id}

              renderItem={({item})=>{
                return(
                  <View>
                    {getDoneTasks(item, tasks)}
                    
                  </View>
                ) 
              }}
            />
          </View>}
        

        </View>

      </SafeAreaView>
    </View>
      );
      
    }

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
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
      marginLeft:-10
    },

    logo:{
      flexDirection: 'row',
      marginBottom:-10,
    },

  });
