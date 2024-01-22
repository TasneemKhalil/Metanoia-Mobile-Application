import {findNodeHandle, ScrollView, TextInput, SafeAreaView, View, Text ,TouchableWithoutFeedback, StyleSheet,TouchableOpacity,Image, Dimensions, FlatList, Animated, Alert} from 'react-native';
import React, { createRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import COLORS from '../conts/colors'
import SearchBar from '../components/SearchBar'
import { Feather } from '@expo/vector-icons';
import CommunityHeader from '../components/CommunityHeader';
import {userr, pass, id, username, bio, user_email, user_phone, user_photo} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { Octicons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import AllPostsPage from './AllPostsPage';
import SuggestionPage from './SuggestionPage';
import { AntDesign } from '@expo/vector-icons';
import MyPostsPage from './MyPostsPage';
import SavedPostsPage from './SavedPostsPage';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';
import Percentage from '../components/Percentage';

// export var theProject = null

/////////////////////////////////////////////////////////////
const openProject=(item, navigation)=>{
  // theProject = project
  navigation.navigate('the Project', {item})
}
///////////////////////////////////////////////////////////


const ProfilePage = ({navigation}) => {
  const [data, setData] = useState([
    {key:'0', name:'Projects', color:'blue'},
    {key:'1', name:'Bookmarks', color:'green'},
    // {key:'2', name:'Recently Opened??! maybe', color:'green'},
  ])

  const [showEdit, setShowEdit] = useState(false)
  const [newUserName, setNewUserName] = useState(userr)
  const [newUserPhone, setnewUserPhone] = useState(user_phone)

  const [projects, setProjects]= useState([
    {project_id:'0', goal:'finish this semester and disappear', user_id:'1', name:'the finish me1', subject_id:'', percentage:'0', lastOpened:'yes'},
    {project_id:'1', goal:'finish this semester and disappear', user_id:'1', name:'the finish me2', subject_id:'', percentage:'60', lastOpened:'yes'},
    {project_id:'2', goal:'finish this semester and disappear', user_id:'1', name:'the finish me3', subject_id:'', percentage:'100', lastOpened:'yes'},
    {project_id:'3', goal:'finish this semester and disappear', user_id:'1', name:'not me1', subject_id:'', percentage:'0', lastOpened:'yes'},
    {project_id:'4', goal:'finish this semester and disappear', user_id:'1', name:'not me2', subject_id:'', percentage:'10', lastOpened:''},
    {project_id:'5', goal:'finish this semester and disappear', user_id:'5', name:'not me3', subject_id:'', percentage:'20', lastOpened:''},
    {project_id:'6', goal:'finish this semester and disappear', user_id:'9', name:'not me4', subject_id:'', percentage:'30', lastOpened:''},
    {project_id:'7', goal:'', user_id:'5', name:'not me5', subject_id:'', percentage:'90', lastOpened:''},
    {project_id:'8', goal:'', user_id:'9', name:'not me6', subject_id:'', percentage:'40', lastOpened:''},
    {project_id:'9', goal:'', user_id:'5', name:'not me7', subject_id:'', percentage:'40', lastOpened:''},
    {project_id:'10', goal:'', user_id:'0', name:'not me8', subject_id:'', percentage:'100', lastOpened:''},
    {project_id:'11', goal:'', user_id:'0', name:'not me5', subject_id:'', percentage:'90', lastOpened:''},
    {project_id:'12', goal:'', user_id:'0', name:'not me6', subject_id:'', percentage:'40', lastOpened:''},
    {project_id:'13', goal:'', user_id:'0', name:'not me7', subject_id:'', percentage:'90', lastOpened:''},
    {project_id:'14', goal:'', user_id:'0', name:'not me8', subject_id:'', percentage:'100', lastOpened:''},
  ])

  const getProject = (item) =>{
    var myproject = false;

      if(item.user_id == id && item.lastOpened == 'yes'){
        myproject = true
      }

    return (
      <View>
        {myproject &&(
          <TouchableOpacity onPress={()=>openProject(item, navigation)}>
            <View style= {{marginBottom:10, height:80, backgroundColor:'#1111', marginHorizontal:10, borderRadius:15, flexDirection:'row'}}>
              <View style={{justifyContent:'center', marginStart:10}}>
                <Percentage percentage={item.percentage}/>
              </View>
              <Text style={{fontSize:20, marginStart:5, alignSelf:'center', marginTop:-5}}>{item.name}</Text>

            </View>
          </TouchableOpacity>
        )}
      </View>
    )

  }

  const saveChange = ()=>{

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
            <Text style={{fontWeight:'600', fontSize:28}}>{username}</Text> 
          </View>

          <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>
        </View>

        <Divider width={1} orientation='vertical' style={{marginTop:5, marginBottom:5}}/>

        {/* ///////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}
        
        <View style={{height:260, width:width-50, alignSelf:'center', backgroundColor:COLORS.A_dark_blue, borderRadius:35,}}>
        
          <View style={{}}>
            <View style= {{backgroundColor:COLORS.A_white, borderColor:"#fff", borderWidth:0, borderRadius:100, marginTop:30, alignSelf:'center'}}>

              <View style={styles.imageprofile}>
              <Ionicons name="person-circle-sharp" size={100} color="#aaa" style={{ alignSelf:'center', marginTop:-13, marginStart:-7}}/>
              </View>

              {/* <Image
                source={require('../assets/user_100_gray.png')} 
                style={styles.imageprofile}
              /> */}

            </View>

            <View style={{alignSelf:'center', flexDirection:'row', marginTop:15}}>
              <MaterialIcons name="email" size={25} color='white' style={{alignSelf:'center', marginTop:2, marginRight:5}}/>
              <Text style={{fontSize:20, fontWeight:'500', color:'white'}}>{auth?.currentUser?.email}</Text>
            </View>

            {/* ///////////////////////////////////////////////////////////////////////// */}
            {/* //////////////////////////////////////////////////////////////////////// */}
            {/* //////////////////////////////////////////////////////////////////////// */}

            {(!showEdit) &&
            <TouchableOpacity onPress={()=>{setShowEdit(prevState => !prevState)}}>
              <MaterialIcons name="settings" size={22} color="#ccc" style={{marginTop:-140, left:305 ,position:'absolute'}}/>
            </TouchableOpacity>}

            {(showEdit) &&
            <View>
              <TouchableOpacity onPress={()=>{setShowEdit(prevState => !prevState)}}>
                <MaterialIcons name="close" size={28} color="#fff" style={{marginTop:-142, left:302 ,position:'absolute'}}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{saveChange(),setShowEdit(prevState => !prevState)}}>
                <MaterialIcons name="save" size={22} color="#fff" style={{marginTop:-140, left:280 ,position:'absolute'}}/>
              </TouchableOpacity>
            </View>}

            <View style={{ marginTop:30,  flexDirection:'row', justifyContent:'space-evenly'}}>

              <View style={{flexDirection:'row'}}>
                <Text style={{color:'white', fontSize:18}}>Name : </Text>
                {(!showEdit) && <Text style={{color:'white', fontSize:16, marginTop:2}}>{userr}</Text>}
                {(showEdit) &&
                  <TextInput
                    autoCorrect={false} 
                
                    style={{ 
                      width:70, 
                      height: 25, 
                      marginTop:0,
                      alignSelf:'center',
                      color:'white',
                      fontSize:16,
                      textAlignVertical:'top',
                      borderBottomWidth:1,
                      // backgroundColor:'#ccc',
                      paddingHorizontal: 5,
                      // borderRadius: 5,
                    }}

                    onChangeText={text => {setNewUserName(text)}}
                    value={newUserName}
                  />
                }
              </View>

              <Divider width={1} orientation='vertical' style={{marginHorizontal:-20}}/>

              <View style={{flexDirection:'row'}}>
                <Text style={{color:'white', fontSize:18}}>Phone : </Text>
                {(!showEdit) && <Text style={{color:'white', fontSize:16, marginTop:2}}>{user_phone}</Text>}
                {(showEdit) &&
                  <TextInput
                    autoCorrect={false} 
                
                    style={{ 
                      width:70, 
                      height: 25, 
                      marginTop:0,
                      alignSelf:'center',
                      color:'white',
                      fontSize:16,
                      textAlignVertical:'top',
                      borderBottomWidth:1,
                      // backgroundColor:'#ccc',
                      paddingHorizontal: 5,
                      // borderRadius: 5,
                    }}

                    onChangeText={text => {setnewUserPhone(text)}}
                    value={newUserPhone}
                  />
                }
              </View>

              
            </View>
            
          </View>
          {/* <Divider width={1} orientation='vertical' style={{marginTop:15, marginBottom:0}}/>

          <View style={{width:'90%', alignSelf:'center', marginTop:10, flex:1, marginBottom:10}}>
            <Text style={{color:'white', fontSize:18}}>Bio : {}</Text>
          </View> */}
        </View>

        {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ////////////////////////////////////////////////////////////////////////////////////// */}
          <View
          style={{
            // top:320,
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal:-20,
            marginTop:0
          }}
        >
          <View style={{ flex: 1, marginStart:0, marginTop:0, alignSelf:'center',justifyContent:'center'}}>
            <Carousel
              loop
              width={width-0}
              height={115}
              // autoPlay={true}  
              data={data}//[...new Array(2).keys()]}
              mode="parallax"
              // scrollAnimationDuration={3070}
              // onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={(item) => (
                <View
                  style={{
                    flex: 1,
                    // borderWidth: 1,
                    // width:200,
                    justifyContent: 'center',
                    backgroundColor:'#FBEC5D',//'#FADA5E',//'#FBEC5D',
                    borderRadius:30,
                    marginTop:0,
                    marginHorizontal:5,
                  }}
                >
                  <View style={{borderRadius:30, backgroundColor:'#ddd4', flex:1,  flexDirection:'row'}}>
                    {item.item.key == "0" && (<MaterialIcons style={{alignSelf:'center', marginBottom:5, marginStart:90}} name="folder" size={50} color="black" />)}
                    {item.item.key == "1" && (<MaterialIcons style={{alignSelf:'center', marginBottom:5, marginStart:75}} name="folder-special" size={50} color="black" />)}

                    <TouchableOpacity

                      style={{alignSelf:'center', justifyContent:'center'}}

                      onPress={()=> {
                        {item.item.key == "0" && navigation.navigate('Projects')}
                        {item.item.key == "1" && navigation.navigate('Bookmarks')}
                        // {item.item.key == "2" && navigation.navigate('Recently Opened')}
                        }}>

                      <Text style={{ textAlign: 'center', fontSize: 24 , color:'black', alignSelf:'center', marginStart:20}}>
                        
                         {item.item.name}
                      </Text>  
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>   
        </View> 


        {/* //////////////////////////////////////////////////////////////////////////////// */}
        {/* <Divider width={5} orientation='vertical' style={{marginTop:5, marginBottom:0}}/> */}
        <View style={{ marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>

          <Text style={{fontSize:18, fontWeight:'500'}}> Recently Viewed: </Text>

        </View>
        <Divider width={5} orientation='vertical' style={{marginTop:5, marginBottom:0}}/>

        <FlatList
          data={projects} 
          keyExtractor={item => item.project_id}
          style={{marginBottom:10, marginHorizontal:-10}}

          renderItem={({item})=>{
            return(
              <View>
                {getProject(item)}
              </View>
            ) 
          }}
        />

          
        

      </SafeAreaView>
    </View>
  )
}

export default ProfilePage

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
  
      image: {
        width: 60,
        height: 60,
        marginRight:5,
        marginLeft:-10
      },

      imageprofile: {
        width: 80,
        height: 80,
        alignSelf:'center',
        resizeMode: 'contain',
        borderRadius:100,
      },

      
      logo:{
        flexDirection: 'row',
        marginBottom:-10,
      },

      
    });
  