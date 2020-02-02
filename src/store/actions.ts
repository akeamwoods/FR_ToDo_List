import { ActionType, createAction } from "typesafe-actions";
import { Priority, ToDo } from ".";

const todoCreated = createAction("todo created")<
  Pick<ToDo, "id" | "content" | "priority">
>();
const todoEdited = createAction("todo edited")<{
  id: string;
  newContent: string;
}>();
const todoPriorityChanged = createAction("todo priority changed")<{
  id: string;
  newPriority: number;
}>();
const todoDeleted = createAction("todo deleted")<string>();
const priorityCleared = createAction("priority section cleared")<Priority>();
const allTodosCleared = createAction("all todos cleared")<void>();
const sortChanged = createAction("sort changed")<string>();
const sortApplied = createAction("sort applied")<void>();
const todoEditModeEntered = createAction("todo edit mode entered")<string>();
const todoCompletedStateModified = createAction(
  "todo completition state modified"
)<string>();

export const actions = {
  todoCompletedStateModified,
  todoEditModeEntered,
  todoCreated,
  todoEdited,
  todoPriorityChanged,
  todoDeleted,
  priorityCleared,
  allTodosCleared,
  sortChanged,
  sortApplied
};

export type Actions = ActionType<typeof actions>;
