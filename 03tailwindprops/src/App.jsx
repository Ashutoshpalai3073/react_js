import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Card from './components/Card'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 classname= 'text-3xl bg-green-50 p-3'>india is great a place</h1>
    <Card username="ashutosh"/>
    <Card username="india"/>
    <Card/>
    </>
  )
}

export default App
