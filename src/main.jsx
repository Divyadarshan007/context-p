import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import LabContextProvider from './context/LabContextProvider.jsx'
import PcContextProvider from './context/PcContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <LabContextProvider>
      <PcContextProvider>
        <App />
      </PcContextProvider>
    </LabContextProvider>
  </AuthContextProvider>

)
