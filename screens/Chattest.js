import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions,  KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useLayoutEffect,useCallback, useState } from 'react';

const {width, height} = Dimensions.get('screen')
import {db,  auth } from '../firebase';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import { collectionGroup,orderBy,onSnapshot, query, where, getFirestore,limit, collection, addDoc,getDocs,getDoc, setDoc, doc ,docRef} from "firebase/firestore";

const Chattest = ({navigatin}) => {
  const [messages, setMessages] = useState([]);

  useLayoutEffect (()=>{
   
    const q = query(collection(db, 'chats'), where("user._id", "in", [auth?.currentUser?.email , "asmajehad919@gmail.com"] ), where("to", "in",[auth?.currentUser?.email , "asmajehad919@gmail.com"]));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      

      setMessages(
        snapshot.docs.map((doc) => (
          {
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
            // image: doc.data().image
          }
        ))
      )//end set messages
    });

    return () => {
      unsubscribe();
    };
  },[])

  const onSend = useCallback(async(messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    const {_id, createdAt,text,user} = messages[0]
    
    const chatRef = doc(collection(db, "chats"));
    await setDoc(chatRef, { _id, createdAt,  text, user ,to:'asmajehad919@gmail.com'});
    // addDoc(collection(db, 'chats'), { _id, createdAt,  text, user }); 
  },[])
  
  return (
    
    <GiftedChat
    
      messages={messages.sort((p1, p2)=>(p1.createdAt < p2.createdAt)? 1:(p1.createdAt > p2.createdAt)? -1:0)}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: 'https://placeimg.com/140/140/any'
      }}
      
      // renderInputToolbar={props => customtInputToolbar(props)}
    />
  )
}

export default Chattest