import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App