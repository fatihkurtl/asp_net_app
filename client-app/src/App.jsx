import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5084/api/Places', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVzZXJuYW1lIiwibmJmIjoxNzIzODUwNDYxLCJleHAiOjE3MjM4NTQwNjEsImlhdCI6MTcyMzg1MDQ2MSwiaXNzIjoiaHR0cHM6Ly9mYXRpaGt1cnQuY29tIiwiYXVkIjoiaHR0cHM6Ly9mYXRpaGt1cnQuY29tIn0.PrIH4IN978x72rzh3Jme2PZA5jsxE4PCzdaXl8SDPpk',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
