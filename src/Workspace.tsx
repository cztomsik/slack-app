import * as React from 'react'
import { useState, useRef, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput
} from 'node-webrender/lib/react'
import Room from './Room'
import { WebClient, RTMClient } from '@slack/client'

const Workspace = ({ token, logout }) => {
  const [name, setName] = useState('loading...')
  const [channels, setChannels] = useState([])
  const [room, setRoom] = useState(undefined)
  const clientsRef = useRef(undefined)

  useLayoutEffect(
    () => {
      const webClient: any = new WebClient(token)
      const rtmClient = new RTMClient(token)

      clientsRef.current = { webClient, rtmClient }

      Promise.resolve().then(async () => {
        const { team } = await webClient.team.info()
        const { channels } = await webClient.channels.list()

        setName(team.name)
        setChannels(channels)

        rtmClient.on('message', e => {
          console.log(e)

          if (e.channel) {
            const ch = channels.find(ch => ch.id === e.channel)

            if (ch) {
              ch.messages.push(e)
              setChannels(channels)
            }
          }
        })

        await selectRoom(channels[0])
        await rtmClient.start()
      })

      return () => clientsRef.current.rtmClient.disconnect()
    },
    [token]
  )

  const selectRoom = async room => {
    const {
      current: { webClient }
    } = clientsRef

    if (!room.messages) {
      const { messages } = await webClient.conversations.history({
        channel: room.id
      })
      room.messages = messages.reverse()
    }

    setRoom(room)
  }

  const sendText = text => {
    clientsRef.current.webClient.chat.postMessage({ channel: room.id, text })
  }

  return (
    <View style={styles.ct}>
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{name}</Text>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <RoomList channels={channels} />
        </ScrollView>

        <View style={styles.footer}>
          <Button title="Logout" onPress={logout} />
        </View>
      </View>

      {room && <Room room={room} sendText={sendText} />}
    </View>
  )
}

const RoomList = ({ channels }) => (
  <View style={styles.roomList}>
    {channels.map(ch => (
      <ListItem key={ch.id} text={ch.name} />
    ))}
  </View>
)

const ListItem = ({ text }) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemText}>{text}</Text>
  </View>
)

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

  footer: {
    padding: 20,
    alignItems: 'flex-start'
  }
})

export default Workspace
