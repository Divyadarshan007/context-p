import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";

const Pcs = () => {
  const navigate = useNavigate();
  const { pcs, deletePc } = useContext(PcContext);
  const { labs } = useContext(LabContext);



  const showLab = (labId) => {
    if(labs.length !== 0){
      const labName = labs.find((lab) => {
        return lab.id == labId;
      });

      return labName.name ? labName.name : "Assigned"
    }else{
      return "Not Assigned"
    }

  };

  return (
    <div className="py-10 bg-[#e3e3e3]  h-screen">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between py-10">
          <h1 className="text-3xl font-semibold text-foreground">All Pcs</h1>
          <button
            onClick={() => navigate("/add-pc")}
            className="border px-7 py-2 m-5 text-white bg-[#010201] font-medium"
          >
            Add Pc
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="relative overflow-x-auto shadow-md ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Lab Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Created on
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pcs.map((pc, idx) => {
                return (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {idx + 1}
                    </th>
                    <td className="px-6 py-4">{pc.name}</td>
                    <td className="px-6 py-4">{showLab(pc.labId)}</td>
                    <td className="px-6 py-4">{pc.status}</td>
                    <td className="px-6 py-4">
                      {pc.createdAt.toDate().toLocaleDateString("en-In")}
                    </td>
                    <td className="px-6 py-4 text-right flex gap-4">
                      <Link
                        to={`/edit-pc/${pc.pcId}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        onClick={() => deletePc(pc.pcId)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pcs;
