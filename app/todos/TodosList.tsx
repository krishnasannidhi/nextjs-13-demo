import { Todo } from "@/typings";
import Link from "next/link";
import React from "react";

const fetchTodos = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos: Todo[] = await result.json();
  return todos;
};

async function TodosList() {
  const todos = await fetchTodos();
  return (
    <>
      {todos.map((todo) => (
        <p key={todo?.id}>
          <Link href={`/todos/${todo?.id}`}>Todo: {todo?.id}</Link>
        </p>
      ))}
    </>
  );
}

export async function generateStaticParams() {
  const result = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos: Todo[] = await result.json();

  const trimmedTodos = todos.splice(0, 10);

  return trimmedTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}

export default TodosList;
