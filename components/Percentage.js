import {ScrollView,Dimensions, SafeAreaView, TextInput, View,Button, Text , StyleSheet,Image, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import COLORS from '../conts/colors'
import { AntDesign } from '@expo/vector-icons';
import { Divider } from '@rneui/base';
const {width, height} = Dimensions.get('screen')
import Svg, { Circle, G } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);


const Percentage = (percentage) => {

    if(percentage.percentage == ''){
        percentage = 0
    }
    // console.log(percentage.percentage)
    // var percentage = percentage;
    const circleRef = useRef();
    const inputRef = useRef();
    const radius = 35;
    const strokeWidth = 10;
    const duration = 500;
    const color = COLORS.A_blue;
    const delay = 0;
    // const textColor 
    const value = '%'+`${percentage.percentage}`
    // console.log(value)

    const halfCircle = radius + strokeWidth;

    const circleCircumference = 2 * Math.PI * radius;

    strokeDashoffset = circleCircumference-(circleCircumference*percentage.percentage)/100;

   
  return (
    <View>
      <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle *2} ${halfCircle * 2 }`}>
        <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx='50%'
            cy='50%'
            stroke={"white"}
            strokeWidth={strokeWidth}
            r={radius}
            // fill="transparent"
            strokeOpacity={0.7}
          />

          <AnimatedCircle
            ref = {circleRef}
            cx='50%'
            cy='50%'
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap='round'
          />
        </G>
      </Svg>

      <TextInput 
        ref={inputRef}
        underlineColorAndroid='transparent'
        editable={false}
        // defaultValue={percentage.percentage}
        value={value}
        style={[
            StyleSheet.absoluteFillObject,
            {fontSize: radius/2, color:'black'},
            {fontWeight:'600', textAlign:'center'}
        ]}
      />
    </View>
  )
}

export default Percentage