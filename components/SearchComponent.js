import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import COLORS from "../conts/colors";

var keyword ='';

const SearchComponent = ({ onSearchEnter }) => {

const navigation = useNavigation();
  const [term, setTerm] = useState("");
  
  // useEffect(()=>{
    keyword = term;
    
    
  // },[term])

  return (
    <View style={styles.searchWrapperStyle}>
      
      <Icon size={18} name="search" color="black" style={styles.iconStyle} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="black"
        style={styles.searchInputStyle}
        value={term}
        onChangeText={(newText) => {
          keyword=term
          setTerm(newText);
          onSearchEnter(term);
          
        }}
        onEndEditing={() => {
          keyword=term
          onSearchEnter(term);
          
        }}
        selectionColor="black" // this for the curser(virtical line) that flashes 
      />
      <Icon
        size={18}
        name="close"
        color="black"
        style={styles.iconStyle}
        onPress={() => {
          setTerm("");
          onSearchEnter("");
          keyword=""
           // The onSearchEnter function updates the state of term with the entered search term and also sets the error message to an empty string. The onSearchEnter function does not have any color associated with it.
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    backgroundColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius:30,
  },
  iconStyle: {
    marginTop: 12,
    marginHorizontal: 8,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    margin: 0,
    color: "black",
    backgroundColor:"#ddd"
  },
});

export default SearchComponent;
export {keyword}