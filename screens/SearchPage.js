import React, { useEffect, useState } from "react";
import { View, Text,Dimensions, StatusBar, FlatList, StyleSheet ,TouchableOpacity} from "react-native";

// import axios from "axios"; //npm install axios
const {width, height} = Dimensions.get('screen')
import SearchComponent,{keyword} from "../components/SearchComponent";

const SearchPage = ({navigation}) => {
    var i =0

  // const [err, setErr] = useState(""); //error state if we search for something dosn't exist 
  const [term, setTerm] = useState(""); // state for the input we enter 
  console.log(term)

  const [USERS, setUser] = useState([
    {user_id:'1', name:'asma', photo:''},
    {user_id:'2', name:'aya', photo:''},
    {user_id:'3', name:'tasbeh', photo:''},
    {user_id:'4', name:'manar', photo:''},
    {user_id:'5', name:'tasneem', photo:''},
    {user_id:'6', name:'fatima', photo:''},
    {user_id:'7', name:'amal', photo:''},
    {user_id:'8', name:'anwar', photo:''},
  ])

  useEffect(()=>{
    setTerm(keyword)
  },[term])

  const getResult = ( item ) => {
    var t = false

    console.log(item.name.toLowerCase().includes(term));
    if(item.name.toLowerCase().includes(term.toLowerCase()) && term!=''){
      var name= item.name
      var id=item.user_id
      t= true
    }
    return (
      <View>
        {t &&
        <TouchableOpacity style={styles.itemWrapperStyle}>
          <Text style={styles.itemTitleStyle}>{id}</Text>
          <Text style={styles.itemBodyStyle}>{name}</Text>
        </TouchableOpacity>}
      </View>
    );
  };

  // useEffect(()=>{

  //   // return()
  // },[term])

  return (
    <View style={{marginTop: 90, height:height-140}}>
      
        <View style={{marginTop:-50 , paddingHorizontal:15}}>
          <SearchComponent onSearchEnter={(newTerm) => {
            setTerm(newTerm);
            // setErr("");
            }} 
          />
        </View>

        <View style={{paddingHorizontal:10}}>
        {/* {err ?
          <Text style={styles.errStyle}>{err}</Text>
          : */}
          <FlatList
            data={USERS}
            keyExtractor={ (user) => user.user_id}
            renderItem={({item})=>{

              return(
                <View style= {{}}>
                  {getResult(item)} 
                </View>
              ) 
            }}
          />
        {/* } */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderColor: "#ccc",
    paddingHorizontal: 16,
  },
  itemTitleStyle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  itemBodyStyle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  errStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "red",
  },
});
export default SearchPage ;