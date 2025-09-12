import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Header from "./components/Header"
import ErrorPage from "./pages/ErrorPage"
import Lab from "./pages/Lab"
import AddLab from "./pages/AddLab"
import ManagePc from "./pages/psc/ManagePc"
import Pcs from "./pages/psc/Pcs"


const App = () => {
  return (

    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/labs" element={<Lab />} />
        <Route path="/add-lab" element={<AddLab />} />
        <Route path="/add-pc" element={<ManagePc />} />
        <Route path="/pcs" element={<Pcs />} />
        <Route path="/edit-lab/:labId" element={<AddLab />} />
        <Route path="*" element={<ErrorPage/>} />
       
      </Routes>
    </BrowserRouter>

  )
}

export default App