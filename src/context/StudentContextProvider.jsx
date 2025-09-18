import { addDoc, collection, getDocs } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
export const StudentContext = createContext()

const StudentContextProvider = ({ children }) => {
    const [students, setStudents] = useState([])
    const addStudent = async (stu) => {
        await addDoc(collection(db, "students"), {
            ...stu,
            createdAt: new Date()
        })
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