import * as React from 'react'
import { useState, useCallback } from 'react'
import { View } from 'node-webrender/lib/react'
import Login from './Login'
import Workspace from './Workspace'

const App = () => {
  const [token, setToken] = useState(process.env.SLACK_TOKEN || '')
  const logout = useCallback(() => setToken(''), [])

  return (
    <View style={{ flex: 1 }}>
      {token ? <Workspace token={token} logout={logout} /> : <Login onToken={setToken} />}
    </View>
  )
}

export default App
