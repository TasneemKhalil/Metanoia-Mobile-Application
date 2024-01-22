import { Modal,View, Text , StyleSheet,TouchableOpacity, ScrollView, FlatList, LogBox} from 'react-native';
import React, { Component, useEffect, useState }from 'react';
import COLORS from '../conts/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import moment from 'moment';
// import App2, {schedulePushNotification} from '../Notification';

const Schedule = ({chosenSubject}) =>{

  const[selectedId, setselectedId] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
    
    //schedule data if user has no saved scedule
    const [time, setTime] = useState([
      {key:'8:00',    data:0},  {key:1, data:''},   {key:2, data:''},   {key:3, data:''},   {key:4, data:''},   {key:5, data:''},   {key:6, data:''},   {key:7, data:''}, 
      {key:'8:30',    data:7},  {key:8, data:''},   {key:9, data:''},   {key:10, data:''},  {key:11, data:''},  {key:12, data:''},  {key:13, data:''},  {key:14, data:''}, 
      {key:'9:00',  data:2*7},  {key:15, data:''},  {key:16, data:''},  {key:17, data:''},  {key:18, data:''},  {key:19, data:''},  {key:20, data:''},  {key:21, data:''}, 
      {key:'9:30',  data:3*7},  {key:22, data:''},  {key:23, data:''},  {key:24, data:''},  {key:25, data:''},  {key:26, data:''},  {key:27, data:''},  {key:28, data:''},  
      {key:'10:00', data:4*7},  {key:29, data:''},  {key:30, data:''},  {key:31, data:''},  {key:32, data:''},  {key:33, data:''},  {key:34, data:''},  {key:35, data:''}, 
      {key:'10:30', data:5*7}, {key:36, data:''},  {key:37, data:''},  {key:38, data:''},  {key:39, data:''},  {key:40, data:''},  {key:41, data:''},  {key:42, data:''}, 
      {key:'11:00', data:6*7}, {key:43, data:''},  {key:44, data:''},  {key:45, data:''},  {key:46, data:''},  {key:47, data:''},  {key:48, data:''},  {key:49, data:''}, 
      {key:'11:30', data:7*7}, {key:50, data:''},  {key:51, data:''},  {key:52, data:''},  {key:53, data:''},  {key:54, data:''},  {key:55, data:''},  {key:56, data:''}, 
      {key:'12:00', data:8*7}, {key:57, data:''},  {key:58, data:''},  {key:59, data:''},  {key:60, data:''},  {key:61, data:''},  {key:62, data:''},  {key:63, data:''}, 
      {key:'12:30', data:9*7}, {key:64, data:''},  {key:65, data:''},  {key:66, data:''},  {key:67, data:''},  {key:68, data:''},  {key:69, data:''},  {key:70, data:''}, 
      {key:'13:00',data:10*7}, {key:71, data:''},  {key:72, data:''},  {key:73, data:''},  {key:74, data:''},  {key:75, data:''},  {key:76, data:''},  {key:77, data:''}, 
      {key:'13:30',data:11*7}, {key:78, data:''},  {key:79, data:''},  {key:80, data:''},  {key:81, data:''},  {key:82, data:''},  {key:83, data:''},  {key:84, data:''}, 
      {key:'14:00',data:12*7}, {key:85, data:''},  {key:86, data:''},  {key:87, data:''},  {key:88, data:''},  {key:89, data:''},  {key:90, data:''},  {key:91, data:''}, 
      {key:'14:30',data:13*7}, {key:92, data:''},  {key:93, data:''},  {key:94, data:''},  {key:95, data:''},  {key:96, data:''},  {key:97, data:''},  {key:98, data:''}, 
      {key:'15:00',data:14*7}, {key:99, data:''},  {key:100, data:''}, {key:101, data:''}, {key:102, data:''}, {key:103, data:''}, {key:104, data:''}, {key:105, data:''}, 
      {key:'15:30',data:15*7}, {key:106, data:''}, {key:107, data:''}, {key:108, data:''}, {key:109, data:''}, {key:110, data:''}, {key:111, data:''}, {key:112, data:''}, 
      {key:'16:00',data:16*7}, {key:113, data:''}, {key:114, data:''}, {key:115, data:''}, {key:116, data:''}, {key:117, data:''}, {key:118, data:''}, {key:119, data:''}, 
      {key:'16:30',data:17*7}, {key:120, data:''}, {key:121, data:''}, {key:122, data:''}, {key:123, data:''}, {key:124, data:''}, {key:125, data:''}, {key:126, data:''}, 
      {key:'17:00',data:18*7}, {key:127, data:''}, {key:128, data:''}, {key:129, data:''}, {key:130, data:''}, {key:131, data:''}, {key:132, data:''}, {key:133, data:''}, 
      {key:'17:30',data:19*7}, {key:134, data:''}, {key:135, data:''}, {key:136, data:''}, {key:137, data:''}, {key:138, data:''}, {key:139, data:''}, {key:140, data:''}, 
      {key:'18:00',data:20*7}, {key:141, data:''}, {key:142, data:''}, {key:143, data:''}, {key:144, data:''}, {key:145, data:''}, {key:146, data:''}, {key:147, data:''}, 
      {key:'18:30',data:21*7}, {key:148, data:''}, {key:149, data:''}, {key:150, data:''}, {key:151, data:''}, {key:152, data:''}, {key:153, data:''}, {key:154, data:''}, 
      
    ])

    const [data, setData]= useState([
      {id:'0', user_id:'1', time:'8:00', subject_h:'1', subject:'java', day:'sat'},
      {id:'1', user_id:'1', time:'9:30', subject_h:'1,5', subject:'try', day:'sun'},
      {id:'2', user_id:'1', time:'11:00', subject_h:'1', subject:'me', day:'sun'},
      {id:'3', user_id:'1', time:'10:00', subject_h:'3', subject:'inn', day:'sat'},
      {id:'4', user_id:'1', time:'8:00', subject_h:'1', subject:'whateverrr', day:'mon'},
      {id:'5', user_id:'1', time:'8:00', subject_h:'1', subject:'hii', day:'wed'},

    ])

    useEffect(()=>{
      //fetch data here
      try{

      }
      catch(error){

      }

    })

    useEffect(()=>{
      let key =[]
      let sub = []

      data.map(item=>{
        time.map(t=>{
          if(item.time == t.key){
            // console.log(item.subject, t.data)
            if(item.day == 'sat'){
              time.map(tt=>{
                if(tt.key == t.data+1){

                  if(item.subject_h == 1){
                    key.push( tt.key ); sub.push( item.subject ); 
                    key.push( tt.key+7 ); sub.push( ' ' ) 
                  }
                  if(item.subject_h == 1,5){
                    key.push( tt.key ) ; sub.push( item.subject ) 
                    key.push( tt.key+7 ); sub.push( ' ' )  
                    key.push( tt.key+7+7 ); sub.push( ' ' ) 
                  }
                  if(item.subject_h == 3){
                    key.push( tt.key ); sub.push( item.subject ) 
                    key.push( tt.key+7 ); sub.push( ' ' )  
                    key.push( tt.key+7+7 ); sub.push( ' ' ) 
                    key.push( tt.key+7+7+7 ); sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7 ); sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7+7 ); sub.push( ' ' ) 
                  }
                  
                }
              })//second time map
            }//if day sat

            if(item.day == 'sun'){
              time.map(tt=>{
                if(tt.key == t.data+2){

                  if(item.subject_h == 1){
                    key.push( tt.key ); sub.push( item.subject ) 
                    key.push( tt.key+7 ); sub.push( ' ' ) 
                  }
                  if(item.subject_h == 1,5){
                    key.push( tt.key ); sub.push( item.subject ) 
                    key.push( tt.key+7 ); sub.push( ' ' )  
                    key.push( tt.key+7+7 ); sub.push( ' ' ) 
                  }
                  if(item.subject_h == 3){
                    key.push( tt.key ); sub.push( item.subject ) 
                    key.push( tt.key+7 ); sub.push( ' ' )  
                    key.push( tt.key+7+7 ); sub.push( ' ' ) 
                    key.push( tt.key+7+7+7 ); sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7 ); sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7+7 ); sub.push( ' ' ) 
                  }
                  
                }
              })//second time map
            }//if day sun

            if(item.day == 'mon'){
              time.map(tt=>{
                if(tt.key == t.data+3){

                  if(item.subject_h == 1){
                    key.push( tt.key ); sub.push( item.subject ) 
                    key.push( tt.key+7 ); sub.push( ' ' ) 
                  }
                  if(item.subject_h == 1,5){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                  }
                  if(item.subject_h == 3){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7+7 );sub.push( ' ' ) 
                  }
                 
                }
              })//second time map
            }//if day mon

            if(item.day == 'tue'){
              time.map(tt=>{
                if(tt.key == t.data+4){

                  if(item.subject_h == 1){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' ) 
                  }
                  if(item.subject_h == 1,5){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                  }
                  if(item.subject_h == 3){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7+7 );sub.push( ' ' ) 
                  }

                }
              })//second time map
            }//if day tue

            if(item.day == 'wed'){
              time.map(tt=>{
                if(tt.key == t.data+5){

                  if(item.subject_h == 1){
                    key.push( tt.key ); sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' ) 
                  }
                  if(item.subject_h == 1,5){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                  }
                  if(item.subject_h == 3){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7+7 );sub.push( ' ' ) 
                  }
                 
                }
              })//second time map
            }//if day wed

            if(item.day == 'thu'){
              time.map(tt=>{
                if(tt.key == t.data+6){

                  if(item.subject_h == 1){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 ) ;sub.push( ' ' ) 
                  }
                  if(item.subject_h == 1.5){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                  }
                  if(item.subject_h == 3){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7+7 );sub.push( ' ' ) 
                  }
                 
                }
              })//second time map
            }//if day thu

            if(item.day == 'fri'){
              time.map(tt=>{
                if(tt.key == t.data+7){

                  if(item.subject_h == 1){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' ) 
                  }
                  if(item.subject_h == 1.5){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                  }
                  if(item.subject_h == 3){
                    key.push( tt.key );sub.push( item.subject ) 
                    key.push( tt.key+7 );sub.push( ' ' )  
                    key.push( tt.key+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7 );sub.push( ' ' ) 
                    key.push( tt.key+7+7+7+7+7 );sub.push( ' ' ) 
                  }
                 
                }
              })//second time map
            }//if day fri
          }//if time 
        })//first time map
      })//data map

      const newState = time.map(ttt=>{
        for(var i=0; i<key.length; i++){
          if(key[i] == ttt.key){ttt.data = sub[i]}
        }
        return ttt
      })
      setTime(newState)
      
    },[])



    const addSubject=(key)=>{
      //add to database here a new subject to schedule
      //remove this when database it ready cuz ill set data again 
      const newState = time.map(ttt=>{
        if(key == ttt.key) {ttt.data = chosenSubject.subject_name} return ttt
      })
      setTime(newState)
    }

    
    const [optionItem, setOptionsItem] = useState('')
    const openOptions=()=>{
      return(
        // <View>
          <Modal
            transparent={true}
            visible={modalVisible}
          >
            <TouchableOpacity onPress={()=> {setModalVisible(false)}} style={{backgroundColor:'#0000000a',flex:1, }}>
              <TouchableOpacity 
                activeOpacity={1}
                onPress={()=> {}}
                style={[ 
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor:COLORS.A_white, 
                    marginTop:230,
                    height:200,  
                    marginHorizontal:20,
                    flex:1, 
                    padding:40, 
                    borderRadius:10,
                  },
                ]}
              >

                <View style={{flexDirection:'row', alignSelf:'center'}}>
                  <Ionicons name="md-book" size={30} color={COLORS.A_dark_blue} style={{alignSelf:'center', marginStart:1}}/>
                  {optionItem.data != ' ' && <Text style={{marginStart:5, marginTop:0, fontSize:20}}>{optionItem.data}</Text>}
                  
                </View>

                {/* edit subject */}
                <TouchableOpacity style={{flexDirection:'row'}}>
                  <AntDesign name="clockcircle" size={24} color="black" />
                  {optionItem.data != ' ' && <Text style={{marginStart:5, alignSelf:'center'}}>Move {optionItem.data} to another hour</Text>}
                  {optionItem.data == ' ' && <Text style={{marginStart:5, alignSelf:'center'}}>Move subject to another hour</Text>}
                </TouchableOpacity>

                {/* delete subject */}
                <TouchableOpacity style={{flexDirection:'row'}}>
                  <MaterialIcons name="delete" size={30} color="black" style={{marginStart:-4}}/>
                  {optionItem.data != ' ' && <Text style={{alignSelf:'center'}}>Remove {optionItem.data} from schedule</Text>}
                  {optionItem.data == ' ' && <Text style={{alignSelf:'center'}}>Remove subject from schedule</Text>}
                </TouchableOpacity>

              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        // </View>
      )
    }


    const display =(item)=>{
      if(item.key > 0 && item.key < 200){
        return(
          <View>
          {(item.data != '' && item.data != null) &&
          <TouchableOpacity onPress={()=>{if(item.data!=' '){setModalVisible(true),setOptionsItem(item)}}} style={[styles.container,{backgroundColor:'#FBEC5D', borderWidth:0}]}>
            <Text style={styles.text2}>{item.data}</Text>
            {openOptions()}
          </TouchableOpacity>}

          {(item.data == '' || item.data == null) &&
          <TouchableOpacity onPress={()=>{addSubject(item.key),console.log(item.key)}} style={styles.container}>
            <Text style={styles.text2}>{item.data}</Text>
          </TouchableOpacity>}
        </View>
        )
      }
      else{
        return(
          <TouchableOpacity onPress={()=>{console.log(item.key)}} style={styles.containerTime}>
            <Text style={styles.text}>{item.key}</Text>
          </TouchableOpacity>
        )
      }
    }


  return(
    <ScrollView horizontal={true} >
      <View style={{flex:1, marginTop:5}}>
            
        <View key={0} style={{flexDirection:'row'}}>
          <View style={styles.containerDay}><Text style={styles.text}>__</Text></View>
          <View style={styles.containerDay}><Text style={styles.text}>SAT</Text></View>
          <View style={styles.containerDay}><Text style={styles.text}>SUN</Text></View>
          <View style={styles.containerDay}><Text style={styles.text}>MON</Text></View>
          <View style={styles.containerDay}><Text style={styles.text}>TUE</Text></View>
          <View style={styles.containerDay}><Text style={styles.text}>WED</Text></View>
          <View style={styles.containerDay}><Text style={styles.text}>THU</Text></View>
          <View style={styles.containerDay}><Text style={styles.text}>FRI</Text></View>
        </View>

        <View style={{flexDirection:'row'}}>
          {/* hours */}
          <FlatList
            numColumns={8}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            extraData={data}
            data={time} 
            keyExtractor={item => item.key}
            // style={{marginTop:5, backgroundColor:'#eeef', marginHorizontal:5, paddingTop:5}}
  
            renderItem={({item})=>{
              return(
                <View style={{}}>
                  {display(item)}
                </View>
              )
            }}
          />

        </View>
        


      </View>
    </ScrollView>
        
  );

};
export default Schedule;

//styleing 
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#ddd",
        height:80, 
        width:70, 
        marginTop:5, 
        marginLeft:5, 
        borderRadius:18
    },

    containerSubject:{
      flex:1,
      backgroundColor:"yellow",
      height:80, 
      width:70, 
      borderRadius:18
  },

    containerTime:{
        backgroundColor:COLORS.A_dark_blue,
        height:80, 
        width:70, 
        marginTop:5, 
        marginLeft:5, 
        borderRadius:18,
        justifyContent:'center',
    },

    containerDay:{
        backgroundColor:COLORS.A_dark_blue,
        height:70, 
        width:70, 
        marginTop:6, 
        marginBottom:3,
        marginLeft:5, 
        borderRadius:18,
        borderWidth:0.8,
        borderColor:"#bbb",
        justifyContent:'center',
    },

    text:{
        fontSize:17,
        color:"white",
        textAlign: 'center',
        // alignSelf:'center',
        // marginVertical:"40%"
    },

    text2:{
      fontSize:16,
      color:"black",
      textAlign: 'center',
      marginVertical:"40%",
      flexWrap: 'wrap',
  },
    
  });



