import { useContext, useEffect, useState } from "react";
import { LabContext } from "../../context/LabContextProvider";
import { PcContext } from "../../context/PcContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Schema } from "rsuite";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("PC Name is required"),
  labId: StringType().isRequired("Please select a Lab"),
});

const ManagePc = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState({
    name: "",
    labId: "",
  });
  const [errors, setErrors] = useState({});
  const { pcId, labId } = useParams();
  const navigate = useNavigate();
  const { labs } = useContext(LabContext);
  const { addPc, updatePc } = useContext(PcContext);

  useEffect(() => {
    if (pcId) {
      getPc();
      setIsEdit(true);
    }
  }, [pcId]);

  const getPc = async () => {
    const pcSnapshot = await getDoc(doc(db, "pcs", pcId));
    if (pcSnapshot.exists()) {
      setInput(pcSnapshot.data());
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const checkResult = model.check(input);
    const newErrors = {};
    Object.keys(checkResult).forEach((key) => {
      if (checkResult[key]?.hasError) newErrors[key] = checkResult[key].errorMessage;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEdit) {
      await updatePc(pcId, input, labId);
    } else {
      await addPc(input);
    }
    navigate("/pcs");
  };

  return (
    <div className="bg-[#e3e3e3] min-h-screen flex justify-center items-center">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {isEdit ? "Update PC" : "Add New PC"}
        </h2>

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            PC Name
          </label>
          <input
            type="text"
            id="name"
            value={input.name}
            onChange={handleChange}
            className={`shadow-xs bg-gray-50 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Enter PC Name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="labId"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Lab
          </label>
          <select
            id="labId"
            value={input.labId}
            onChange={handleChange}
            className={`bg-gray-50 border ${
              errors.labId ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          >
            <option value="">Choose a Lab</option>
            {labs &&
              labs.map((lab, idx) => {
                return lab.assigned <= 0 ? (
                  ""
                ) : (
                  <option key={idx} value={lab.id}>
                    {lab.name}
                  </option>
                );
              })}
          </select>
          {errors.labId && (
            <p className="text-red-500 text-xs mt-1">{errors.labId}</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
        >
          {isEdit ? "Update PC" : "Add New PC"}
        </button>
      </form>
    </div>
  );
};

export default ManagePc;
