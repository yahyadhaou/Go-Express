import React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FlatList,Text } from "react-native";
function ChatScreen (){
    const [messages, setMessages] = useState([
        {
          _id: 1,
          text: 'Hello, how can I help you today?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chatbot',
            text:"mima"
          },
          
        },
      ]);
    
      const onSend = (newMessage = []) => {
        setMessages(GiftedChat.append(messages, newMessage));
      };
    
      return (
        <View style={styles.container}>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
              _id: 1,
              
            }}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    });
export default ChatScreen