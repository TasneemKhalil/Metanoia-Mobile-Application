import {ScrollView, SafeAreaView, View,Button, Text , StyleSheet,Image} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../conts/colors'
import { AntDesign } from '@expo/vector-icons';
import { Divider } from '@rneui/base';

const RecentlyViewed = ({navigation}) => {

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>

        <View style={styles.logo}>
          <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}
          />
                
          <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'700', fontSize:22}}>Recently Opened Projects</Text>      
          </View>

          <AntDesign name="menu-fold" size={30} color="#333" style={{position:'absolute' ,marginTop:15, right:-2}} onPress={()=> navigation.openDrawer()}/>
              
        </View>

        <Divider width={5} orientation='vertical' style={{marginTop:5, marginBottom:0}}/>

        <Text>Recent Page</Text>
            
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

    });
export default RecentlyViewed