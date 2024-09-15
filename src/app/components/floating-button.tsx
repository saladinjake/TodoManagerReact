"use client";
import Image from "next/image";
import { useState, forwardRef } from "react";
import { format } from "date-fns";
import { addTodo } from "../services/todos";
import { ITodo } from "../helpers/typings";
import TodoForm from "./todo-form";

interface IProps {
  todo: ITodo;
  setTodo: React.Dispatch<React.SetStateAction<ITodo>>;
  showOverlay: boolean;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const FloatingButton = (props: IProps) => {
  const {
    todo,
    setTodo,
    showOverlay,
    setShowOverlay,
    onClose,
    handleSubmit,
    isSubmitting,
  } = props;

  return (
    <div
      className={`${
        showOverlay
          ? "w-full h-full bottom-0 right-0"
          : "w-[71px] h-[71px] rounded-full bottom-5 right-[5%]"
      }  bg-[#fff] fixed transition-all`}
    >
      <button
        className="relative w-[71px] h-[71px] rounded-full flex items-center justify-center"
        onClick={() => {
          setShowOverlay((state) => !state);

          if (!showOverlay) {
            onClose();
          }
        }}
      >
        <Image
          src="/icons/plus.svg"
          alt="plus"
          height="35"
          width="35"
          className={`${showOverlay ? "rotate-45" : ""} transition-all`}
        />
      </button>

      <TodoForm
        todo={todo}
        setTodo={setTodo}
        isLoading={isSubmitting}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default FloatingButton;
