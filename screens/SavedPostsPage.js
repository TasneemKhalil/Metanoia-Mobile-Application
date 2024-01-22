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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const SavedPostsPage = ({navigation}) => {

  const [USERS, setUser] = useState([
    {user_id:'1', name:'asma', photo:'', },
    {user_id:'2', name:'aya', photo:'', },
    {user_id:'3', name:'tasbeh', photo:'', },
    {user_id:'4', name:'manar', photo:'', },
    {user_id:'5', name:'tasneem', photo:'', },
    {user_id:'6', name:'fatima', photo:'', },
    {user_id:'7', name:'amal', photo:'', },
    {user_id:'8', name:'anwar', photo:'', },

  ]);
  
  const [POSTS, setPosts] = useState([
    {post_id:'1', content:"post 1 00000000000000", user_id:'0', reportCount:'', subject:'Java'},
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
    {liked_id:'1', post_id:'1', user_id:'0'},//user who have ~~token
    {liked_id:'2', post_id:'3', user_id:'0'},
    {liked_id:'3', post_id:'5', user_id:'0'},
    {liked_id:'4', post_id:'7', user_id:'0'},
    {liked_id:'5', post_id:'2', user_id:'90'},
  ]);

  const [saved, setSaved] = useState([
    {saved_id:'3', post_id:'1', user_id:'0'},//user who have ~~token
    {saved_id:'5', post_id:'3', user_id:'0'},
    {saved_id:'2', post_id:'5', user_id:'0'},
    {saved_id:'4', post_id:'7', user_id:'09'},
  ]);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
var name 
const[selectedId, setselectedId] = useState("")

const [showEditDelete, setShowEditDelete] = useState(false)
const [showReport, setShowReport] = useState(false)


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const LikeButton = ({ callback, data, item }) => {
  const [liked, setLiked] = React.useState(false);
  
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
        // console.log(liked, item.post_id)
        //here i write the code that modify the database
        if (callback) {callback();}
      }}>
      {liked ? (<AntDesign name="heart" size={24} color="red" />) : (<AntDesign name="hearto" size={24} color="black" />)}
    </TouchableOpacity>
  );
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

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
      }}>
      {saved ? (<FontAwesome name="bookmark" size={24} color="black" />) : (<FontAwesome name="bookmark-o" size={24} color="black" />)}
    </TouchableOpacity>
  );
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
const getComments = (outitem)=>{
  return(
    <TouchableOpacity onPress={()=>{navigation.navigate('Comment Page', {outitem})}}>
      <MaterialCommunityIcons name="comment-outline" size={25} color="black" style={{marginTop:-1}}/>  
    </TouchableOpacity> 
  )
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////// 

  const getUserName =(i)=>{
    
    USERS.map(item => {
      if(i.user_id == item.user_id){
        name = item.name
      }
    });//end users map
    
    return (
      <TouchableOpacity style={styles.text}>
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    )
  }


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  const getSavedPosts =(item)=>{
    var save = false;
    
    saved.map(i => {
      if(i.user_id ==id && item.post_id == i.post_id){
        save = true
      }
    });//end users map

    
    return (
      <View>
        {(save) &&
          <View 
            style={{
              width:'95%', 
              minHeight:150, 
              backgroundColor:COLORS.A_white, 
              borderRadius:15, 
              borderColor:'#ccc', 
              borderWidth:1.5, 
              alignSelf:'center', 
              marginTop:5
            }}
          > 

            {/* header //////photo and name////////////////////////////////*/}
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity>
                <Image 
                  style={styles.story} 
                  source={require('../assets/user_100_gray.png')} 
                />
              </TouchableOpacity>

              {getUserName(item)} 

              {/* //not my post */}
              {(item.user_id != id ) && 
                <View style={{position:'absolute', alignSelf:'center', right:13}} onPress={()=>{console.log('report this post', item)}}>
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
                <View style={{position:'absolute', flexDirection:'row', right:13, alignSelf:'center',}}>
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

            <Divider width={1} orientation='vertical' style={{width:width-20, marginTop:-2, marginBottom:2}}/>

            {/* post content////////////////////////////////////////////////////////////////////////// */}   
            {(item.subject !='' && item.subject != null) &&
              <View>
                <View style={{flexDirection:'row', backgroundColor:'#dddc', paddingBottom:5, marginTop:-1}}>
                  <Text style={{marginStart:8, fontSize:17,}}>Related Subject: </Text>
                  <Text style={{fontSize:17, fontWeight:'500'}}>{item.subject}</Text>
                </View>
                <Divider width={1} orientation='vertical' style={{marginTop:0, marginBottom:5}}/>
              </View>
            }

            <View style={{width:'97%', minHeight:90, backgroundColor:COLORS.A_white, marginStart:5}}>
              <Text style={{flex: 1, flexWrap: 'wrap', padding:5, marginRight:2, fontSize:16}}>
                {item.content}
              </Text>
            </View>
                  
            {/* /////////////////////////////////////////////////////////////////////////////////////// */}
            <Divider width={1} orientation='vertical' style={{marginTop:0, marginBottom:0}}/>

            {/* like comment save/////////////////////////////////////////////////////////////////////////////////////// */}
            <View style={{flexDirection:'row', marginTop:6, marginBottom:6, marginStart:10,}}>
              <LikeButton data={likes} item={item} /> 
              {getComments(item)}
              <SaveButton data={saved} item={item} />   
            </View>

          </View> 
        }
      </View>
    )
  }

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
///main/////////////////////////////////////////////////////////////////////////////////////////
return (
  <View style={{width, height:height-255, backgroundColor:COLORS.A_white}}>
    {/* post////////////////////////////////////////////////////////////////////////////////// */}
    <View style={{justifyContent:'space-between', flexDirection:'row', marginStart:15, marginTop:10, marginBottom:0}}>

      <View style={{ flexDirection:'row'}}>

        <Text style={{fontSize:18, fontWeight:'600', marginRight:5}}>Saved:</Text>

      </View>
            

      {/* <TouchableOpacity style={{position:'absolute' , right:55}} onPress={()=>navigation.navigate('Search Page')}>
        <Octicons name="search" size={27} color="black" />
      </TouchableOpacity> */}

    </View>

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
        style={{marginTop:5, backgroundColor:'#dddc', marginHorizontal:-2}}

        renderItem={({item})=>{

          return(
            <View style= {{marginTop:2}}>
              {getSavedPosts(item)}   
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
    paddingTop: 50, 
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
    width:40,
    height:40,
    margin:5,
    borderWidth:0.5,
    borderColor:"gray",
    borderRadius:35,
  },

  text:{
    justifyContent:'center',
    alignSelf:'center',
    fontWeight:'bold',
    marginBottom:3,
  },

});

export default SavedPostsPage