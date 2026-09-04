import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    fetch('http://localhost:8000/api/hello')
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(() => setStatus('Could not reach the server'))
  }, [])

  return (
    <main>
      <h1>Caleus</h1>
      <p>{status}</p>
    </main>
  )
}

export default App
