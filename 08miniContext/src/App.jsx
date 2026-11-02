
import './App.css'
import Login from './Components/Login'
import Profile from './Components/Profile'
import UserContextProvider from './Context/UserContextProvider'

function App() {
  

  return (
    <UserContextProvider>
      <main className="context-app">
        <h1 className="context-app__title">React video for context API</h1>
        <Login />
        <Profile /> 
      </main>
    </UserContextProvider>
  )
}

export default App
