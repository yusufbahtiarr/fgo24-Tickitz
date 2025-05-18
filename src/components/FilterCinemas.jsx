import { FaAngleDown } from "react-icons/fa6";
import Badge from "./Badge";
import Button from "./Button";
import Input from "./Input";

function FilterCinemas() {
  return (
    <div className="px-20 flex flex-col w-full gap-10">
      <div className="flex flex-row w-full justify-between items-center gap-10">
        <div className="title-section">Now Showing in Cinemas</div>
        <div>
          <Button
            variant="primary"
            className="flex flex-row items-center h-[54px] font-bold gap-2"
          >
            POPULER <FaAngleDown />
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-4">
          <div className="text-[28px] text-left font-semibold w-95">
            Find movie
          </div>
          <div>
            <Input
              type="text"
              name="search"
              id="name"
              placeholder="Search your movie.."
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[28px] font-semibold text-left">Filters</div>
          <div className="flex flex-row gap-4">
            <div>
              <Button variant="secondary">ACTION</Button>
            </div>
            <div>
              <Button variant="secondary">ADVENTURE</Button>
            </div>
            <div>
              <Button variant="secondary">COMEDY</Button>
            </div>
            <div>
              <Button variant="secondary">SCI-FI</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterCinemas;
