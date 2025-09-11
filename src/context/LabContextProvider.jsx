import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase"

export const LabContext = createContext()
const LabContextProvider = ({ children }) => {
    const [labs, setLabs] = useState([])
    const collectionRef = collection(db, "labs")
    useEffect(() => {
        fetchData()
    }, [])
    const addLab = async (lab) => {
        try {
            const res = await addDoc(collectionRef, {
                ...lab,
                createdAt: new Date()
            })
        } catch (err) {
            alert(err)

        }
    }
    
    const fetchData = async () => {
        const { docs } = await getDocs(collectionRef)
        let allLabs = docs.map((lab) => {
            return {
                id: lab.id,
                ...lab.data()
            }
        })
        setLabs(allLabs)
    }
    
    const deleteLab = async (labId) => {
        await deleteDoc(doc(db,"labs", labId)) 
        fetchData()
    }
    
    const value = {
        addLab, labs, deleteLab
    }
    return (
        <LabContext.Provider value={value}>
            {children}
        </LabContext.Provider>
    )
}

export default LabContextProvider