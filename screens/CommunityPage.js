import {findNodeHandle, ScrollView, SafeAreaView, View, Text ,TouchableWithoutFeedback, StyleSheet,TouchableOpacity,Image, Dimensions, FlatList, Animated, Alert} from 'react-native';
import React, { createRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import COLORS from '../conts/colors'
import SearchBar from '../components/SearchBar'
import { Feather } from '@expo/vector-icons';
import CommunityHeader from '../components/CommunityHeader';
import {userr, pass, id} from '../user'
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import { Octicons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import AllPostsPage from './AllPostsPage';
import SuggestionPage from './SuggestionPage';
import MyPostsPage from './MyPostsPage';
import SavedPostsPage from './SavedPostsPage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchPage from './SearchPage';

////////////////////////////////////////////////////////////////////////////////////////

const CommunityPage = ({ navigation }) => {

  ////////////////////////////////////////////////////////////
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef()
  const onItemPress = useCallback(itemIndex => {
    ref?.current?.scrollToOffset({ offset: itemIndex * width})})

  const [pages, setPages] = useState([
    {key:"0", name:"Feed", ref: createRef(), color:COLORS.A_white, icon:''},
    {key:"1", name:"My Posts", ref: createRef(), color:COLORS.A_white, icon:''},
    {key:"2", name:"Saved", ref:  createRef(), color:COLORS.A_white, icon:''},
    {key:"3", name:"People", ref:  createRef(), color:COLORS.A_white, icon:''}
  ])

  


  ///////tab///////////////////////////////////////////////////////////////////////
  const Tab = forwardRef(({ item, onItemPress }, ref)=>{
    return(
      <TouchableOpacity onPress={onItemPress} >
        <View ref={ref} >
          
          {item.key == '0' && (<View style={{borderRightColor:'white',borderRightWidth:1, width:100, height:50}}><MaterialCommunityIcons name="home" size={35} color="white" style={{alignSelf:'center', marginTop:6}}/></View>)}
          {item.key == '1' && (<View style={{borderRightColor:'white',borderRightWidth:1, width:100, height:50}}><MaterialCommunityIcons name="account-box-multiple" size={30} color="white" style={{alignSelf:'center', marginTop:10}}/></View>)}
          {item.key == '2' && (<View style={{borderRightColor:'white',borderRightWidth:1, width:100, height:50}}><MaterialCommunityIcons name="book-variant-multiple" size={30} color="white" style={{alignSelf:'center', marginTop:10}}/></View>)}
          {item.key == '3' && (<View style={{ width:100, height:50}}><MaterialCommunityIcons name="account-group" size={35} color="white" style={{alignSelf:'center', marginTop:6}}/></View>)}
        </View>
        
      </TouchableOpacity>
    );
  });
  
  ///indecator//////////////////////////////////////////////////////////////////////
  const Indicator = ({measures, scrollX})=>{
    const inputRange = pages.map((_, i)=> i * width);

    const indicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange : measures.map((measure) => measure.width),
    })

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange : measures.map((measure) => measure.x),
    })

    return(
      <Animated.View 
        style={{
          position:'absolute', 
          height:2, 
          width:indicatorWidth, 
          // left:translateX , 
          backgroundColor:'white', 
          bottom:0,
          transform:[{
            translateX
          }]
        }} 
      />

    )
  }

  //tabs container///////////////////////////////////////////////////////////////////
  const Tabs = ({data, scrollX, onItemPress})=>{
    const containerRef = useRef();
    const [measures, setMeasures] = useState([]);
    const [just, setjust] = useState(false)

    useEffect(()=>{
      const m = []
      data.forEach(item => {
        item.ref.current.measureLayout(
          containerRef.current, 
          (x, y, width, height)=>{
            // console.log("x", x, "y", y, width, height)
            m.push({x, y, width, height})

            if(m.length === data.length){
              setMeasures(m);
              if(just == false) setjust(true)
            }
          }
        )
      });
    },[just])

    return(
      <View style={{position:'absolute', top:62, width:width-5, marginStart:-12, height:50}}>
        <View 
          ref={containerRef} 
          style={{
            justifyContent:'space-evenly', 
            flex:1, flexDirection:'row', 
            backgroundColor:COLORS.A_dark_blue,//COLORS.A_white
            borderRadius:17,
            // borderTopEndRadius:20,
            // borderTopStartRadius:20,
          }}
        >
        {data.map((item, index) => {
          return(
              <Tab key={item.key} item={item} ref={item.ref} onItemPress={()=> onItemPress(index)} />
          )
        })}
        
        </View>
        {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
      </View>
    )
  }
  ///////////////////////////////////////////////////////////////////////////////////

  //page start//////////////////////////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <View>
          <CommunityHeader navigation={navigation}/>
          {/* <SearchPage/> */}
          {/* <SearchBar /> */}
          


          {/* ////page of pages//// */}
          <Animated.FlatList 
              ref= {ref}
              data={pages}
              keyExtractor={(item)=> item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset:{x: scrollX}}}],
                {useNativeDriver:false}
              )}
              style={{width, height, marginStart:-15}}
              bounces={false}
              renderItem={({item})=>{
                return(
                  
                  <View style={{width, height, backgroundColor:item.color}}>
                    <View style={[
                      StyleSheet.absoluteFillObject,
                      {
                        backgroundColor:COLORS.A_white,//'rgba(0,0,0,0)', 
                        top:50
                      },
                    ]}>

                      {item.key == "0" && <AllPostsPage navigation={navigation}/>}
                      {item.key == "1" && <MyPostsPage navigation={navigation}/>}
                      {item.key == "2" && <SavedPostsPage navigation={navigation}/>}
                      {item.key == "3" && <SuggestionPage navigation={navigation}/>}
                      
                      
                    </View>
                  </View>
                )
              }}
          />
          
          <Tabs scrollX={scrollX} data={pages} onItemPress={onItemPress} />
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

      text:{
        justifyContent:'center',
        alignSelf:'center',
        fontWeight:'bold',
        marginBottom:3,
      },

      image: {
        width: 40,
        height: 40,
      },

      pages:{
        padding:8, 
        height:40, 
        width:90, 
        // backgroundColor:COLORS.A_dark_blue, 
        borderRadius:8,
        marginRight:9,
      },

      pagestext:{
        fontSize:14, 
        fontWeight:'700', 
        textAlign:'center',
        color:'white',
      },

      clickes:{
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        marginTop:50,
        marginBottom:10, 
        backgroundColor:COLORS.A_dark_blue, 
        borderRadius:10
      },
    });
  
  
export default CommunityPage