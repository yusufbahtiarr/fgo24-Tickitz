import Navbar from "./../components/Navbar";
import Button from "./../components/Button";
import { IoMdEye } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminMoviePage() {
  const currentUser = useSelector((state) => state.auths.currentUser);

  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="bg-gray2 min-h-[100vh] overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col p-6 mt-21 sm:px-33 sm:py-11 gap-10 w-full h-full">
        <div className="p-6 sm:px-15 sm:py-10 flex flex-col gap-6 sm:gap-10 bg-white rounded-xl">
          <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between">
            <div className="sm:flex-1 flex flex-row justify-between items-center">
              <span className="text-[18px] sm:text-2xl font-bold">
                List Movie
              </span>
              <Button
                variant="third"
                className="text-white rounded-xl px-4 block sm:hidden"
              >
                <Link to="/admin-new-movie">Add Movies</Link>
              </Button>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row justify-end gap-4">
              {/* <CiCalendar /> */}
              <select
                name="date"
                id="date"
                className="px-9 py-4 rounded-xl bg-gray1"
              >
                <option value="november">November 2023</option>
              </select>
              <Button
                variant="third"
                className="text-white rounded-xl px-4 hidden sm:block"
              >
                <Link to="/admin-new-movie">Add Movies</Link>
              </Button>
            </div>
          </div>
          <div className="w-full overflow-auto scroll-smooth">
            <table className="w-[820px] sm:w-full text-center mb-6 sm:mb-0">
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
                <tr className="border-t border-gray1 text-[12px] sm:text[16px]">
                  <td className="py-4 px-2 sm:p-4">1</td>
                  <td className="py-4 px-2 sm:p-4 items-center">
                    <img
                      src="../src/assets/images/list1.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="py-4 px-2 sm:p-4 text-primary">
                    Spiderman HomeComing
                  </td>
                  <td className="py-4 px-2 sm:p-4">Action, Adventure</td>
                  <td className="py-4 px-2 sm:p-4">07/05/2023</td>
                  <td className="py-4 px-2 sm:p-4">2 Hours 15 Minute</td>
                  <td className="py-4 px-2 sm:p-4 flex flexx-row gap-2 justify-center items-center">
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
                <tr className="border-t border-gray1 text-[12px] sm:text[16px]">
                  <td className="p-4">2</td>
                  <td className="p-4 items-center">
                    <img
                      src="../src/assets/images/list2.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="py-4 px-2 sm:p-4 text-primary">
                    Avengers End Game
                  </td>
                  <td className="py-4 px-2 sm:p-4">Sci-fi, Adventure</td>
                  <td className="py-4 px-2 sm:p-4">07/05/2023</td>
                  <td className="py-4 px-2 sm:p-4">2 Hours 15 Minute</td>
                  <td className="py-4 px-2 sm:p-4 flex flexx-row gap-2 justify-center items-center">
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
                <tr className="border-t border-gray1 text-[12px] sm:text[16px]">
                  <td className="py-4 px-2 sm:p-4">3</td>
                  <td className="py-4 px-2 sm:p-4 items-center">
                    <img
                      src="../src/assets/images/list1.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="py-4 px-2 sm:p-4 text-primary">
                    Spiderman HomeComing
                  </td>
                  <td className="py-4 px-2 sm:p-4">Action, Adventure</td>
                  <td className="py-4 px-2 sm:p-4">07/05/2023</td>
                  <td className="py-4 px-2 sm:p-4">2 Hours 15 Minute</td>
                  <td className="py-4 px-2 sm:p-4 flex flexx-row gap-2 justify-center items-center">
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
                <tr className="border-t border-gray1 text-[12px] sm:text[16px]">
                  <td className="py-4 px-2 sm:p-4">4</td>
                  <td className="py-4 px-2 sm:p-4 items-center">
                    <img
                      src="../src/assets/images/list2.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="py-4 px-2 sm:p-4 text-primary">
                    Avengers End Game
                  </td>
                  <td className="py-4 px-2 sm:p-4">Sci-fi, Adventure</td>
                  <td className="py-4 px-2 sm:p-4">07/05/2023</td>
                  <td className="py-4 px-2 sm:p-4">2 Hours 15 Minute</td>
                  <td className="py-4 px-2 sm:p-4 flex flexx-row gap-2 justify-center items-center">
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
                <tr className="border-t border-gray1 text-[12px] sm:text[16px] border-b sm:border-b-0">
                  <td className="py-4 px-2 sm:p-4">5</td>
                  <td className="py-4 px-2 sm:p-4 items-center">
                    <img
                      src="../src/assets/images/list1.png"
                      alt="images"
                      className="inline-block w-[46px] h-[38px] rounded object-cover"
                    />
                  </td>
                  <td className="py-4 px-2 sm:p-4 text-primary">
                    Spiderman HomeComing
                  </td>
                  <td className="py-4 px-2 sm:p-4">Action, Adventure</td>
                  <td className="py-4 px-2 sm:p-4">07/05/2023</td>
                  <td className="py-4 px-2 sm:p-4">2 Hours 15 Minute</td>
                  <td className="py-4 px-2 sm:p-4 flex flexx-row gap-2 justify-center items-center">
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
            <button className="size-8 sm:size-10 bg-primary rounded text-white text-[18px]">
              1
            </button>
            <button className="size-8 sm:size-10 bg-white border border-gray1 rounded text-black text-[18px]">
              2
            </button>
            <button className="size-8 sm:size-10 bg-white border border-gray1 rounded text-black text-[18px]">
              3
            </button>
            <button className="size-8 sm:size-10 bg-white border border-gray1 rounded text-black text-[18px]">
              4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMoviePage;
