import {ScrollView, Alert, View, Text, SafeAreaView , StyleSheet, TextInput} from 'react-native';
import React, { useEffect } from 'react';

import COLORS from '../conts/colors'
import Button from '../components/Button';
import Input from '../components/Input';
import userPage from '../user';
import { ip } from '../getIP';
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";

import { auth } from '../firebase';
import mainNavigation from '../Navigation/mainNavigation';

const SignInPage = ({navigation}) => {
    const [email, setUserName] = React.useState('');
    const [password, setUaerPass] = React.useState('');

    
    const SignIn = () =>{
      // navigation.replace('side Page')
      
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        userPage (email,password)
        // <userPage email={email} password={password} />
        const user = userCredential.user;
        // console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage)
      });
      
      

    }


    useEffect(() =>{

        // const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth,(user) => {
          if (user) {
            // const uid = user.uid;
            userPage (email,password)
            // <userPage email={email} password={password} />
            navigation.replace('side Page')
            
          } else {}
        });
  
        return unsubscribe
     
      },[])
    ///////////////////////////////////////////////////////////////////////////
    const [errors, setErrors] = React.useState({});


    const handleError = (error, input) => {
      setErrors(prevState => ({...prevState, [input]: error}));
    };
    /////////////////////////////////////////////////////////////////////////////////////

    const userLogin = () =>{
      console.log('inside user login function')

      fetch("http://"+ip+":3000/signin", {
        method: "post", 
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email.toLowerCase(),
          "password": password
        })
      })
      .then(res=>res)
      
      .then(data =>{
        console.log(data.status)
        if(data.status === 200) 
           canAccess();
      } )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          // throw error;
      });
    }

    const canAccess = () => {
      
      navigation.navigate('side Page')
      
      // navigation.navigate('Schedule Page')
    }

   
    return (
      <ScrollView  style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>
          
          <View style={{marginLeft: 10, marginTop: 8}}>
            <Text style= {styles.textBody}>Sign in</Text> 
            <Text style={{color: COLORS.A_gray, fontSize: 16, marginBottom: 7}}>Welcom Back ^-^</Text>
          </View>

          <View style={{marginVertical: 15, marginTop:60}}>
            <Input
              onChangeText={(text) => setUserName(text)}
              onFocus={() => handleError(null, 'username')}
              iconName="account-outline"
              label="Username"
              placeholder="Enter your username"
              error={errors.username}
            />

            <Input
              onChangeText={(text) => setUaerPass(text)}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              password
            />

            <View style={{marginTop:-8}}>
              {/* <Button title="Sign in" onPress={()=>userLogin()} /> */}
              {/* userLogin */}
              <Button title="Sign in"
                onPress={()=> {SignIn()}} 
                // onPress={()=> navigation.navigate('side Page')}
              />
            </View>

            <View style={{ 
              marginTop:-10,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
          <Text
            style={{ 
              color: COLORS.black, 
              fontWeight: 'bold', 
              // textAlign: 'center', 
              fontSize: 16,
            }}>Don't have account?  
            </Text>

            <Text
            onPress={() => navigation.navigate('Register Page')}
            style={{ 
              color: COLORS.A_blue, 
              fontWeight: 'bold', 
              // textAlign: 'center', 
              fontSize: 16,
            }}> Create one 
            </Text>
          </View>


          </View>

        </SafeAreaView>
      </ScrollView>

    )
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //styleing 
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      flex: 1,
      backgroundColor: COLORS.A_white
    },
    contentContainer:{
        paddingTop: 25, 
        paddingHorizontal: 20,
        // justifyContent:'center'
        
    },
    textBody:{
        color: COLORS.black, 
        fontSize: 40, 
        fontWeight: 'bold'
    },
  
  });
  export default SignInPage;