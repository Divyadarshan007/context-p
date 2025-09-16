import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore"
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
            fetchData()

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
        const qry = query(collection(db, "pcs"), where("labId", "==", labId))
        console.log(qry)
        const toUpdatedPcSnapshot = await getDocs(qry);

        const batch = writeBatch(db);
        toUpdatedPcSnapshot.forEach((pcDoc) => {
            batch.update(pcDoc.ref, { labId: null });
        })

        await batch.commit();
        await deleteDoc(doc(db, "labs", labId))
        fetchData()
    }

    const updateLab = async (labId, updatedVal) => {
        await updateDoc(doc(db, "labs", labId), updatedVal)
        fetchData()
    }

    const value = {
        addLab, labs, deleteLab, updateLab
    }
    return (
        <LabContext.Provider value={value}>
            {children}
        </LabContext.Provider>
    )
}

export default LabContextProvider