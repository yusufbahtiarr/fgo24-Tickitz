import React, { useState } from "react";

function Seat() {
  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const cols = 14;

  const initialSeats = Array(rows.length)
    .fill(null)
    .map(() => Array(cols).fill("available"));

  const soldSeats = [
    // [0, 6],
    // [1, 1],
    // [1, 2],
  ];
  const loveNest = [
    // [5, 9],
    // [5, 10],
  ];

  soldSeats.forEach(([r, c]) => {
    initialSeats[r][c] = "sold";
  });
  loveNest.forEach(([r, c]) => {
    initialSeats[r][c] = "lovenest";
  });

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleCheckboxChange = (rowIndex, colIndex) => {
    const updatedSeats = [...seats];
    const seatId = `${rows[rowIndex]}${colIndex + 1}`;
    const currentStatus = updatedSeats[rowIndex][colIndex];

    if (currentStatus === "sold" || currentStatus === "lovenest") return;

    if (currentStatus === "selected") {
      updatedSeats[rowIndex][colIndex] = "available";
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      updatedSeats[rowIndex][colIndex] = "selected";
      setSelectedSeats([...selectedSeats, seatId]);
    }

    setSeats(updatedSeats);
  };

  const ticketPrice = 10;
  const totalPayment = selectedSeats.length * ticketPrice;

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-4">Choose Your Seat</h2>
        <div className="mb-4 text-center">Screen</div>

        <div className="overflow-x-auto">
          <div className="flex">
            <div className="flex flex-col mr-1 gap-2">
              {/* Row A-G */}
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  {row}
                </div>
              ))}
            </div>
            <div>
              {/* Seat */}
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 mb-2">
                  {Array(cols)
                    .fill(null)
                    .map((_, colIndex) => {
                      const status = seats[rowIndex][colIndex];
                      const isDisabled =
                        status === "sold" || status === "lovenest";

                      return (
                        <label
                          key={`${rowIndex}-${colIndex}`}
                          className="w-10 h-10 rounded flex items-center justify-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={status === "selected"}
                            disabled={isDisabled}
                            onChange={() =>
                              handleCheckboxChange(rowIndex, colIndex)
                            }
                          />
                          <div
                            className={`w-full h-full ${
                              status === "selected"
                                ? "bg-orange-500"
                                : status === "sold"
                                ? "bg-gray-500"
                                : status === "lovenest"
                                ? "bg-pink-400"
                                : "bg-gray-200"
                            } rounded`}
                          ></div>
                        </label>
                      );
                    })}
                </div>
              ))}
              {/* Column 1-14 */}
              <div className="flex gap-2">
                {Array(cols)
                  .fill(null)
                  .map((_, colIndex) => (
                    <div
                      key={colIndex}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      {colIndex + 1}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Seating key</h3>
          <div className="flex gap-29">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border border-gray-400 bg-white"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-pink-400"></div>
              <span>Love nest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-500"></div>
              <span>Sold</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2 text-center text-blue-700">
          CineOne21 Cinema
        </h3>
        <p>
          <strong>Movie selected:</strong> Spider-Man: Homecoming
        </p>
        <p>
          <strong>Date:</strong> Tuesday, 07 July 2020
        </p>
        <p>
          <strong>Time:</strong> 13:00pm
        </p>
        <p>
          <strong>One ticket price:</strong> ${ticketPrice}
        </p>
        <p>
          <strong>Seat choosed:</strong> {selectedSeats.join(", ") || "-"}
        </p>
        <hr className="my-3" />
        <p className="font-semibold">
          Total Payment <span className="text-blue-600">${totalPayment}</span>
        </p>
        <button
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={selectedSeats.length === 0}
        >
          Checkout now
        </button>
      </div>
    </div>
  );
}

export default Seat;
