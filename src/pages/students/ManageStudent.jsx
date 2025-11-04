import { useContext, useEffect, useState } from "react";
import { LabContext } from "../../context/LabContextProvider";
import { PcContext } from "../../context/PcContextProvider";
import { StudentContext } from "../../context/StudentContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Schema } from "rsuite";

const ManageStudent = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    grid: "",
    labId: "",
    pcId: "",
  });
  const [errors, setErrors] = useState({});

  const { stuId, pcId } = useParams();
  const navigate = useNavigate();

  const [filteredPc, setFilteredPc] = useState([]);
  const { labs, showLab } = useContext(LabContext);
  const { pcs, showPc } = useContext(PcContext);
  const { addStudent, editStudent } = useContext(StudentContext);

  const { StringType, NumberType } = Schema.Types;
  const model = Schema.Model({
    name: StringType()
      .isRequired("Student name is required")
      .minLength(3, "Name must be at least 3 characters"),
    email: StringType()
      .isEmail("Enter a valid email address")
      .isRequired("Email is required"),
    grid: StringType()
      .pattern(/^[0-9]{4,10}$/, "Grid must be a valid numeric ID (4–10 digits)")
      .isRequired("Grid is required"),
    labId: StringType().isRequired("Lab selection is required"),
    pcId: StringType().isRequired("PC selection is required"),
  });

  useEffect(() => {
    if (stuId) {
      getStudent();
      setIsEdit(true);
    }
  }, [stuId]);

  useEffect(() => {
    if (input.labId) {
      const availablePc = pcs.filter(
        (pc) => pc.labId === input.labId && pc.status === "Available"
      );
      setFilteredPc(availablePc);
    } else {
      setFilteredPc([]);
    }
  }, [input.labId, pcs]);

  const getStudent = async () => {
    const studentSnapshot = await getDoc(doc(db, "students", stuId));
    if (studentSnapshot.exists()) {
      setInput(studentSnapshot.data());
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkResult = model.check(input);
    const newErrors = {};

    Object.keys(checkResult).forEach((key) => {
      if (checkResult[key].hasError) {
        newErrors[key] = checkResult[key].errorMessage;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isEdit) {
      await editStudent(input, stuId, pcId);
    } else {
      await addStudent(input);
    }

    navigate("/students");
  };

  return (
    <section className="bg-[#e3e3e3] min-h-screen flex items-center justify-center">
      <form
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg grid gap-4 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4 md:col-span-2 text-center text-gray-800">
          {isEdit ? "Update Student" : "Add New Student"}
        </h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={input.name}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={input.email}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="grid" className="text-sm font-medium text-gray-700 mb-1">
            Grid
          </label>
          <input
            type="text"
            id="grid"
            value={input.grid}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.grid ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="1234"
          />
          {errors.grid && (
            <p className="text-red-500 text-xs mt-1">{errors.grid}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="labId" className="text-sm font-medium text-gray-700 mb-1">
            Lab
          </label>
          <select
            id="labId"
            value={input.labId}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.labId ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Lab</option>
            {labs.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {showLab(lab.id)}
              </option>
            ))}
          </select>
          {errors.labId && (
            <p className="text-red-500 text-xs mt-1">{errors.labId}</p>
          )}
        </div>

        <div className="flex flex-col md:col-span-2">
          <label htmlFor="pcId" className="text-sm font-medium text-gray-700 mb-1">
            PC
          </label>
          <select
            id="pcId"
            value={input.pcId}
            onChange={handleChange}
            className={`bg-gray-50 border ${errors.pcId ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select PC</option>
            {filteredPc.map((pc) => (
              <option key={pc.pcId} value={pc.pcId}>
                {showPc(pc.pcId)}
              </option>
            ))}
          </select>
          {errors.pcId && (
            <p className="text-red-500 text-xs mt-1">{errors.pcId}</p>
          )}
        </div>
        <button
          type="submit"
          className="md:col-span-2 mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {isEdit ? "Update Student" : "Add New Student"}
        </button>
      </form>
    </section>


  );
};

export default ManageStudent;
