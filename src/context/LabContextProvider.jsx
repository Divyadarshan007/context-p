import { addDoc, collection } from "firebase/firestore"
import { createContext } from "react"
import { db } from "../config/firebase"

export const LabContext = createContext()
const LabContextProvider = ({ children }) => {
    const collectionRef = collection(db, "labs")
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
    const value = {
        addLab
    }
    return (
        <LabContext.Provider value={value}>
            {children}
        </LabContext.Provider>
    )
}

export default LabContextProvider