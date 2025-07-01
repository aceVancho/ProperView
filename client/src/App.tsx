import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

    return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600">
        Tailwind is working!
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        If you see this styled correctly, Tailwind is good to go.
      </p>
      <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
        Hover Me
      </button>
    </div>
  );
}

export default App
