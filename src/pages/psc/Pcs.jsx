import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";
import { Badge } from "@/components/ui/badge";
import { EclipseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useId } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";

const Pcs = () => {
  const navigate = useNavigate();
  const { pcs, deletePc, handleRepair } = useContext(PcContext);
  const { showLab } = useContext(LabContext);

  const id = useId();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(pcs.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPcs = pcs.slice(startIndex, startIndex + rowsPerPage);

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: 5,
  });

  return (
    <div className="py-10 bg-[#e3e3e3]  h-screen">
      <div className="container mx-auto pt-10">
        <div className="dark bg-muted text-foreground px-4 md:py-2">
          <div className="flex gap-2 md:items-center">
            <div className="flex grow gap-3 md:items-center">
              <EclipseIcon
                className="shrink-0 opacity-60 max-md:mt-0.5"
                size={16}
                aria-hidden="true"
              />
              <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
                <p className="text-lg text-[#e3e3e3] font-semibold">
                  All Pcs
                </p>
                <div className="flex gap-2 max-md:flex-wrap">
             
                  <Button
                    onClick={() => navigate("/add-pc")}
                    size="sm"
                    className="text-sm bg-[#e3e3e3] text-[#212121] hover:bg-[#cacaca] transition-all"
                  >
                    Add Pc
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="relative overflow-x-auto shadow-md ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">No.</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Lab Name</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Created on</th>
                <th scope="col" className="px-6 py-3">Turn-off to Repair</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPcs.map((pc, idx) => {
                return (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {startIndex + idx + 1}
                    </th>
                    <td className="px-6 py-4">{pc.name}</td>
                    <td className="px-6 py-4">{showLab(pc.labId)}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="gap-1.5">
                        <span
                          className={`size-1.5 rounded-full ${pc.status == "Available"
                            ? "bg-emerald-500"
                            : pc.status == "Assigned"
                              ? "bg-rose-700"
                              : "bg-orange-500"
                            }`}
                          aria-hidden="true"
                        ></span>
                        {pc.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {pc.createdAt.toDate().toLocaleDateString("en-In")}
                    </td>
                    <td className="px-20 py-4 gap-4">
                      <div className="inline-flex items-center gap-2 ">
                        <Switch
                          id={id}
                          checked={pc.status !== "in-Repair"}
                          onClick={() => handleRepair(pc.pcId, pc.status)}
                        />
                        <Label htmlFor={id} className="sr-only">
                          Colored switch
                        </Label>
                      </div>
                    </td>
                    <td >
                      <div className="flex items-center gap-4">
                        <Link
                          to={`/edit-pc/${pc.pcId}/${pc.labId}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <Link
                          onClick={() => deletePc(pc.pcId, pc.labId)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </Link>
                      </div>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className={
                      currentPage === 1 ? "pointer-events-none cursor-pointer opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {showLeftEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className='cursor-pointer'
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {showRightEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none cursor-pointer opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pcs;
