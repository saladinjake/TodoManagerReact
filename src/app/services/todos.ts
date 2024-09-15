// Add a second document with a generated ID.
import {
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from ".";
import { ITodo } from "../utils/typings";
import { format } from "date-fns";
import { nanoid } from "nanoid";
enum COLLECTIONS {
  TODOS = "todos",
}
export const getTodos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.TODOS));
    const todos: ITodo[] = [];
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        ...doc.data(),
        createdAt: format(
          new Date(doc.data().createdAt.seconds * 1000),
          "yyyy-MM-dd"
        ),
        updatedAt: format(
          new Date(doc.data().updatedAt.seconds * 1000),
          "yyyy-MM-dd"
        ),
      } as ITodo);
    });
    return todos;
  } catch (e) {
    console.log(e);
  }
};

export const getTodosByUserId = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.TODOS),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    const todos: ITodo[] = [];
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        ...doc.data(),
        createdAt: format(
          new Date(doc.data().createdAt.seconds * 1000),
          "yyyy-MM-dd"
        ),
        updatedAt: format(
          new Date(doc.data().updatedAt.seconds * 1000),
          "yyyy-MM-dd"
        ),
      } as ITodo);
    });
    return todos;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.TODOS, todoId));
  } catch (e: any) {
    throw new Error(e);
  }
};

export const addTodo = async (todo: ITodo) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.TODOS), {
      ...todo,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error(e);
  }
};





export const updateTodo = async (todoId: string, data: ITodo) => {
  try {
    const todoRef = doc(db, COLLECTIONS.TODOS, todoId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(todoRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (e: any) {
    throw new Error(e);
  }
};


