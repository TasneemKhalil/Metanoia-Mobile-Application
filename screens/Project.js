import {ScrollView, SafeAreaView,TouchableOpacity, Dimensions, View, Button, Text ,StyleSheet, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../conts/colors'
import { Divider } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')
import Percentage from '../components/Percentage';

// import { theProject } from './AllProjects';

const Project = ({navigation, route}) => {
  const {item} = route.params;

  const [showDetails, setShowDetails] = useState(false)
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>

        <View style={styles.logo}>
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}
          />
                
          <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'bold', fontSize:25}}>{item.name}</Text> 
          </View>

          <TouchableOpacity style={{position:'absolute' ,marginTop:15, right:25}}>
            <AntDesign name="save" size={30} color="black"  />
          </TouchableOpacity>

          <AntDesign name="right" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-10}} onPress={()=> navigation.goBack()}/>

        </View>

        <Divider width={5} orientation='vertical' style={{marginTop:0, marginBottom:0}}/>
        {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

         {/* //first top view with all icons and details */}
        <View style={{ width:'105%', height:height-150, alignSelf:'center', }}>
          
          {/* //three dots and hidden details */}
          <View style={{flexDirection:'row',minHeight:40, justifyContent:'flex-end', right:10, marginTop:5, borderBottomWidth:0}}>

            <View style={{position:'absolute', left:20, marginTop:5}}>
              <Text style={{fontSize:17, fontWeight:'500'}}>Project Details:</Text>
            </View>

            {!showDetails && 
              <View>
                <TouchableOpacity style={{marginTop:5}} onPress={()=>{setShowDetails(prevState => !prevState)}}>
                  <Entypo name="dots-three-horizontal" size={25} color="#555"/>
                </TouchableOpacity>
              </View>
            }

            {showDetails &&
              <View style={{flexDirection:'row',  right:0}}>
                <View>
                  <TouchableOpacity style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:5, marginRight:5, marginBottom:5}}>
                    <MaterialIcons name="person-add" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:5, marginRight:5, marginBottom:5}}>
                    <MaterialCommunityIcons name="folder-star" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:5, marginBottom:5}}>
                    <MaterialIcons name="delete" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={()=>{setShowDetails(prevState => !prevState)}} style={{alignSelf:'center', marginLeft:5}}>
                  <MaterialIcons name="close" size={25} color="black" />
                </TouchableOpacity>

              </View>
            }

          </View>
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          {/* //show the view to delete or edit or star or add people////////////////////////////////// */}
          {/* //true if show details and one of them is opened */}
          {(showDetails && true) && 
            <View style={{flex:1, width:'100%', minHeight:100, borderBottomWidth:0.5, alignSelf:'center'}}>

            </View>
          }

          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

          {/* //subject and team members and if more than one team member */}
          <View style={{marginTop:5, flexDirection:'row',  borderBottomWidth:0.5}}>

            <View style={{marginStart:10, marginTop:0}}>

            <View style={{flexDirection:'row'}}>
                <View style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:7, marginBottom:5}}>
                  <Ionicons name="md-book" size={22} color="white" />
                </View>
                
                {/* //FlatList inside scrollview horizantal */}
                <View>
                  <Text></Text>
                </View>
              </View>

              <View style={{flexDirection:'row'}}>
                <View style={{borderRadius:100, backgroundColor:COLORS.A_dark_blue, padding:7, marginBottom:10}}>
                  <Ionicons name="people" size={22} color="white" />
                </View>

                {/* //FlatList inside scrollview horizantal */}
                <View>
                  <Text></Text>
                </View>

              </View>
              
              

            </View>

          </View>

          {/* ///////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////////////// */}

          <View style={{backgroundColor:'#1111', marginTop:5, height:100}}>
            <Text style={{fontSize:17, fontWeight:'500', marginStart:10}}>Goal:</Text>
          </View>

          <View style={{backgroundColor:'#1111', marginTop:5, minHeight:400}}>
            <Text style={{fontSize:17, fontWeight:'500', marginStart:10}}>tasks:</Text>
          </View>
          
        </View>
            
      </View>
    </View>
  )
}
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        width: 60,
        height: 60,
        marginRight:3,
        marginLeft:-10
      },

      logo:{
        flexDirection: 'row',
        // flex:1,
      },

    });
export default Project