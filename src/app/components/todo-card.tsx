import Image from "next/image";
import React from "react";

import { ITodo } from "../utils/typings";

interface IProps {
  data: ITodo;
  onEdit: (todoId: string) => void;
  onDelete: (todoId: string) => void;
}

const TodoCard = (props: IProps) => {
  const { data, onEdit, onDelete } = props;

  return (
    <div className="shadow bg-white rounded-xl flex items-center justify-between h-[85px] px-5">
      <div>
        <div className="text-lg text-[#0F0E17] mb-1">{data.name}</div>

        <div className="text-[11px] text-[#571032] bg-[#FCEEF5] py-1 px-1 inline-block font-semibold rounded">
          {data.priority}
        </div>
      </div>

      <div className="flex gap-x-3">
        <button onClick={() => onEdit(data.id as string)}>
          <Image src="/icons/edit.svg" alt="delete" height="21" width="21" />
        </button>

        <button onClick={() => onDelete(data.id as string)}>
          <Image src="/icons/delete.svg" alt="delete" height="21" width="21" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
