import { useState } from 'react'
import Nav from './components/Nav'
import Trends from './pages/Trends'
import Compare from './pages/Compare'

function App() {
  const [activeTab, setActiveTab] = useState('Trends')

  return (
    <>
      <Nav active={activeTab} onChange={setActiveTab} />
      {activeTab === 'Trends' ? <Trends /> : <Compare />}
    </>
  )
}

export default App
