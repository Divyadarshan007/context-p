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
      status: "Available"
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
  const updatePc = async (pcId, updatedVal, labId) => {
    await updateDoc(doc(db, "labs", updatedVal.labId), { assigned: increment(-1) })
    await updateDoc(doc(db, "pcs", pcId), updatedVal)
    await updateDoc(doc(db, "labs", labId), { assigned: increment(1) })
    fetchAllPc()
    fetchData()
  }
  const deletePc = async (pcId, labId) => {
    await deleteDoc(doc(db, "pcs", pcId))
    await updateDoc(doc(db, "labs", labId), { assigned: increment(1) })
    fetchAllPc()
    fetchData()
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

  const handleRepair = async (pcId, value) => {
    if (value == "Available" || value == "Occupied") {
      await updateDoc(doc(db, "pcs", pcId), {
        status: "in-Repair"
      })
    } else if (value == "in-Repair") {
      await updateDoc(doc(db, "pcs", pcId), {
        status: "Available"
      })
    }


    fetchAllPc()
  }


  let value = {
    addPc,
    pcs,
    deletePc,
    updatePc,
    showPc,
    handleRepair,
    fetchAllPc
  };
  return <PcContext.Provider value={value}>{children}</PcContext.Provider>;
};

export default PcContextProvider;
