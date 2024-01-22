import {Keyboard, View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, FlatList, Image, ScrollView, TouchableOpacity,SafeAreaView, Modal, TextInput, Alert, StyleSheet} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import COLORS from '../conts/colors';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')
import { Divider } from '@rneui/base';
import {userr, pass, id, username} from '../user'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ip } from '../getIP';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default CommentPage = ({navigation, route}) => {

  const {outitem} = route.params;
  // const [comments, setcomments] = useState([])
  const [Comment, setComment] = useState([
    {comment_id:'0', post_id:'9', user_id:'0', content:'fu'},
    {comment_id:'3', post_id:'1', user_id:'0', content:'comment 1'},//user who have ~~token
    {comment_id:'5', post_id:'1', user_id:'3', content:'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'},
    {comment_id:'2', post_id:'5', user_id:'0', content:'fu'},
    {comment_id:'4', post_id:'7', user_id:'09', content:'what?'},
  ])

  const [CommentLikes, setCommentLikes] = useState([
    {Liked_comment_id:'1', comment_id:'3', user_id:'09'},//user who have ~~token
    {Liked_comment_id:'2', comment_id:'3', user_id:'3'},
    {Liked_comment_id:'3', comment_id:'5', user_id:'0'},
    {Liked_comment_id:'4', comment_id:'7', user_id:'09'},
  ])
    
  const [USERS, setUser] = useState([
    {user_id:'0', name:'asma', photo:'', },
    {user_id:'2', name:'aya', photo:'', },
    {user_id:'3', name:'tasbeh', photo:'', },
    {user_id:'4', name:'manar', photo:'', },
    {user_id:'5', name:'tasneem', photo:'', },
    {user_id:'6', name:'fatima', photo:'', },
    {user_id:'7', name:'amal', photo:'', },
    {user_id:'8', name:'anwar', photo:'', },
  ]);

  const [ addComment, setAddComment] = useState('')
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const LikeButton = ({ callback, data, item }) => {
  const [liked, setLiked] = useState(false);
  
  useEffect(()=>{
    data.map(like => {
      if(like.user_id == id){
        if(like.comment_id == item.comment_id){
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

      {liked ? (<AntDesign name="heart" size={24} color="red" />) : (<AntDesign name="hearto" size={24} color="black" />)}
    </TouchableOpacity>
  );
};

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

  const getUserName =(i)=>{
    var name 

    USERS.map(item => {
      if(i.user_id == item.user_id){
        name = item.name
      }
    });//end users map
  
    return (
      <TouchableOpacity style={{justifyContent:'center', alignSelf:'center', fontWeight:'bold', marginBottom:0,}} onPress={()=> {}}>
        <Text style={{justifyContent:'center', alignSelf:'center', fontWeight:'bold', marginBottom:3,}}>{name}</Text>
      </TouchableOpacity>
    )
  }
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

    //get all comment 
    // try{
    //     fetch
    // }catch(error){
    //     console.log(error)
    // }
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

  return (  
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>

        <View style={{alignSelf:'center', marginTop:35, marginBottom:10,  width:'100%', flexDirection:'row'}}>
          <Text style={{color:'white', fontSize:24}}>Comments</Text>
        </View>

        <AntDesign name="right" size={28} color="#fff" style={{position:'absolute' ,marginTop:60, right:20}} onPress={()=> {navigation.goBack()}}/>
         
        <View style={{height:height-240, width:'112%', backgroundColor:'#ddd', alignSelf:'center', borderTopEndRadius:35, borderTopStartRadius:35,}}>
          
          <FlatList
            data={Comment} 
            keyExtractor={item => item.comment_id}
            style={{flex:1, height, marginTop:5, marginHorizontal:10,}}

            renderItem={({item})=>{

              return(
                    
                <View style= {{marginBottom:2, marginTop:0}}>
                   
                  {( outitem.post_id == item.post_id )&& 

                    <View 
                      style = {{width:'97%', 
                        minHeight:100,
                        // height:100, 
                        backgroundColor:COLORS.A_white, 
                        borderRadius:15, 
                        borderColor:'#ccc', 
                        borderWidth:1.5, 
                        alignSelf:'center', 
                        marginTop:5
                      }} 
                    > 
                          
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{console.log('open')}}>
                          <Image 
                            style={{width:30, height:30, margin:5, borderWidth:0.5, borderColor:"gray", borderRadius:35, marginStart:8}} 
                            source={require('../assets/user_100_gray.png')} 
                          />
                        </TouchableOpacity>
    
                        {getUserName(item)} 
                      </View>
    
                      {/* //content on the comment  */}
                      <View style={{width:'97%',minHeight:40, backgroundColor:'#eeec', marginStart:5, top:0}}>
                        <Text style={{flex: 1, flexWrap: 'wrap', padding:5, marginRight:2}}>
                          {item.content}
                        </Text>
                      </View> 
                          
    
                      <View style={{flexDirection:'row', marginBottom:7, marginStart:10,}}>
                        <LikeButton data={CommentLikes} item={item} />
                      </View>

                    </View> 
                  }
        
                </View>
              ) 
            }}      
          />

          
        </View>
        {/* //here att the text input */}
        
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={0} >
          <View style={{ backgroundColor:'#ddd', alignSelf:'center'}}>
            <View style={{flexDirection:'row', backgroundColor:COLORS.A_white, borderColor:COLORS.A_dark_blue, marginBottom:20, marginTop:-10, borderWidth:1, alignSelf:'center', marginHorizontal:30,  borderRadius:20}}>

              <TextInput

                  style={{ 
                    width:width-60,
                    maxHeight: 90, 
                    alignSelf:'center',
                    backgroundColor: COLORS.A_white,
                    paddingHorizontal: 15,
                    
                    fontSize:20,
                    borderRadius: 20,
                    justifyContent:'center',
                    textAlignVertical:'top',
                    marginStart:5,
                  }}

                  // placeholder='___________________________________________________________________________________________________'
                  multiline={true}
                  numberOfLines={20}
                  onChangeText={setAddComment}
                  value={addComment}
                  // <Feather name="send" size={28} color="white"  style={{backgroundColor:COLORS.A_dark_blue, }}/>
          />

          <TouchableOpacity style={{ marginRight:10, marginLeft:-5, height:90, justifyContent:'center'}}>
            <Feather name="send" size={28} color={COLORS.A_dark_blue} />
          </TouchableOpacity>
          </View>

          </View>
        </KeyboardAvoidingView>
        
      </SafeAreaView>
    </View>
  );
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
      backgroundColor: COLORS.A_dark_blue,
    },

    image: {
      width: 90,
      height: 90,
      // padding:10,
      marginTop:5,
      marginLeft:-15
      // marginRight:15,
      // marginLeft:-10
    },

    logo:{
      flexDirection: 'row',
      marginBottom:-10,
    },

  });