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
import ManageStudent from "./pages/students/ManageStudent"
import AllStudents from "./pages/students/AllStudents"



const App = () => {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/labs" element={<ProtectedRoute Component={Lab} />} />
        <Route path="/add-lab" element={<ProtectedRoute Component={AddLab} />} />
        <Route path="/add-pc" element={<ProtectedRoute Component={ManagePc} />} />
        <Route path="/pcs" element={<ProtectedRoute Component={Pcs} />} />
        <Route path="/edit-lab/:labId" element={<ProtectedRoute Component={AddLab} />} />
        <Route path="/edit-pc/:pcId/:labId" element={<ProtectedRoute Component={ManagePc} />} />
        <Route path="/add-student" element={<ProtectedRoute Component={ManageStudent} />} />
        <Route path="/edit-student/:stuId" element={<ProtectedRoute Component={ManageStudent} />} />
        <Route path="/students" element={<ProtectedRoute Component={AllStudents} />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App