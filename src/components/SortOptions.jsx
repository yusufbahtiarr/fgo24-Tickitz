import { Listbox } from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa6";

const sortOptions = [
  { id: "popular", label: "Popular" },
  { id: "latest", label: "Latest" },
  { id: "title_asc", label: "Title A-Z" },
  { id: "title_desc", label: "Title Z-A" },
];

function SortDropdown({ sortOption, setSortOption }) {
  const selected = sortOptions.find((opt) => opt.id === sortOption);

  return (
    <div className="relative inline-block text-left w-40 sm:w-52 text-20 z-20">
      <Listbox
        value={sortOption}
        onChange={(selected) => {
          setSortOption(selected);
        }}
      >
        <div className="relative">
          <Listbox.Button className="w-full h-12 bg-primary text-white font-semibold px-4 pr-4 rounded-lg shadow-sm flex items-center justify-between text-lg">
            <span className="text-[16px] sm:text-[20px]">
              {selected?.label}
            </span>
            <FaAngleDown className="w-4 h-4 ml-2" />
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden ring-1 ring-black/10 focus:outline-none z-10">
            {sortOptions.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option.id}
                className={({ active }) =>
                  `cursor-pointer px-4 py-3 text-sm ${
                    active
                      ? "bg-primary text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
              >
                <span className="text-[16px] sm:text-[18px]">
                  {option.label}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export default SortDropdown;
