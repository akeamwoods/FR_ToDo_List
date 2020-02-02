import React, { useState } from "react";
import { Wrapper, TextEditor } from "./style";
import { ToDo as ToDoType, useTypedSelector } from "../../store";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { useDrag } from "react-dnd";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { IconButton } from "../IconButton";

export const ToDo: React.FC<{
  todo: ToDoType;
}> = ({ todo: { content, id, priority, completed } }) => {
  const dispatch = useDispatch();
  const isInEditMode = useTypedSelector(state => state.editId === id);
  const [tempValue, setTemp] = useState(content);

  const [{ opacity }, drag] = useDrag({
    item: { id, priority, type: "*" },
    collect: (monitor: { isDragging: () => any }) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  return (
    <Wrapper ref={drag}>
      <input
        checked={completed}
        type="checkbox"
        onChange={() => dispatch(actions.todoCompletedStateModified(id))}
      />
      {!isInEditMode ? (
        <>
          <div> {content}</div>
          <IconButton onClick={() => dispatch(actions.todoEditModeEntered(id))}>
            <FaEdit size="16" />
          </IconButton>
        </>
      ) : (
        <>
          <TextEditor
            value={tempValue}
            onChange={e => setTemp(e.target.value)}
          ></TextEditor>

          <IconButton
            onClick={() =>
              dispatch(actions.todoEdited({ id, newContent: tempValue }))
            }
          >
            <FaCheck size="16" />
          </IconButton>
        </>
      )}
      <IconButton onClick={() => dispatch(actions.todoDeleted(id))}>
        <FaTimes size="16" />
      </IconButton>
    </Wrapper>
  );
};
