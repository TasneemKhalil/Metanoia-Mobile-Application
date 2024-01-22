import { Modal, Pressable, ScrollView,FlatList, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../conts/colors'
import { Feather } from '@expo/vector-icons';
import {userr, pass, id, user_email} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { Octicons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../components/Input';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../firebase';

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
 

const AllChatsPage = ({navigation}) => {

  const goToChat=(email)=>{
    //to to chat between email(the other user) and user_email(current user)
    // console.log(email)
    if(email != '' && email != null)
    navigation.navigate('one chat Page',{email})
  }

  const [USERS, setUser] = useState([
    {user_id:'1', name:'asma',    photo:'', email:'asmajehad919@gmail.com'},
    {user_id:'2', name:'aya',     photo:'', email:'aya1@gmail.com'},
    // {user_id:'3', name:'tasbeh',  photo:'', email:''},
    // {user_id:'4', name:'manar',   photo:'', email:''},
    // {user_id:'5', name:'tasneem', photo:'', email:''},
    {user_id:'6', name:'amsa2',   photo:'', email:'asma2@gmail.com'},
    // {user_id:'7', name:'amal',    photo:'', email:''},
    // {user_id:'8', name:'anwar',   photo:'', email:''},
  ])

  const getUsers = ( item ) => {
    var t = false
    if(item.email != auth?.currentUser?.email){
      t= true
    }

    return (
      <View>
        {t &&
        <TouchableOpacity onPress={()=>{goToChat(item.email)}}

          style={{ 
            borderBottomWidth: 0.6,
            paddingVertical: 20,
            borderColor: "#ccc",
            paddingHorizontal: 16,
          }}
        >
          <Text style={styles.itemBodyStyle}>{item.name}</Text>
        </TouchableOpacity>}
      </View>
    );
  };
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
return (
    <View style={{width, height:height-70, backgroundColor:COLORS.A_white, marginTop:25}}>
      {/* ///////////////////////////////////////////////////////////////// */}
      <View style={{ flexDirection:'row', paddingVertical:10, backgroundColor:COLORS.A_dark_blue}}>

        <TouchableOpacity  
          style={{marginRight:10, marginLeft:15, alignSelf:'center'}} 
          onPress={()=>navigation.navigate('Search Page')}
        >
          <Octicons name="search" size={25} color="white" />
        </TouchableOpacity>

        <View style={{ flexDirection:'row', marginBottom:5, alignSelf:'center'}}>
          <Text style={{fontSize:22, fontWeight:'600',  marginTop:5, color:'white', alignSelf:'center'}}>Messages</Text>
        </View>
            
        

        <AntDesign name="right" size={30} color="white" style={{position:'absolute' ,alignSelf:'center', right:5}} onPress={()=> {navigation.goBack()}}/>
      

      </View>
      
      {/* ////////////////////////search for ppl/////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}

      
      {/* /////////////////////////chats list////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      <View style={{flex:1}}>
        <FlatList
          style={{flex:1,}}
          data={USERS}
          keyExtractor={ (user) => user.user_id}
          renderItem={({item})=>{

            return(
              <View style= {{}}>
                {getUsers(item)} 
              </View>
            ) 
          }}
        /> 
      </View>               
    </View> 
  )
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
      paddingHorizontal: 15,
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
    },

    story:{
      width:35,
      height:35,
      marginHorizontal:10,
      marginVertical:7,
      borderWidth:0.5,
      borderColor:"gray",
      borderRadius:35,
    },

    text:{
      justifyContent:'center',
      alignSelf:'center',
      fontWeight:'bold',
      marginBottom:1.5,
      fontSize:17,
      marginStart:-2
    },

    itemTitleStyle: {
      fontSize: 14,
      color: "#000",
      fontWeight: "bold",
    },
    itemBodyStyle: {
      fontSize: 14,
      color: "#555",
      marginTop: 4,
    },

  });

export default AllChatsPage


