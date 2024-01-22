import {ScrollView, SafeAreaView, View, Text , StyleSheet,Image} from 'react-native';
import React from 'react';
// import { StatusBar } from 'expo-status-bar';

//moving from page to page
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInPage from './SignInPage';
import RegisterPage from './RegisterPage';
import SchedulePage from './SchedulePage';
import COLORS from '../conts/colors'
import Button from '../components/Button';
import MainNavigation from '../Navigation/mainNavigation';
import Dragtry from './dragtry';
import SideNavigation from '../Navigation/sideNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfilePage from './ProfilePage';
import Bookmarks from '../screens/Bookmarks';
import AllProjects from '../screens/AllProjects';
import Project from '../screens/Project';
import RecentlyViewed from '../screens/RecentlyViewed';
import SearchPage from '../screens/SearchPage';
import NewProjectPage from './NewProjectPage';
import TaskPage from './TaskPage';
import CommentPage from './CommentPage';
import Chattest from './Chattest';
import AllChatsPage from './AllChatsPage';
import OneChatPage from './OneChatPage';
import SignOutPage from './SignOutPage';
// import OthersProfile from '..screens/OthersProfile';
// import OthersProfile from './OthersProfile';


const Stack = createNativeStackNavigator();

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>

          <Stack.Screen name="StartingPage" component={StartingPage} />
          <Stack.Screen name="Sign In Page" component={SignInPage} />
          <Stack.Screen name="Register Page" component={RegisterPage} />
          
          <Stack.Screen name="Projects" component={AllProjects} />
          <Stack.Screen name="Comment Page" component={CommentPage} />
          
          <Stack.Screen name="the Project" component={Project} />
          <Stack.Screen name="Bookmarks" component={Bookmarks} />
          <Stack.Screen name="taskpage" component={TaskPage} />
          <Stack.Screen name="Recently Opened" component={RecentlyViewed} />

          <Stack.Screen name="Search Page" component={SearchPage} />
          
          <Stack.Screen name="all chats Page" component={AllChatsPage} />
          <Stack.Screen name="one chat Page" component={OneChatPage} />

          <Stack.Screen name="Chat test" component={Chattest} />

          <Stack.Screen name="signOut" component={SignOutPage} />
          <Stack.Screen name="NewProjectPage" component={NewProjectPage} />
          
          
          <Stack.Screen name="side Page" component={SideNavigation} />
          

        </Stack.Navigator>

        

      </NavigationContainer>
    );
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//quick look on how the first page looks
//two buttons sign in and register a photo and a logo
const StartingPage = ({ navigation }) => {
  
    return (
      <ScrollView style={styles.container}>

      <SafeAreaView style={styles.contentContainer}>
      {/* just the status bar */}
        {/* <View style={styles.status}></View> */}
        
        {/* style={{justifyContent: 'center'}} */}
        <View >
          <View style={styles.tryto}>
            <View style={styles.logo}>
              <Image
                source={require('../assets/butterfly_104.png')} 
                style={styles.image}/>
                
              <View style={{alignSelf:'center', marginStart:-5}}>
                <Text style={{fontWeight:'bold', fontSize:40}}>Metanoia</Text> 
                <Text style={{ fontSize:18, marginTop:-10}}>One day at a time </Text> 
              </View>
            </View>

            <View>
              <Button 
                title="Sign in" 
                onPress={()=> navigation.navigate('Sign In Page')}  /> 
            </View>

            <View style={styles.registerButton}>
              <Button 
                title="Register" 
                onPress={()=> navigation.navigate('Register Page')}/>
            </View>

          </View>
        </View>
  
        {/* <StatusBar style="auto" /> */}
      </SafeAreaView>
      </ScrollView>
    )
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
  const styles = StyleSheet.create({
      contentContainer:{
        paddingTop: 25, 
        paddingHorizontal: 20,
      },

      container: {
        height: "100%",
        flex: 1,
        backgroundColor: COLORS.A_white,
      },
  
      registerButton: {
        marginTop:-30,
      },
  
      image: {
        width: 110,
        height: 110,
        marginStart:10,
      },

      logo:{
        flexDirection: 'row',
      },

      tryto:{
        marginTop:"60%"
      },
    });
  
  export default App;