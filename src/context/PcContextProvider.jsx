import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
export const PcContext = createContext();
const PcContextProvider = ({ children }) => {
  const [pcs, setPcs] = useState([]);
  const addPc = async (pc) => {
    await addDoc(collection(db, "pcs"), {
      createdAt: new Date(),
      ...pc,
    });
    fetchAllPc()
  };
  useEffect(() => {
    fetchAllPc();
  }, []);

  const fetchAllPc = async () => {
    const { docs } = await getDocs(collection(db, "pcs"));
    const allPcs = docs.map((pc) => {
      return {
        pcId: pc.id,
        ...pc.data(),
      };
    });
    setPcs(allPcs);
  };
  const updatePc = async (pcId, updatedVal) => {
    await updateDoc(doc(db, "pcs", pcId), updatedVal)
    fetchAllPc()
  }
  const deletePc = async (pcId) => {
    await deleteDoc(doc(db, "pcs", pcId))
    fetchAllPc()
  };
  let value = {
    addPc,
    pcs,
    deletePc,
    updatePc
  };
  return <PcContext.Provider value={value}>{children}</PcContext.Provider>;
};

export default PcContextProvider;
