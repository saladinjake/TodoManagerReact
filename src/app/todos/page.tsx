"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import FloatingButton from "../components/floating-button";
import TodoCard from "../components/todo-card";
import { type ITodo } from "../utils/typings";
import groupTodosByDate from "../utils/group-todos-by-date";
import {
  addTodo,
  deleteTodo,
  getTodosByUserId,
  updateTodo,
} from "../services/todos";
import { auth } from "../services";
import { onAuthStateChanged, signOut } from "firebase/auth";
const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
   const [showOverlay, setShowOverlay] = useState(false);
  const [action, setAction] = useState("create");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todo, setTodo] = useState<ITodo>({
    id: "",
    name: "Add Task",
    priority: "High",
    date: new Date(),
  });
  const groupedTodosByDate = groupTodosByDate(todos);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getTodosByUserId(uid)
          .then((res) => {
            setTodos((res as ITodo[]) || []);
          })
          .finally(() => setIsLoading(false));
      } else {
        router.push("/");
      }
    });
  }, []);
   const handleClose = () => {
    setTodo({
      name: "",
      priority: "High",
      date: new Date(),
    });
    setAction("create");
  };
  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };

  const handleUpdateChanges = (id: string) => {
    const selectedTodo = todos.find((item) => item.id === id);
    if (selectedTodo) {
      setTodo(selectedTodo);
      setAction("update");
      setShowOverlay(true);
    }
  };
  const handleRemoveTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      toast.success("Successfully deleted todo");
      setTodos((state) => state.filter((item) => item.id !== id));
    } catch (e) {
      toast.error("Error occurred while deleting todo");
    }
  };


  const handleSendToApi = async () => {
    try {
      setIsSubmitting(true);
      const payload = {
        date: format(new Date(todo.date as string), "yyyy-MM-dd"),
        name: todo.name,
        priority: todo.priority,
      };

      if (action === "update") {
        await updateTodo(todo.id as string, payload);
        setTodos((state) =>
          state.map((item) => {
            if (item.id === todo.id) {
              return { ...item, ...payload };
            }
            return item;
          })
        );
        toast.success("Successfully updated todo");
        setShowOverlay(false);
        return;
      }
      const docId = await addTodo({
        ...payload,
        userId: auth.currentUser?.uid,
      });
      toast.success("Successfully created todo");
      setTodos((state) => [...state, { id: docId, ...payload }]);
      setShowOverlay(false);
    } catch (error) {
      toast.error("An Error occured");
    } finally {
      setIsSubmitting(false);
    }
  };

 

  return (
    <main>
      <div className="w-[90%] mx-auto pb-20">
        <FloatingButton
          todo={todo}
          setTodo={setTodo}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
          onClose={handleClose}
          handleSendToApi={handleSendToApi}
          isSubmitting={isSubmitting}
        />

        <header className="h-[100px] flex items-center justify-between">
          <h1 className="text-2xl font-semibold">To Do List</h1>

          <div className="flex items-center">
            <div className="bg-gray-200 border border-gray-500 h-9 w-9 rounded-full flex items-center justify-center">
              {auth?.currentUser?.displayName![0] || ""}
            </div>

            <button className="ml-2" onClick={handleSignOut}>
              Logout
            </button>
          </div>
        </header>

        <div className="mb-6 text-lg font-semibold">This Week</div>

        {isLoading && <div>Loading...</div>}

        {!isLoading && (
          <>
            {todos.length ? (
              <div className="space-y-5">
                {Object.keys(groupedTodosByDate).map((item) => (
                  <div key={item}>
                    <h3 className="mb-2 text-[#E53170] font-medium">
                      {format(new Date(item), "EEEE, do, MMM")}
                    </h3>

                    <div className="space-y-3">
                      {groupedTodosByDate[item].map(
                        (subItem: ITodo, i: number) => (
                          <TodoCard
                            key={`sub-item-${i}`}
                            data={subItem}
                            onDelete={handleRemoveTodo}
                            onEdit={handleUpdateChanges}
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No todos found...</div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Todos;
