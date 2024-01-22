import { Modal, Pressable, FlatList, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../conts/colors'
import { Feather } from '@expo/vector-icons';
import {userr, pass, id} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { Octicons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const SuggestionPage = () => {

  //fetch all users and all posts from all users render them on flatlist
  const [USERS, setUser] = useState([
    {user_id:'1', name:'asma',    photo:'', email:'asmajehad919@gmail.com', username:'asma_jehad', phonenumber:'09080'},
    {user_id:'2', name:'aya',     photo:'', email:'aya1@gmail.com'        , username:'aya04'     , phonenumber:''},
    // {user_id:'3', name:'tasbeh',  photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
    // {user_id:'4', name:'manar',   photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
    // {user_id:'5', name:'tasneem', photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
    {user_id:'6', name:'amsa2',   photo:'', email:'asma2@gmail.com'       , username:'asma22'    , phonenumber:'0000'},
    // {user_id:'7', name:'amal',    photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
    // {user_id:'8', name:'anwar',   photo:'', email:''                   , username:'asma_jehad', phonenumber:''},
  ])

  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState('')

  const miniProfile = ()=>{
    return(
      <Modal
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity onPress={()=> {setModalVisible(false)}} style={{backgroundColor:"#00000778", flex:1}}>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={()=> {}}
            style={[ 
              StyleSheet.absoluteFillObject,
              {
                // backgroundColor:COLORS.A_white, 
                backgroundColor:'white',
                marginTop:120,
                height:330,
                // marginBottom:80,  
                marginHorizontal:15,
                flex:1, 
                padding:40, 
                borderRadius:10,
              },
            ]}
          >

            {/* /////////////////////////////task body start//////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////// */}
            <View style={{marginTop:-35, marginHorizontal:-25, marginBottom:15,}}>

              <View style={{alignSelf:'auto', marginTop:10, flexDirection:'row', marginStart:5, justifyContent:'space-between'}}>
                <Text style={{fontSize:20, fontWeight:'600'}}>{profile.username}</Text>
                <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
                  <AntDesign name="close" size={30} color="#666" />
                </TouchableOpacity>
              </View>
              <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:10, marginHorizontal:0}}/>

              {/* /////////add task title/////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{flexDirection:'row'}}></View>
                <Image 
                  style={{
                    width:100,
                    alignSelf:'center',
                    // alignSelf:'flex-end',
                    // position:'absolute',
                    height:100,
                   
                    marginBottom:5,
                    right:5,
                    borderWidth:0.5,
                    borderColor:"gray",
                    borderRadius:100,}} 
                  source={require('../assets/user_100_gray.png')} 
                />
                <View style={{alignSelf:'center', flexDirection:'row'}}>
                  <MaterialIcons name="email" size={25} color={COLORS.A_dark_blue} style={{alignSelf:'center', marginTop:4}}/>
                  <Text style={{fontSize:20, fontWeight:'500'}}>{profile.email}</Text>
                </View>
              {/* <Text style={{fontSize:18, marginBottom:0, fontWeight:'600'}}>profile details: </Text> */}
              <View style={{marginTop:10, marginLeft:5 }}>
                
              
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text style={{fontSize:16, fontWeight:'400'}}>Name: {profile.name}</Text>
                  {( profile.phonenumber != '' && profile.phonenumber != null) && <Text style={{fontSize:16, fontWeight:'400'}}>Phone: {profile.phonenumber}</Text>}
                </View>
                

                <View 
                  style={{
                    // marginStasrt:-20,
                    marginTop:35,
                    flexDirection:'row', 
                    justifyContent:'flex-start',
                    // justifyContent:'space-evenly'
                  }}
                >
                  {/* <TouchableOpacity style={{flexDirection:'row'}}>
                    <Ionicons name="add-circle-sharp" size={47} color={COLORS.A_dark_blue} />
                    <Text style={{alignSelf:'center'}}>Add to a project</Text>
                  </TouchableOpacity> */}

                <TouchableOpacity style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons name="send-circle" size={45} color={COLORS.A_dark_blue} />
                  <Text style={{alignSelf:'center'}}> Send a message</Text>
                </TouchableOpacity>
                </View>

                {/* <Text style={{fontSize:18, fontWeight:'500'}}>add to project: show add to project block and let the user write the name of the project he want to add this person to or ofer him to create new project{}</Text>
                <Text style={{fontSize:18, fontWeight:'500'}}>send message: open chat page {}</Text> */}
              </View>

              {/* //add personal details//////////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              
             
                

              
              

              {/* /////set deadline////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */}
              


              {/* /////set Category////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */} 
              

              {/* /////set remainder////////////////////////////////////////////////////////////////////////////////
              //////////////////////////////////////////////////////////////////////////////////////// */} 
              

            </View>

            
            {/* <TouchableOpacity style={{height:50, width:80, position:'absolute', bottom:10, right:10, alignSelf:'center', justifyContent:'center', borderRadius:30}} onPress={()=>{}}>
              <Text style={{textAlign:'center', fontSize:18, fontWeight:'500', color:COLORS.A_dark_blue}}>send message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:50, width:80, position:'absolute', bottom:10, right:70, alignSelf:'center', justifyContent:'center', borderRadius:30}} onPress={()=>{}}>
          
            </TouchableOpacity> */}
            
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      
    )
  }

  //show user name//////////////////////////////////////////
  const getPeople =(item)=>{
    
  
  return (
    <View>
      {(item.user_id != id)&&
      <View style={{}}>
        <TouchableOpacity onPress={()=>{setModalVisible(true),setProfile(item)}} style={{flexDirection:'row'}}>
          <Image 
            style={styles.story} 
            source={require('../assets/user_100_gray.png')} 
          />
          <Text style={{fontSize:18, alignSelf:'center', marginStart:5 }}>{item.name}</Text>
          {miniProfile()}
        </TouchableOpacity>


      </View>
      }
    </View>
  )
}


  return (
    <View style={{width, height:height-255, backgroundColor:COLORS.A_white}}>
      <View style={{justifyContent:'space-between', flexDirection:'row', marginStart:15, marginTop:10, marginBottom:-5}}>
        <View style={{ flexDirection:'row'}}>
          <Text style={{fontSize:18, fontWeight:'600', marginRight:5}}>Work Requests:</Text>
        </View>
  
      </View>
      {/* post////////////////////////////////////////////////////////////////////////////////// */}
      <View style={{justifyContent:'space-between', flexDirection:'row', marginStart:15, marginTop:10, marginBottom:-5}}>


        <View style={{ flexDirection:'row'}}>
          <Text style={{fontSize:18, fontWeight:'600', marginRight:5}}>Peaple Suggestions</Text>
        </View>
          
        {/* <TouchableOpacity style={{right:20}}>
          <Octicons name="diff-added" size={28} color="black" />
        </TouchableOpacity> */}

      </View>
      {/* /////////////////////////////////////////////////////// */}

      <FlatList
        // scrollEnabled={scroll}
        // extraData={selectedId}
        data={USERS} 
        keyExtractor={item => item.user_id}
        style={{marginBottom:0 , marginTop:5, backgroundColor:COLORS.A_white, marginHorizontal:-2}}
        renderItem={({item})=>{

          return(
              
            <View style= {{marginBottom:5, marginTop:5, marginHorizontal:20}}>
              {getPeople(item)} 
            </View>
          ) 
        }}
      /> 
                    
    </View> 

  );
}

///////////////////////////////////////////////////////////////////////////////////////////
//styleing 
const styles = StyleSheet.create({
  contentContainer:{
    flex:1,
    // height:'100%',
    paddingTop: 25, 
    paddingHorizontal: 15,
    // backgroundColor:'red'
  },

  container: {
    height: "100%",
    flex: 1,
    backgroundColor: COLORS.A_white,
  },

  image: {
    width: 50,
    height: 50,
    marginRight:3,
    marginLeft:-10
  },

  logo:{
    flexDirection: 'row',
    flex:1,
    // marginStart:
    // marginTop:"60%"
  },

  add:{
    // flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'flex-end',
    backgroundColor:COLORS.A_yellow,
    height:55,
    width:55,
    borderRadius:100,
    marginTop:-200,
    marginRight:-3
  },

  postslist:{
    height: "100%",
    flex: 1,
    // flexGrow:1,
    backgroundColor: COLORS.A_blue,
  },

  story:{
    width:40,
    height:40,
    margin:5,
    borderWidth:0.5,
    borderColor:"gray",
    borderRadius:35,
  },


  image: {
    width: 40,
    height: 40,
  },

  //////////////////////////
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SuggestionPage