import * as React from 'react'
import { useState, useRef, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  TouchableWithoutFeedback
} from 'node-webrender/lib/react'
import Room from './Room'
import { WebClient, RTMClient } from '@slack/client'

// TODO: room -> conversation
const Workspace = ({ token, logout }) => {
  const { name, rooms, selectedRoom, selectRoom, sendText } = useWorkspace(
    token
  )

  return (
    <View style={styles.ct}>
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{name}</Text>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <RoomList {...{ rooms, selectedRoom, selectRoom }} />
        </ScrollView>

        <View style={styles.footer}>
          <Button title="Logout" onPress={logout} />
        </View>
      </View>

      {selectedRoom && (
        <Room
          room={selectedRoom}
          sendText={text => sendText(selectedRoom, text)}
        />
      )}
    </View>
  )
}

const RoomList = ({ rooms, selectedRoom, selectRoom }) => (
  <View style={styles.roomList}>
    {rooms.map(r => (
      <TouchableWithoutFeedback key={r.id} onPress={() => selectRoom(r)}>
        <ListItem text={r.name} active={r === selectedRoom} />
      </TouchableWithoutFeedback>
    ))}
  </View>
)

const ListItem = ({ text, active }) => (
  <View style={[styles.listItem, active && styles.listItemActive]}>
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

  listItemActive: {
    backgroundColor: '#000000'
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

const useWorkspace = token => {
  const [workspace, setWorkspace] = useState({
    name: 'loading...',
    rooms: [],
    selectedRoom: undefined,
    selectRoom: undefined,
    sendText: undefined
  })

  useLayoutEffect(
    () => {
      const webClient: any = new WebClient(token)
      const rtmClient: any = new RTMClient(token)

      Promise.resolve().then(async () => {
        const { team } = await webClient.team.info()
        const { channels } = await webClient.channels.list()

        workspace.name = team.name
        workspace.rooms = channels

        workspace.sendText = (room, text) =>
          webClient.chat.postMessage({
            channel: room.id,
            text
          })

        workspace.selectRoom = async room => {
          if (!room.messages) {
            const { messages } = await webClient.conversations.history({
              channel: room.id
            })
            room.messages = messages.reverse()
          }

          workspace.selectedRoom = room
          setWorkspace(workspace)
        }

        rtmClient.on('message', e => {
          console.log(e)

          if (e.channel) {
            const ch = workspace.rooms.find(ch => ch.id === e.channel)

            if (ch) {
              ch.messages.push(e)
              setWorkspace(workspace)
            }
          }
        })

        await workspace.selectRoom(channels[0])
        await rtmClient.start()
        setWorkspace(workspace)
      })

      return () => rtmClient.disconnect()
    },
    [token]
  )

  return workspace
}

export default Workspace
