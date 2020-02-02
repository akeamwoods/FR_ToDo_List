import React from "react";
import { Wrapper, Header } from "./style";
import { ToDo as ToDoType, priorityToString } from "../../store";
import { ToDo } from "../ToDo";
import { useDrop } from "react-dnd";
import { IconButton } from "../IconButton";
import { FaTimesCircle } from "react-icons/fa";

export const ToDoList: React.FC<{
  priority: number;
  todos: ToDoType[];
  onDrop: (item: any) => void;
  clearGroup: () => void;
}> = ({ priority, todos, onDrop, clearGroup }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    drop: onDrop,
    accept: "*",
    collect: (monitor: { isOver: () => any; canDrop: () => any }) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <Wrapper ref={drop}>
      <Header>
        <h3>{priorityToString(priority)}</h3>
        <IconButton disabled={todos.length === 0} onClick={clearGroup}>
          <FaTimesCircle size="16" />
        </IconButton>
      </Header>
      <div
        style={{
          flex: "1 1",
          background: isOver ? "rgb(0, 77, 103)" : "transparent"
        }}
      >
        {todos.map(todo => (
          <ToDo key={todo.id} todo={todo} />
        ))}
      </div>
    </Wrapper>
  );
};
