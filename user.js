import { View } from "react-native";
// import { useState } from "react";
import { ip } from "./getIP";
import {db,  auth } from './firebase';
var userr = "asma";
var pass// = 123;
var id = 1;
var username //= "asma_jehad.20"

var bio
var user_email =  auth?.currentUser?.email
var user_phone = '0000'
var user_photo

var data2


const userPage = async(email, password) => {
  
  console.log(email.toLowerCase(), password)

      console.log('inside userpage fun')
      

      fetch("http://"+ip+":3000/signin", {
        method: "post", 
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email.toLowerCase(),
          "password": password,
        })
      })
      .then(res=>res)
      
      .then(async data =>{
        console.log(data.status)
        if(data.status == 200){

          await fetch("http://"+ip+":3000/signin/"+email.toLowerCase())
          .then((resp) => resp.json())
          .then((data) => {
            userr = data[0].name,
            pass = data[0].password,
            id = data[0].user_id,
            username = data[0].username,

      bio = data[0].bio,
      user_email =auth?.currentUser?.email,// data[0].email,
      user_phone = data[0].phonenumber,
      user_photo = data[0].photo,
            data2 = data[0]
          })
          .then(() => {
            // console.log(data2);
           });
          // .catch(function(error) {
        // console.log('There has been a problem with your fetch operation: ' );
      // })
        }
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          // throw error;
      });

      // userr = data2.name;
      // pass = data2.password;
      // id = data2.user_id;
      // username = data2.username;

      // bio = data2.bio;
      // user_email = data2.email;
      // user_phone = data2.phonenumber;
      // user_photo = data2.photo;
      

  // userr= "asma";
  // pass= 123;
  // id = 0

  // userr = username;
  // pass = password;

 
 
}

export default userPage
export {userr, pass, id, username, bio, user_email, user_phone, user_photo}