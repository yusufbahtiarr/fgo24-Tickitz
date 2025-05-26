import React from "react";
import Navbar from "./../components/Navbar";
import Button from "./../components/Button";
import { CiCalendar } from "react-icons/ci";
import { IoMdEye } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminMoviePage() {
  return (
    <div className="w-screen h-screen bg-gray2 ">
      <Navbar />
      <div className="flex flex-col mt-22 px-33 py-11 gap-10 w-full h-full">
        <div className="px-15 py-10 flex flex-col gap-10 bg-white rounded-xl">
          <div className="flex flex-row justify-between">
            <div className="flex-1">
              <span className="text-2xl font-bold">List Movie</span>
            </div>
            <div className="flex-1 flex flex-row justify-end gap-4">
              {/* <CiCalendar /> */}
              <select
                name="date"
                id="date"
                className="px-9 rounded-xl bg-gray1"
              >
                <option value="november">November 2023</option>
              </select>
              <Button variant="third" className="text-white rounded-xl px-4">
                <Link to="/admin-new-movie">Add Movies</Link>
              </Button>
            </div>
          </div>
          <div>
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="text-[12px] font-bold p-4">No</th>
                  <th className="text-[12px] font-bold p-4">Thumbnail</th>
                  <th className="text-[12px] font-bold p-4">Movie Name</th>
                  <th className="text-[12px] font-bold p-4">Category</th>
                  <th className="text-[12px] font-bold p-4">Released Date</th>
                  <th className="text-[12px] font-bold p-4">Duration</th>
                  <th className="text-[12px] font-bold p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray1">
                  <td className="p-4">1</td>
                  <td className="p-4 items-center">
                    <img
                      src="./src/assets/images/list1.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="p-4">Spiderman HomeComing</td>
                  <td className="p-4">Action, Adventure</td>
                  <td className="p-4">07/05/2023</td>
                  <td className="p-4">2 Hours 15 Minute</td>
                  <td className="p-4 flex flexx-row gap-2 justify-center items-center">
                    <button className="size-[31px] flex justify-center items-center bg-blue rounded">
                      <IoMdEye className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-violet-600 rounded">
                      <FaPen className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-primary rounded">
                      <FaTrash className="text-white" />
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-gray1">
                  <td className="p-4">1</td>
                  <td className="p-4 items-center">
                    <img
                      src="./src/assets/images/list2.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="p-4">Avengers End Game</td>
                  <td className="p-4">Sci-fi, Adventure</td>
                  <td className="p-4">07/05/2023</td>
                  <td className="p-4">2 Hours 15 Minute</td>
                  <td className="p-4 flex flexx-row gap-2 justify-center items-center">
                    <button className="size-[31px] flex justify-center items-center bg-blue rounded">
                      <IoMdEye className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-violet-600 rounded">
                      <FaPen className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-primary rounded">
                      <FaTrash className="text-white" />
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-gray1">
                  <td className="p-4">1</td>
                  <td className="p-4 items-center">
                    <img
                      src="./src/assets/images/list1.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="p-4">Spiderman HomeComing</td>
                  <td className="p-4">Action, Adventure</td>
                  <td className="p-4">07/05/2023</td>
                  <td className="p-4">2 Hours 15 Minute</td>
                  <td className="p-4 flex flexx-row gap-2 justify-center items-center">
                    <button className="size-[31px] flex justify-center items-center bg-blue rounded">
                      <IoMdEye className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-violet-600 rounded">
                      <FaPen className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-primary rounded">
                      <FaTrash className="text-white" />
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-gray1">
                  <td className="p-4">1</td>
                  <td className="p-4 items-center">
                    <img
                      src="./src/assets/images/list2.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="p-4">Avengers End Game</td>
                  <td className="p-4">Sci-fi, Adventure</td>
                  <td className="p-4">07/05/2023</td>
                  <td className="p-4">2 Hours 15 Minute</td>
                  <td className="p-4 flex flexx-row gap-2 justify-center items-center">
                    <button className="size-[31px] flex justify-center items-center bg-blue rounded">
                      <IoMdEye className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-violet-600 rounded">
                      <FaPen className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-primary rounded">
                      <FaTrash className="text-white" />
                    </button>
                  </td>
                </tr>
                <tr className="border-t border-gray1">
                  <td className="p-4">1</td>
                  <td className="p-4 items-center">
                    <img
                      src="./src/assets/images/list1.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="p-4">Spiderman HomeComing</td>
                  <td className="p-4">Action, Adventure</td>
                  <td className="p-4">07/05/2023</td>
                  <td className="p-4">2 Hours 15 Minute</td>
                  <td className="p-4 flex flexx-row gap-2 justify-center items-center">
                    <button className="size-[31px] flex justify-center items-center bg-blue rounded">
                      <IoMdEye className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-violet-600 rounded">
                      <FaPen className="text-white" />
                    </button>
                    <button className="size-[31px] flex justify-center items-center bg-primary rounded">
                      <FaTrash className="text-white" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <button className="size-10 bg-primary rounded text-white text-[18px]">
              1
            </button>
            <button className="size-10 bg-white border border-gray1 rounded text-black text-[18px]">
              2
            </button>
            <button className="size-10 bg-white border border-gray1 rounded text-black text-[18px]">
              3
            </button>
            <button className="size-10 bg-white border border-gray1 rounded text-black text-[18px]">
              4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMoviePage;
