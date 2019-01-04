import * as React from 'react'
import * as keytar from 'keytar'
import { View, Text, Button, StyleSheet } from 'node-webrender/lib/react'

const Login = ({ onToken }) =>
  <View style={styles.login}>
    <Text style={styles.heading}>Login</Text>

    <Text style={styles.text}>
      Login is not implemented yet so what we do is that we access native keystore and ask it for the Slack tokens and use a first one of those.
      {'\n\n'}
      This also means you might be asked for a system password.
    </Text>

    <Button title="Use keystore" onPress={() => getToken().then(onToken)} />
  </View>

const getToken = async () => {
  const password = await keytar.findPassword('Slack')
  const tokenMap = JSON.parse(password)

  return tokenMap[Object.keys(tokenMap)[0]].token
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    padding: 100,
    justifyContent: 'space-around',
    backgroundColor: '#4d394b',
    alignItems: 'flex-start'
  },

  text: {
    color: '#eeeeee'
  },

  heading: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 40
  }
})

export default Login
