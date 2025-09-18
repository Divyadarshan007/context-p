import { addDoc, collection, deleteDoc, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { LabContext } from "./LabContextProvider";
export const PcContext = createContext();
const PcContextProvider = ({ children }) => {
  const [pcs, setPcs] = useState([]);
  const { fetchData } = useContext(LabContext)

  const addPc = async (pc) => {
    await addDoc(collection(db, "pcs"), {
      createdAt: new Date(),
      ...pc,
    });

    await updateDoc(doc(db, "labs", pc.labId), { assigned: increment(-1) })
    fetchAllPc()
    fetchData()
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
    await updateDoc(doc(db, "labs", updatedVal.labId), { assigned: increment(-1) })
    await updateDoc(doc(db, "pcs", pcId), updatedVal)
    fetchAllPc()
    fetchData()
  }
  const deletePc = async (pcId) => {
    await deleteDoc(doc(db, "pcs", pcId))
    fetchAllPc()
  };

  const showPc = (pcId) => {
    if (pcs.length !== 0) {
      const pcName = pcs.find((pc) => {
        return pc.pcId == pcId;
      });
      return pcName?.name ? pcName?.name : "Assigned"
    } else {
      return "Not Assigned"
    }
  };



  let value = {
    addPc,
    pcs,
    deletePc,
    updatePc,
    showPc
  };
  return <PcContext.Provider value={value}>{children}</PcContext.Provider>;
};

export default PcContextProvider;
