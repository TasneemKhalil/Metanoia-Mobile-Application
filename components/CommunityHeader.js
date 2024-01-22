import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../conts/colors';
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')

const CommunityHeader = ({navigation}) => {
  return (
    <View>
    <View style={styles.logo}>
        <Image
            source={require('../assets/butterfly_104.png')} 
            style={styles.image}/>
                
        <View style={{alignSelf:'center', marginStart:-5}}>
            <Text style={{fontWeight:'700', fontSize:28}}>Community</Text> 
        </View>

        
        <TouchableOpacity 
          onPress={()=>{navigation.navigate('all chats Page')}} 
          // onPress={()=>{navigation.navigate('all chats Page')}} 
          style={{ marginTop:15, position:'absolute', right:0}}
        >
          <Ionicons name="chatbubbles-outline" size={35} color={COLORS.A_dark_blue} />
        </TouchableOpacity>

        
        
    </View>
    <Divider width={1} orientation='vertical' style={{marginTop:-5, marginBottom:5}}/>
    </View>
  )
}

 //styleing 
 const styles = StyleSheet.create({
    
    image: {
      width: 60,
      height: 60,
      marginRight:5,
      marginLeft:-5
    },

    logo:{
      flexDirection: 'row',
    //   flex:1,
    },

  });

export default CommunityHeader