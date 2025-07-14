import Button from "./Button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { addTicketAction } from "../redux/reducers/tickets";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

function ModalPayment({ totalPayment, modal, setModal }) {
  const dateNow = format(new Date(), "EEEE, d MMMM yyyy", { locale: id });
  const tempTicket = useSelector((state) => state.tickets.tempTicket);
  console.log(tempTicket);

  const spanVirtual = useRef(null);
  const dispatch = useDispatch();
  const handleCopy = () => {
    navigator.clipboard.writeText(spanVirtual.current.textContent);
  };
  const navigate = useNavigate();
  const handleSave = () => {
    const idTicket = `TK-${nanoid()}`;

    dispatch(
      addTicketAction({
        ...tempTicket,
        idTicket,
        createdAt: new Date().toISOString(),
      })
    );

    navigate(`/ticket-result/${idTicket}`, { replace: true });
  };
  return (
    <div
      className={`sm:w-full h-full flex-col sm:justify-center justify-start sm:items-center absolute py-10 px-6  top-0  sm:top-0 sm:left-0 right-0 bg-black/60 ${
        modal ? "flex" : "hidden"
      }`}
    >
      <div
        className={`h-fit sm:h-[520px] sm:w-[600px] w-full rounded-xl shadow border-e-amber-5 mx-auto bg-white ${
          modal ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-col w-full p-10 gap-8">
          <div className="flex justify-center items-center w-full">
            <span className="text-2xl font-bold">Payment Info</span>
          </div>
          <div className="flex flex-col sm:flex-row w-full">
            <div className="flex-1 flex flex-row justify-between items-center">
              <div className="w-[70%] flex justify-between items-center text-gray3">
                <div>No. Rekening Virtual</div>
                <div>:</div>
              </div>
            </div>
            <div className="flex-1 flex flex-row justify-between items-center">
              <div>
                <span ref={spanVirtual} className="text-[18px] font-bold">
                  67099428188772650
                </span>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="font-normal text-sm h-10"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row w-full">
            <div className="flex-1 flex flx-row justify-between items-center">
              <div className="w-full sm:w-[70%] flex justify-between items-center text-gray3">
                <div>Total Payment</div>
                <div>:</div>
              </div>
            </div>
            <div className="flex-1 flex flex-row justify-start sm:justify-end items-center">
              <div>
                <span className="text-[18px] font-bold text-blue">
                  Rp. {totalPayment}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <span className=" text-gray3">
              Pay this payment bill before it is due,
              <span className="text-red">on {dateNow}</span>. If the bill has
              not been paid by the specified time, it will be forfeited
            </span>
          </div>

          <div className="w-full flex gap-4 flex-col">
            <Button
              variant="third"
              className="font-bold text-white w-full"
              onClick={handleSave}
            >
              Payment
            </Button>
            <Button
              variant="third"
              className=" bg-white font-bold text-primary w-full shadow"
              onClick={() => setModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPayment;
