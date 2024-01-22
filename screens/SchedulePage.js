import {Dimensions, ScrollView, TextInput, FlatList, SafeAreaView,TouchableOpacity, View, Text , StyleSheet,Image, PanResponder,Animated, Alert} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Chose from '../components/Chose';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../conts/colors';
import Schedule from '../components/Schedule';
import { AntDesign } from '@expo/vector-icons';
import { Divider } from '@rneui/base';
import { Feather } from '@expo/vector-icons'; 
const {width, height} = Dimensions.get('screen')
import {useForm, Controller} from 'react-hook-form';
import DropDownPicker from "react-native-dropdown-picker";
import { ip } from '../getIP';


const SchedulePage = ({navigation}) => {
  
  const [flaglist, setFlagList]= useState(false);
  const [list, setList] = useState('');
  const [chosenSubject, setSubject] = useState('')
  // console.log(chosenSubject)
  
 
  // const droplist = (name) =>{
  //     setFlagList(!flaglist)

  //     if(name === 'subject'){
  //       setList('subject')
        
        
  //     }
  //     if(name === 'spaciality'){
  //       setList('spaciality')
  //     }

  //     if(name === 'department'){
  //       setList('department')
  //     }
  // }

      
      // useEffect(() => {
    
      //   if(list === 'subject'){
      //     setList('subject')
          
      //   }
      //   if(list === 'spaciality'){
      //     setList('spaciality')
      //   }
  
      //   if(list === 'department'){
      //     setList('department')
      //   }
      
      //   // console.log(list)
      // },[list]);
    
      

  const [subjectData, setSubjectData] = useState([
    {subject_id:'0', subject_name:'java', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'1', subject_name:'advance', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'2', subject_name:'software', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'3', subject_name:'database', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'4', subject_name:'data structure', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'5', subject_name:'image', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'6', subject_name:'digital', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'7', subject_name:'micro', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'8', subject_name:'critical', subject_number:'', department_id:'1', specialty_id:'3', hours:'3'},
    {subject_id:'9', subject_name:'eng', subject_number:'', department_id:'9', specialty_id:'5', hours:'3'},
    {subject_id:'10', subject_name:'arabic', subject_number:'', department_id:'9', specialty_id:'1', hours:'3'},
  ]);

  const [specialityData, setSpecialityData] = useState([
    {speciality_id:'3', name:'Copmuter Engeneering'},
    {speciality_id:'5', name:'English'},
    {speciality_id:'1', name:'Arabic'},
  ])

  const [departmentData, setDepartmentData] = useState([
    {department_id:'1', name:'Engeneering'},
    {department_id:'9', name:'literature'},
  ])

  const [subject, setsub] = useState('')
  const [speciality, setspe] = useState('')
  const [department, setdep] = useState('')
  // console.log('subject:::  ', subject)
  // console.log('speciality: ',speciality)
  // console.log('department: ',department)

  const [showSubject, setShowSubject] = useState(false);
  const [showSpeciality, setShowSpeciality] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);

  //172.19.24.59 najahwifi
  //192.168.1.76 home
  //10.0.2.2 foe emulator to work
  //localhost
  // const url = "http://"+ip+":3000/sendSubjects"
  // useEffect(() => {
  //     console.log('inside fun')
  //     fetch(url)
  //     .then((resp) => resp.json())
  //     .then((json) => {setData(json)&& console.log("json", json)})
  //     .catch(function(error) {
  //       // console.log('There has been a problem with your fetch operation: ' );
  //     })
  //   console.log('last try for the nigght')
  //   console.log(data)
  // },[]);
  
  const subjectPressed = ({item})=>{
    // sub = item;
    setSubject(item)
    // console.log(item)
  }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>

          <View style={styles.logo}>
            <Image
              source={require('../assets/butterfly_104.png')} 
              style={styles.image}
            />
                
            <View style={{alignSelf:'center', marginStart:-5, flex:1}}>
              <Text style={{fontWeight:'700', fontSize:30}}>Schedule</Text> 
            </View>
            <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>

          </View>

          <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:0}}/>
          {/* /////////////////////////////////////////////////////////////////////////////// */}
          
          <View style = {{ flex:1}}>
            <View style={styles.dropdown}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {/* //////////////////////////////////////////////////////////////////// */}
                <View style={[ styles.inputContainer, {alignItems: 'center', marginHorizontal:1.5, marginStart:5},]}>
                  <TextInput
                    placeholder="Subjects" 
                    placeholderTextColor={'#555'}
                    autoCorrect={false}
                    onChangeText={setsub}
                    style={{ fontSize: 15, flex: 1, }}
                  />
                    
                  <TouchableOpacity onPress={() => {setShowSubject(prevState => !prevState), setShowDepartment(false), setShowSpeciality(false)}}>
                    <Feather name={showSubject? "chevron-up":"chevron-down"} size={18} color="#444" />
                  </TouchableOpacity>

                </View>
                {/* /////////////////////////////////////////////////////////////////// */}
             
                <View style={[ styles.inputContainer, {alignItems: 'center', marginHorizontal:1.5, marginStart:5},]}>
                  <TextInput
                    placeholder="Specialities" 
                    placeholderTextColor={'#555'}
                    autoCorrect={false}
                    onChangeText={setspe}
                    style={{ fontSize: 15, flex: 1, }}
                  />
                    
                  <TouchableOpacity onPress={() => {setShowSpeciality(prevState => !prevState), setShowDepartment(false), setShowSubject(false)}}>
                    <Feather name={showSpeciality? "chevron-up":"chevron-down"} size={18} color="#444" />
                  </TouchableOpacity>

                </View>
                
                {/* /////////////////////////////////////////////////////////////////// */}
                
                <View style={[ styles.inputContainer, {alignItems: 'center', marginHorizontal:1.5, marginStart:5},]}>
                  <TextInput
                    placeholder="Departments" 
                    placeholderTextColor={'#555'}
                    autoCorrect={false}
                    onChangeText={setdep}
                    style={{ fontSize: 15, flex: 1, }}
                  />
                  
                  <TouchableOpacity onPress={() => {setShowDepartment(prevState => !prevState), setShowSubject(false), setShowSpeciality(false)}}>
                    <Feather name={showDepartment? "chevron-up":"chevron-down"} size={18} color="#444" />
                  </TouchableOpacity>

                </View>
                {/* /////////////////////////////////////////////////////////////////// */}
              </ScrollView>
            </View>

            {/* /////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////// */}
            {showSubject &&
              <View style={styles.listContainer}>
                <ScrollView horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={{ paddingVertical: 20 }}
                >

                  <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={{alignSelf: 'flex-start',}}
                    numColumns={Math.ceil(subjectData.length / 2)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={subjectData}
                    style={{flex:1, marginTop:5}}
                    
                    keyExtractor={item => item.subject_id}
              
                    renderItem={({item}) =>
                      <View>
                        {(subject == '') &&
                        <TouchableOpacity onPress={()=>subjectPressed({item})}>
                          <View style= {styles.subContainer}>
                            <Text style={{alignSelf:'center', color:'white', fontSize:16}}>{item.subject_name}</Text>
                          </View>
                        </TouchableOpacity>
                        }
                        {(subject != '' && item.subject_name.toLowerCase().includes(subject.toLowerCase())) &&
                        <TouchableOpacity onPress={()=>subjectPressed({item})}>
                          <View style= {styles.subContainer}>
                            <Text style={{alignSelf:'center', color:'white', fontSize:16}}>{item.subject_name}</Text>
                          </View>
                        </TouchableOpacity>
                        }
                      </View>
                    }
                  />
              
                </ScrollView>
                <Divider width={1} orientation='vertical' style={{marginTop:0, marginBottom:0}}/>
              </View>
            }
            {/* //////////////////////////////////////////////////////////////////////////////// */}


            {showSpeciality &&
              <View style={styles.listContainer}>
                <ScrollView horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={{ paddingVertical: 20 }}
                >

                  <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={{alignSelf: 'flex-start',}}
                    numColumns={Math.ceil(specialityData.length / 2)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={specialityData}
                    style={{flex:1, marginTop:5}}
                    
                    keyExtractor={item => item.speciality_id}
              
                    renderItem={({item}) =>
                      <View>
                        {(speciality == '') &&
                        <TouchableOpacity onPress={()=>subjectPressed({item})}>
                          <View style= {styles.subContainer}>
                            <Text style={{alignSelf:'center', color:'white', fontSize:16}}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                        }
                        {(speciality != '' && item.name.toLowerCase().includes(speciality.toLowerCase())) &&
                        <TouchableOpacity onPress={()=>subjectPressed({item})}>
                          <View style= {styles.subContainer}>
                            <Text style={{alignSelf:'center', color:'white', fontSize:16}}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                        }
                      </View>
                    }
                  />
              
                </ScrollView>
                <Divider width={1} orientation='vertical' style={{marginTop:0, marginBottom:0}}/>
              </View>
            }
            {/* //////////////////////////////////////////////////////////////////////////////// */}


            {showDepartment &&
              <View style={styles.listContainer}>
                <ScrollView horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={{ paddingVertical: 20 }}
                >

                  <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={{alignSelf: 'flex-start',}}
                    numColumns={Math.ceil(departmentData.length / 2)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={departmentData}
                    style={{flex:1, marginTop:5}}
                    
                    keyExtractor={item => item.department_id}

                    
              
                    renderItem={({item}) =>

                      <View>

                        {(department == '') &&
                        <TouchableOpacity onPress={()=>subjectPressed({item})}>
                          <View style= {styles.subContainer}>
                            <Text style={{alignSelf:'center', color:'white', fontSize:16}}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                        }
                        {(department != '' && item.name.toLowerCase().includes(department.toLowerCase())) &&
                        <TouchableOpacity onPress={()=>subjectPressed({item})}>
                          <View style= {styles.subContainer}>
                            <Text style={{alignSelf:'center', color:'white', fontSize:16}}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                        }
                      </View>
                    }
                  />
              
                </ScrollView>
                <Divider width={1} orientation='vertical' style={{marginTop:0, marginBottom:0}}/>
              </View>
            }
            {/* /////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////// */}
            
            <View style = {styles.tableContainer}>
              <Schedule chosenSubject={chosenSubject} />
            </View>
          </View>
        </SafeAreaView>
      </View>
    )
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  
      registerButton: {
        marginTop:-30,
      },
  
      image: {
        width: 60,
        height: 60,
        marginRight:5,
        marginLeft:-10
      },

      listContainer: {
        height:115,
        width: '110%',
        alignSelf:'center',
        marginTop:-10,
        marginBottom:15
        // marginTop:-35,
        
      },

      schedule: {
        flex:1,
        backgroundColor: COLORS.A_gray,
      },

      dropdown:{
        flexDirection:'row',
        marginBottom:15,
        marginTop:-15,
        width:'110%',
        alignSelf:'center',
        // marginHorizontal:0,
        // backgroundColor:'red'
      },

      tableContainer:{
        flex:1,
        marginBottom:5,
        marginTop:-15,
        width,
        alignSelf:'center',
      },

      subContainer:{
        backgroundColor:COLORS.A_dark_blue,//COLORS.A_yellow,
        // width: 120,
        height:50,
        paddingHorizontal:25,
        borderRadius:25,
        // paddingHorizontal:5,
        justifyContent:'center',
        // alignSelf:'center',
        marginHorizontal:5,
        marginBottom:5
        
      },

      logo:{
        flexDirection: 'row',
        marginBottom:-10,
      },

      box: {
        height: 150,
        width: 150,
        backgroundColor: 'blue',
        borderRadius: 5,
      },

      inputContainer: {
        flex:1,
        height: 45,
        width: 150,
        backgroundColor: '#ddd',//'#ebecf0',//'#c8dfea'//too dark,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        // borderWidth: 0.5,
        borderRadius: 35,
        marginTop:20,
        
        // width: '100%'
      },

      dropdownCompany: {
        marginHorizontal: 0,
        marginStart:5,
        marginBottom: 15,
        width:180,
        marginTop:20
      },
      dropdown2: {
        borderColor: "#ddd",
        backgroundColor:"#ddd",
        borderRadius:35,
        height: 50,

      },
    });

  
  export default SchedulePage;