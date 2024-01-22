import { Modal, Pressable, ScrollView,FlatList, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated, TextInput } from 'react-native';
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
import Input from '../components/Input';
import { Entypo } from '@expo/vector-icons';


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const AllPostsPage = ({navigation}) => {
     
  const [USERS, setUser] = useState([
    {user_id:'1', name:'asma',   photo:'', },
    {user_id:'2', name:'aya',    photo:'', },
    {user_id:'3', name:'tasbeh', photo:'', },
    {user_id:'4', name:'manar',  photo:'', },
    {user_id:'5', name:'tasneem',photo:'', },
    {user_id:'6', name:'fatima', photo:'', },
    {user_id:'7', name:'amal',   photo:'', },
    {user_id:'8', name:'anwar',  photo:'', },
  ]);
  
  const [POSTS, setPosts] = useState([
    {post_id:'1', content:"post 1 00000000000000", user_id:'1', reportCount:'', subject:'Java'},
    {post_id:'2', content:"post 2 helloo anwar",   user_id:'2', reportCount:'', subject:''},
    {post_id:'3', content:"post 3",                user_id:'3', reportCount:'', subject:''},
    {post_id:'4', content:"post 4",                user_id:'4', reportCount:'', subject:''},
    {post_id:'5', content:"post 5",                user_id:'5', reportCount:'', subject:''},
    {post_id:'6', content:"post 6",                user_id:'6', reportCount:'', subject:''},
    {post_id:'7', content:"post 7",                user_id:'7', reportCount:'', subject:''},
    {post_id:'8', content:"post 8 very very long text hushdsnjndevbcd hefdfhneksf jhhhfnkmsd  j jhdfsjk jhduuemf kjfuefid ijdjei ihefj njdsudhfew ehuhsud ushijijijihhuycby yhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh dddddh hhhhhhhhhhuuuuuuuu y0oijijok jhjaskmxknjschbnimkdmm jn hbh kmnh vfhjnhvfjnjg htffvjn j jhhbh bjnj j j nj nhcvgv hs s csd sj s j bdbhdbhsn bsgvxha t6t 6t6t6rdfghuuuuuuu ddddddddddd", user_id:'8', reportCount:'', subject:''},
    {post_id:'9', content:"post 9",                user_id:'5', reportCount:'', subject:''},
  ]);

  const [likes, setLikes] = useState([
    {liked_id:'1', post_id:'1', user_id:'1'},//user who have ~~token
    {liked_id:'2', post_id:'3', user_id:'1'},
    {liked_id:'3', post_id:'5', user_id:'1'},
    {liked_id:'4', post_id:'7', user_id:'1'},
    {liked_id:'5', post_id:'2', user_id:'90'},
  ]);

  const [saved, setSaved] = useState([
    {saved_id:'3', post_id:'1', user_id:'1'},//user who have ~~token
    {saved_id:'5', post_id:'3', user_id:'1'},
    {saved_id:'2', post_id:'5', user_id:'1'},
    {saved_id:'4', post_id:'7', user_id:'09'},
  ]);

  /////////////////////////////////////////////////////////////////////////
  var name 
  
  const[selectedId, setselectedId] = useState("")

  const [showEditDelete, setShowEditDelete] = useState(false)
  const [showReport, setShowReport] = useState(false)

  const [SubjectForNewPost, setSubjectForNewPost] = useState('')
  const [ContentForNewPost, setContentForNewPost] = useState('')

  const [showAddNewPost, setShowAddNewPost] = useState(false)
  // const [modalVisible, setModalVisible] = useState(true);
  // const [noComment, setnoComment] = useState(false);
  // const [select, setselect] = useState("")
  // var commentcount = 0

  ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const LikeButton = ({ callback, data, item }) => {
  const [liked, setLiked] = useState(false);
  
  useEffect(()=>{
    data.map(like => {
      if(like.user_id == id){
        if(like.post_id == item.post_id){
          setLiked(true)
        }
      }
    })//end posts map
  },[])

  return (
    <TouchableOpacity
      style={{ flexDirection:'row', marginRight:5 }}
      onPress={() => {
        setLiked(!liked);
        if (callback) {callback();}
        // {updateLikes(liked, item)}
      }}>

      {liked ? (<AntDesign name="heart" size={25} color="red" />) : (<AntDesign name="hearto" size={25} color="#666" />)}
    </TouchableOpacity>
  );
};
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const updateLikes = (liked, item) =>{

}

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const SaveButton = ({ callback, data, item}) => {
  const [saved, setSaved] = useState(false);

  useEffect(()=>{
    data.map(save => {
      if(save.user_id == id){
        if(save.post_id == item.post_id){
          setSaved(true)
        }
      }
    })//end posts map
  },[])

  return (
    <TouchableOpacity
      style={{ position:'absolute', right:10 }}
      onPress={() => {
        setSaved(!saved);
        if (callback) {callback();}
        // {updateSaves(saved, item)}
      }}>

      {saved ? (<FontAwesome name="bookmark" size={25} color={COLORS.A_dark_blue} />) : (<FontAwesome name="bookmark-o" size={25} color="#666" />)}
    </TouchableOpacity>
  );
};
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const updateSaves = (saved, item) =>{

}

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const getComments = (outitem)=>{
  return(
    <TouchableOpacity onPress={()=>{navigation.navigate('Comment Page', {outitem})}}>
      <MaterialCommunityIcons name="comment" size={25} color="#ccc" style={{marginTop:-1}}/>  
    </TouchableOpacity> 
  )
}
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const cancelAddPost = ()=>{
  setSubjectForNewPost('')
  setContentForNewPost('')
  setShowAddNewPost(false)
}

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  //show user name//////////////////////////////////////////
  const getUserName =(i)=>{
    
      USERS.map(item => {
        if(i.user_id == item.user_id){
          name = item.name
        }
      });//end users map
    
    return (
      <TouchableOpacity 
        style={{
          flexDirection:'row',
          justifyContent:'center',
          alignSelf:'center',
          fontWeight:'bold',
          marginBottom:1.5,
          fontSize:17,
          marginStart:-2
        }}

        onPress={()=> {}}
      >

        <Ionicons name="person-circle-sharp" size={37} color="#666" style={{marginStart:10, marginVertical:5, marginHorizontal:5}}/>
        <Text style={styles.text}>{name}</Text>

      </TouchableOpacity>
    )
  }

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={{width, height:height-255,  backgroundColor:'white'}}>
      {/* post////////////////////////////////////////////////////////////////////////////////// */}
      <View style={{justifyContent:'space-between', flexDirection:'row', marginStart:15, marginTop:10, marginBottom:0}}>

        <View style={{ flexDirection:'row',}}>

          <Text style={{fontSize:18, fontWeight:'600', marginRight:5}}>Posts</Text>

          <TouchableOpacity style={{width:28, backgroundColor:'#dddc', borderRadius:20}}>
            <MaterialIcons name="sort" size={22} color="black" style={{marginTop:3, marginStart:3}}/>
          </TouchableOpacity>

        </View>
            
        <TouchableOpacity style={{right:20}} onPress={()=>{setShowAddNewPost(prevState => !prevState)}}>
          <Octicons name="diff-added" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={{position:'absolute' , right:55}} onPress={()=>navigation.navigate('Search Page')}>
          <Octicons name="search" size={27} color="black" />
        </TouchableOpacity>

      </View>
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////add new post///////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}

      {(showAddNewPost) &&
      <View style={{minHeight:250, marginTop:5,marginBottom:-5,borderBottomColor:'black', borderBottomWidth:0.5, backgroundColor:'#dddc'}}>
        <View style={{flex:1, width:'95%', alignSelf:'center', marginVertical:10, borderRadius:15, backgroundColor:COLORS.A_white}}>

          {/* //subject */}
          <View style={{flexDirection:'row',  width:'95%', alignSelf:'center', marginTop:5}}>
            <Text style={{fontSize:18, marginTop:7, fontWeight:'500', alignSelf:'center', marginStart:5}}>Subject: </Text>
            <TextInput
              style={{
                minHeight:35,
                width:'75%',
                backgroundColor: COLORS.A_white,
                paddingHorizontal: 5,
                fontSize:18, 
                justifyContent:'center',
                textAlignVertical:'bottom',
                borderBottomColor:'black',
                borderBottomWidth:0.5
              }}
              onChangeText={text => setSubjectForNewPost(text)}
              value={SubjectForNewPost}
            />
          </View>
          {/* //////////////////////////////////////// */}

          {/* //new post content */}
          <View style={{  width:'95%', alignSelf:'center', marginTop:15,}}>
            {/* <Text style={{fontSize:18, marginTop:7, fontWeight:'500', alignSelf:'center', marginStart:5}}>Subject: </Text> */}
            <TextInput
              style={{
                minHeight:130,
                width:'95%',
                alignSelf:'center',
                backgroundColor: COLORS.A_white,
                paddingHorizontal: 10,
                fontSize:16, 
                justifyContent:'center',
                textAlignVertical:'top',
                // borderBottomColor:'black',
                // borderBottomWidth:0.5,
                borderColor:'black',
                borderRadius:5,
                borderWidth:0.5,
                padding:5,
              }}
              placeholder='Write your thouts, ideas and question here.'
              multiline={true}
              onChangeText={text => setContentForNewPost(text)}
              value={ContentForNewPost}
            />
          </View>
          {/* //////////////////////////////////////// */}

          <View style={{flexDirection:'row', justifyContent:'flex-end', marginRight:20, marginTop:7}}>
            <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{cancelAddPost()}}>
              <Text style={{color:'#555', marginRight:7, fontSize:15, fontWeight:'500'}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:COLORS.A_dark_blue, borderRadius:20, paddingHorizontal:10}}>
              <Text style={{color:'white', margin:5, fontSize:15, fontWeight:'500'}}>Save</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>}

      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////posts list////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////// */}
      <View style={{flex:1}}>
        <FlatList
        
          extraData={selectedId}
          data={POSTS} 
          keyExtractor={item => item.post_id}
          style={{marginTop:5, backgroundColor:'#eeef', marginHorizontal:5, paddingTop:5}}

          renderItem={({item})=>{

            return(
              <View style= {{marginTop:2}}>
                  
                <TouchableOpacity
                  onPress={()=>{
                    var outitem = item
                    navigation.navigate('Comment Page', {outitem})
                  }}

                  style={{
                    width:'95%', 
                    minHeight:150, 
                    // backgroundColor:'#C9EEFF',
                    backgroundColor:'white', 
                    borderRadius:15, 
                    borderColor:'#72A0C1', 
                    // borderWidth:0.5, 
                    alignSelf:'center', 
                    marginTop:5,
                    marginBottom:5,
                  }}
                > 

                  {/* header //////photo and name////////////////////////////////*/}
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                      {/* <Image 
                        style={styles.story} 
                        source={require('../assets/user_100_gray.png')} 
                      /> */}
                    </TouchableOpacity>
                    {getUserName(item)} 

                    {/* //not my post */}
                    {(item.user_id != id ) && 
                      <View style={{position:'absolute',  right:13, marginTop:5}} onPress={()=>{console.log('report this post', item)}}>
                        {(!showReport || item.post_id!=selectedId)&& <Entypo name="dots-three-horizontal" size={22} color="#555" onPress={()=>{setShowReport(true),setselectedId(item.post_id)}}/>}
                        { (showReport && item.post_id==selectedId)&&
                          <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{}} onPress={()=>{console.log(selectedId)}}>
                              <MaterialIcons name="report" size={24} color="#888" style={{alignSelf:'center'}}/>
                            </TouchableOpacity>
                            <MaterialIcons name="close" size={24} color="#888" style={{alignSelf:'center'}} onPress={()=>{setShowReport(false)}}/>
                          </View>
                        }
                      </View>
                    }

                    {/* //my post */}
                    {(item.user_id == id ) && 
                      <View style={{position:'absolute', flexDirection:'row', right:13, marginTop:5}}>
                        {(!showEditDelete || item.post_id != selectedId) && <Entypo name="dots-three-horizontal" size={22} color="#555" onPress={()=>{setShowEditDelete(true),setselectedId(item.post_id)}}/>}
                        {(showEditDelete && item.post_id == selectedId)&& 
                          <View style={{right:0, flexDirection:'row'}}>
                            <MaterialIcons name="edit" size={24} color="#555"  onPress={()=>{console.log('edit this post', item)}}/>
                            <MaterialIcons name="delete" size={24} color="#555"  onPress={()=>{console.log('delete this post', item)}}/>
                            <MaterialIcons name="close" size={24} color="#555"  onPress={()=>{setShowEditDelete(false)}}/>
                          </View>
                        }
                      </View>
                    }

                  </View>

                  {/* post content////////////////////////////////////////////////////////////////////////// */}
                  
                  

                  <View style={{width:'97%', minHeight:55, marginStart:3}}>
                    <Text style={{flex: 1, flexWrap: 'wrap', paddingHorizontal:10, marginRight:2, fontSize:16}}>
                      {item.content}
                    </Text>
                  </View>

                  {(item.subject !='' && item.subject != null) &&
                    <View style={{marginStart:5}}>
                      <View style={{flexDirection:'row',  paddingBottom:0, marginTop:5}}>

                        <View style={{ marginVertical:0, marginHorizontal:5}}>
                          <Ionicons name="md-book" size={20} color={COLORS.A_dark_blue} />
                        </View>
                        <Text style={{fontSize:15, fontWeight:'500', alignSelf:'center'}}>{item.subject}</Text>
                        
                      </View>
                    </View>
                  }
                  

                  {/* like comment save/////////////////////////////////////////////////////////////////////////////////////// */}
                  <View style={{flexDirection:'row', marginVertical:10, marginStart:10,}}>
                    <LikeButton data={likes} item={item} />
                    
                    {getComments(item)}
                    <SaveButton data={saved} item={item} />   
                  </View>

                </TouchableOpacity> 
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
      width:45,
      height:45,
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


  });

export default AllPostsPage