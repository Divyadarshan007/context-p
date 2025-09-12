import { addDoc, collection, getDoc, getDocs } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
export const PcContext = createContext()
const PcContextProvider = ({ children }) => {
    const [pcs, setPcs] = useState([])
    const addPc = async (pc) => {
        await addDoc(collection(db, "pcs"), {
            createdAt: new Date(),
            ...pc
        })
    }
    useEffect(()=>{
        fetchAllPc()
    },[])

    const fetchAllPc = async () => {
        const { docs } = await getDocs(collection(db, "pcs"))
        const allPcs = docs.map((pc) => {
            return {
                pcId: pc.id,
                ...pc.data()
            }
        })
        setPcs(allPcs)
    }
    let value = {
        addPc, pcs
    }
    return (
        <PcContext.Provider value={value}>
            {children}
        </PcContext.Provider>
    )
}

export default PcContextProvider