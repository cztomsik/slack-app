import * as React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'node-webrender/lib/react'

const App = () =>
  <View style={styles.ct}>
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Text style={styles.headerText}>node-webrender</Text>
      </View>

      <RoomList />
    </View>

    <Room />
  </View>

const RoomList = () =>
  <View style={styles.roomList}>
    <ListItem text="general" />
    <ListItem text="random" />
  </View>

const ListItem = ({text}) =>
  <View style={styles.listItem}>
    <Text style={styles.listItemText}>{text}</Text>
  </View>

const Room = () =>
  <View style={styles.room}>
    <ScrollView>
      <Messages />
    </ScrollView>

    <MessageInput />
  </View>

const Messages = () =>
  <>
    <Foreword />

    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
  </>

const Foreword = () =>
  <View style={styles.foreword}>
    <Text>This is the very beginning of ...</Text>
  </View>

const Message = () =>
  <View style={styles.message}>
    <View style={styles.image} />

    <View style={styles.messageBody}>
      <Text style={styles.messageSender}>John Doe</Text>
      <Text style={styles.messageText}>Hello world{'\n'}This is a test</Text>    
    </View>
  </View>

const MessageInput = () => {
  const [text, setText] = useState('')

  return (
    <View style={styles.messageInput}>
      <TextInput value={text} onChangeText={setText} />
      <Button title="Send" onPress={() => {}} />
    </View>
  )  
}


const styles = StyleSheet.create({
  ct: {
    flex: 1,
    flexDirection: 'row'
  },

  sidebar: {
    width: 220,
    backgroundColor: '#4d394b'
  },

  header: {
    padding: 20
  },

  headerText: {
    fontSize: 20,
    color: '#ffffff'
  },

  listItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    paddingLeft: 20
  },

  listItemText: {
    color: '#cac4c9',
    lineHeight: 20
  },

  room: {
    flex: 1
  },

  foreword: {
    backgroundColor: '#eeeeee',
    padding: 20,
    marginBottom: 10,
  },

  message: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  messageBody: {
    flex: 1
  },

  messageSender: {
    color: '#aaaaaa',
    fontSize: 14,
    lineHeight: 18
  },
  
  messageText: {
    fontSize: 14,
    lineHeight: 20
  },

  image: {
    width: 36,
    height: 36,
    backgroundColor: '#cccccc',
    borderRadius: 2,
    marginRight: 10
  },

  messageInput: {
    margin: 20,
    marginTop: 0,
    padding: 5,
    flexDirection: 'row',

    borderWidth: 2,
    borderColor: '#717274',
    borderRadius: 4
  }
})

export default App
