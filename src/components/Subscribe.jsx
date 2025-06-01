import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { addSubscribeAction } from "../redux/reducers/subscribes";
import { useDispatch } from "react-redux";

function Subscribe() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(addSubscribeAction(data));
    console.log(data);
    setIsSuccess(true);
    reset();
  };

  if (isSuccess) {
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  }
  return (
    <div className="w-full p-6 sm:p-20">
      <div className="py-15 px-9 sm:py-20 sm:px-[244px] bg-third rounded-[48px] flex flex-col gap-20 m-auto">
        <div className="w-full">
          <span className="text-3xl sm:title-section">
            Subscribe to Our Newsletter
          </span>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full gap-6 flex flex-col"
            autoComplete="off"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                {...register("name")}
                type="text"
                name="name"
                placeholder="Your Name First"
                className="w-full border-1 border-primary py-3 px-5 rounded-full focus:outline-0"
                required
              />
              <input
                {...register("email")}
                type="text"
                name="email"
                placeholder="Your Email First"
                className="w-full border-1 border-black-500 py-3 px-5 rounded-full focus:outline-0"
                required
              />
            </div>
            <div>
              <Button variant="primary" className="w-full">
                subscribe now
              </Button>
            </div>
            {isSuccess ? <span>Terimakasih anda sudah subscribe.</span> : ""}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
