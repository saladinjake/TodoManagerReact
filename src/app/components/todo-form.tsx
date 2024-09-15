import React from "react";
import DatePicker from "./date-picker";
import { ITodo } from "../helpers/typings";

interface IProps {
  todo: ITodo;
  setTodo: React.Dispatch<React.SetStateAction<ITodo>>;
  isLoading: boolean;
  handleSubmit: () => void;
}

const TodoForm = (props: IProps) => {
  const { todo, setTodo, isLoading, handleSubmit } = props;

  return (
    <div className="flex justify-center pt-24">
      <div className=" w-full px-5 md:px-0 md:w-[370px]">
        <div className="flex flex-col">
          <label htmlFor="" className="text-black font-medium text-sm mb-1">
            Name
          </label>

          <input
            type="text"
            className="border h-[44px] w-full rounded-xl bg-white-700 border-white-900 text-black px-3"
            placeholder="Task name"
            value={todo.name}
            onChange={({ target }) =>
              setTodo((state) => ({ ...state, name: target.value }))
            }
          />
        </div>

        <div className="mt-5">
          <DatePicker
            value={todo.date as any}
            setValue={(date) => setTodo((state) => ({ ...state, date }))}
          />
        </div>

        <div className="flex flex-col mt-5">
          <div className="text-black text-sm mb-1 font-medium">Priority</div>

          <div className="flex items-center gap-x-8">
            <label className="text-black flex items-center gap-x-2 text-sm">
              <input
                type="radio"
                value={todo.priority}
                checked={todo.priority === "High"}
                onChange={() =>
                  setTodo((state) => ({ ...state, priority: "High" }))
                }
              />
              High
            </label>

            <label className="text-black flex items-center gap-x-2 text-sm">
              <input
                type="radio"
                value={todo.priority}
                checked={todo.priority === "Medium"}
                onChange={() =>
                  setTodo((state) => ({ ...state, priority: "Medium" }))
                }
              />
              Medium
            </label>
          </div>
        </div>

        <button
          className={`w-full h-[44px] rounded-xl mt-10 bg-[#000] text-white font-medium text-sm ${
            !todo.name || !todo.date ? "cursor-not-allowed bg-black-300 text-white-300" : ""
          }`}
          onClick={handleSubmit}
          disabled={!todo.name || !todo.date}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
