import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
import { PcContext } from "./PcContextProvider"
export const StudentContext = createContext()

const StudentContextProvider = ({ children }) => {
    const [students, setStudents] = useState([])
    const {fetchAllPc} = useContext(PcContext)
    const addStudent = async (stu) => {
        await addDoc(collection(db, "students"), {
            ...stu,
            createdAt: new Date()
        })
        await updateDoc(doc(db, "pcs", stu.pcId),{
            status:"Occupied"
        })
        fetchAllStudent()
        fetchAllPc()
    }
    useEffect(() => {
        fetchAllStudent()
    }, [])
    const fetchAllStudent = async () => {
        const { docs } = await getDocs(collection(db, "students"))
       const allStudent = docs.map((doc) => {
            return {
                studentId: doc.id,
                ...doc.data()
            }
        })
        setStudents(allStudent)
    }
    const value = { addStudent, students }
    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    )
}

export default StudentContextProvider