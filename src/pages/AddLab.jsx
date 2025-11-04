import { useContext, useEffect, useState } from "react";
import { LabContext } from "../context/LabContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Schema } from "rsuite";

const AddLab = () => {
    const [input, setInput] = useState({
        name: "",
        capacity: "",
        location: "",
    });
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const { labId } = useParams();
    const navigate = useNavigate();
    const { addLab, updateLab } = useContext(LabContext);

    const { StringType, NumberType } = Schema.Types;
    const model = Schema.Model({
        name: StringType()
            .isRequired("Lab name is required")
            .minLength(3, "Name must be at least 3 characters"),
        capacity: NumberType("Capacity must be a number")
            .isRequired("Capacity is required")
            .min(1, "Capacity must be at least 1"),
        location: StringType().isRequired("Location is required"),
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const docSnap = await getDoc(doc(db, "labs", labId));
                const data = docSnap.data();
                if (data) {
                    setInput(data);
                    setIsEdit(true);
                }
            } catch (err) {
                console.error(err);
            }
        };
        if (labId) getData();
    }, [labId]);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: null });
    };

    const handleSubmit = (e) => {
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
            updateLab(labId, input);
        } else {
            addLab(input);
        }

        setInput({ name: "", capacity: "", location: "" });
        navigate("/labs");
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#e3e3e3]">
            <form
                className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
                    {isEdit ? "Update Lab" : "Add New Lab"}
                </h2>

                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Lab Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={input.name}
                        onChange={handleChange}
                        className={`shadow-xs bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        placeholder="Enter lab name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="capacity"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Capacity
                    </label>
                    <input
                        type="number"
                        id="capacity"
                        value={input.capacity}
                        onChange={handleChange}
                        className={`shadow-xs bg-gray-50 border ${errors.capacity ? "border-red-500" : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        placeholder="Enter capacity"
                    />
                    {errors.capacity && (
                        <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="location"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={input.location}
                        onChange={handleChange}
                        className={`shadow-xs bg-gray-50 border ${errors.location ? "border-red-500" : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        placeholder="Enter location"
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    {isEdit ? "Update Lab" : "Add New Lab"}
                </button>
            </form>
        </section>

    );
};

export default AddLab;
