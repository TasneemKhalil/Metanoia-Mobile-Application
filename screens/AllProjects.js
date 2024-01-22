import {ScrollView, Dimensions, SafeAreaView, View, Button, TouchableOpacity, Text, StyleSheet, Image, FlatList, Animated} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../conts/colors';
import {userr, pass, id} from '../user'
import { AntDesign } from '@expo/vector-icons';
import { Divider } from '@rneui/base';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen')
import Percentage from '../components/Percentage';
// export var theProject = null

/////////////////////////////////////////////////////////////
const openProject=(item, navigation)=>{
  // theProject = project
  navigation.navigate('the Project', {item})
}
///////////////////////////////////////////////////////////

const AllProjects = ({navigation}) => {

  const [showAllProjects, setshowAllProjects] = useState(true);
  const [showDoneProjects, setshowDoneProjects] = useState(false);
  
  const [projects, setProjects]= useState([
    {project_id:'0', goal:'finish this semester and disappear', user_id:'1', name:'the finish me1', subject_id:'', percentage:'0', lastOpened:''},
    {project_id:'1', goal:'finish this semester and disappear', user_id:'1', name:'the finish me2', subject_id:'', percentage:'60', lastOpened:''},
    {project_id:'2', goal:'finish this semester and disappear', user_id:'1', name:'the finish me3', subject_id:'', percentage:'100', lastOpened:''},
    {project_id:'3', goal:'finish this semester and disappear', user_id:'1', name:'not me1', subject_id:'', percentage:'0', lastOpened:''},
    {project_id:'4', goal:'finish this semester and disappear', user_id:'1', name:'not me2', subject_id:'', percentage:'0', lastOpened:''},
    {project_id:'5', goal:'finish this semester and disappear', user_id:'5', name:'not me3', subject_id:'', percentage:'0', lastOpened:''},
    {project_id:'6', goal:'finish this semester and disappear', user_id:'9', name:'not me4', subject_id:'', percentage:'0', lastOpened:''},
    {project_id:'7', goal:'', user_id:'5', name:'not me5', subject_id:'', percentage:'90', lastOpened:''},
    {project_id:'8', goal:'', user_id:'9', name:'not me6', subject_id:'', percentage:'40', lastOpened:''},
    {project_id:'9', goal:'', user_id:'5', name:'not me7', subject_id:'', percentage:'40', lastOpened:''},
    {project_id:'10', goal:'', user_id:'1', name:'not me8', subject_id:'', percentage:'100', lastOpened:''},
    {project_id:'11', goal:'', user_id:'1', name:'not me5', subject_id:'', percentage:'90', lastOpened:''},
    {project_id:'12', goal:'', user_id:'1', name:'not me6', subject_id:'', percentage:'40', lastOpened:''},
    {project_id:'13', goal:'', user_id:'1', name:'not me7', subject_id:'', percentage:'90', lastOpened:''},
    {project_id:'14', goal:'', user_id:'1', name:'not me8', subject_id:'', percentage:'100', lastOpened:''},
  ])

  const getProject = (item) =>{
    var myproject = false;

    // projects.map(project => {
      if(item.user_id == id && item.percentage != "100" ){
        myproject = true
      }
    // });//end users map

    return (
      <View>
        {myproject &&(
          <TouchableOpacity onPress={()=>{openProject(item, navigation)}}>
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

  ///////////////////////////////////////////////////////////////////////////////////
  const getDone = (item) =>{
    var myproject = false;

    // projects.map(project => {
      if(item.user_id == id  && item.percentage == "100"){
        myproject = true
      }
    // });//end users map

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
  //////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>

        <View style={styles.logo}>
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}
          />
                
          <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'700', fontSize:22}}>All Projects</Text> 
          </View>

          <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>
        </View>

        <Divider width={5} orientation='vertical' style={{marginTop:0, marginBottom:0}}/>

        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <View style={{ marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>

          <Text style={{fontSize:22, fontWeight:'500'}}> Projects: </Text>

          <TouchableOpacity style={{right:-85}}>
            <Octicons name="search" size={30} color="#222" />
          </TouchableOpacity>

          <TouchableOpacity style={{right:5}} onPress={()=>{navigation.navigate('NewProjectPage')}}>
            <Octicons name="diff-added" size={30} color="#222" />
          </TouchableOpacity>

        </View>
        {/* <Divider width={5} orientation='vertical' style={{marginTop:10, marginBottom:10}}/> */}
        {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
        <TouchableOpacity onPress={()=>{setshowAllProjects(prevState => !prevState), setshowDoneProjects(false)}}>
          <MaterialIcons name="sort" size={22} color="black" style={{marginTop:-25, marginStart:100 ,position:'absolute'}}/>
        </TouchableOpacity>

        {showAllProjects && 
        <View>
          {/* //all projects */}
          <View style={{marginTop:10, height:height-260, width:'100%'}}>
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
          </View>
        </View>
        }

        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <Divider width={5} orientation='vertical' style={{marginTop:10, marginBottom:0}}/>

        <View style={{ marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:22, fontWeight:'500'}}> Done: </Text>
        </View>

        {/* <Divider width={5} orientation='vertical' style={{marginTop:10, marginBottom:0}}/> */}
        {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
        <TouchableOpacity onPress={()=>{setshowDoneProjects(prevState => !prevState), setshowAllProjects(showDoneProjects)}}>
          <MaterialIcons name="sort" size={22} color="black" style={{marginTop:-25, marginStart:70 ,position:'absolute'}}/>
        </TouchableOpacity>

        {showDoneProjects &&
        <View style={{width:'100%', height:height-260}}>
          <FlatList
            data={projects} 
            keyExtractor={item => item.project_id}
            style={{ marginBottom:10, marginHorizontal:-10}}

            renderItem={({item})=>{
              return(
                <View>
                  {getDone(item)}
                </View>
              ) 
            }}
          />
        </View>}

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
  
      image: {
        width: 60,
        height: 60,
        marginRight:3,
        marginLeft:-10
      },

      logo:{
        flexDirection: 'row',
      },

    });
export default AllProjects