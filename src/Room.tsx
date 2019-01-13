import * as React from 'react'
import { useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput
} from 'node-webrender/lib/react'

const Room = ({ room, sendText }) => {
  const [text, setText] = useState('')
  const send = () => {
    sendText(text)
    setText('')
  }

  return (
    <View style={styles.room}>
      <View style={styles.header}>
        <Text style={styles.heading}>{room.name || room.user}</Text>
      </View>

      <ScrollView key={room.id} style={{ flexDirection: 'column-reverse' }}>
        <Foreword name={room.name} />

        {room.messages.map((m, i) => (
          <Message key={i} user={m.user} text={m.text} />
        ))}
      </ScrollView>

      <View style={styles.messageInput}>
        <View style={{ flex: 1, alignContent: 'stretch' }}>
          <TextInput value={text} onChangeText={setText} />
        </View>
        <Button title="Send" onPress={send} />
      </View>
    </View>
  )
}

const Foreword = ({ name }) => (
  <View style={styles.foreword}>
    <Text style={styles.forewordText}>
      This is the very beginning of {name}
    </Text>
  </View>
)

const Message = ({ user, text }) => (
  <View style={styles.message}>
    <View style={styles.image} />

    <View style={styles.messageBody}>
      <Text style={styles.messageSender}>{user}</Text>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  room: {
    flex: 1
  },

  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#dddddd'
  },

  foreword: {
    padding: 20,
    marginBottom: 10
  },

  forewordText: {
    color: '#aaaaaa'
  },

  message: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10
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

export default Room
