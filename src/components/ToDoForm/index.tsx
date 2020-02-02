import React, { useState } from "react";
import { Form, Input, Select, Button } from "./style";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { priorities, priorityToString } from "./../../store/index";
import uuid from "uuid";

export const ToDoForm = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(0);
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        dispatch(actions.todoCreated({ id: uuid.v4(), content, priority }));
        setContent("");
      }}
    >
      <Input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What do you need to do?..."
      />
      <Select
        value={priorities[priority]}
        onChange={e => setPriority(e.target.selectedIndex)}
      >
        {priorities.map((key, index) => (
          <option key={key} value={key}>
            {priorityToString(index)}
          </option>
        ))}
      </Select>
      <Button>Add To List</Button>
    </Form>
  );
};
