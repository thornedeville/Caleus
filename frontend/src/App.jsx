import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Trends from './pages/Trends'
import Compare from './pages/Compare'

function App() {
  const [activeTab, setActiveTab] = useState('Trends')

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar active={activeTab} onChange={setActiveTab} />
      <main style={{ flex: 1 }}>
        {activeTab === 'Trends' ? <Trends /> : <Compare />}
      </main>
    </div>
  )
}

export default App
