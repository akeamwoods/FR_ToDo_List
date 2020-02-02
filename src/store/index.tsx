import { Actions, actions } from "./actions";
import { Reducer, createStore, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import produce from "immer";
import { getType } from "typesafe-actions";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage
};

export enum Priority {
  lifeChanging,
  important,
  meh
}

export const priorities = Object.keys(Priority).filter(
  value => !isNaN(Number(value))
);

export const priorityToString = (p: number): string => {
  return p === 0 ? "Life Changing" : p === 1 ? "Important" : "Meh";
};

export type ToDo = {
  id: string;
  index: number;
  priority: Priority;
  content: string;
  completed: boolean;
};

const initialState = () => ({
  toDos: [] as ToDo[],
  editId: undefined as undefined | string,
  sort: "Index",
  sorted: false
});

export type State = Readonly<ReturnType<typeof initialState>>;

export const rootReducer: Reducer<State, Actions> = (
  state = initialState(),
  action: Actions
) =>
  produce(state, draft => {
    switch (action.type) {
      case getType(actions.todoCompletedStateModified):
        const modifiedTodo = draft.toDos.find(
          todo => todo.id === action.payload
        );
        if (modifiedTodo) {
          const currentState = modifiedTodo.completed;
          modifiedTodo.completed = !currentState;
        }
        break;
      case getType(actions.todoEditModeEntered):
        draft.editId = action.payload;
        break;
      case getType(actions.todoCreated):
        draft.toDos = [
          ...draft.toDos,
          { ...action.payload, index: draft.toDos.length, completed: false }
        ];
        draft.sorted = false;
        break;
      case getType(actions.todoEdited):
        const editedTodo = draft.toDos.find(
          todo => todo.id === action.payload.id
        );
        if (editedTodo) editedTodo.content = action.payload.newContent;
        draft.editId = undefined;
        break;
      case getType(actions.todoPriorityChanged):
        const priorityToDo = draft.toDos.find(
          todo => todo.id === action.payload.id
        );
        if (priorityToDo) priorityToDo.priority = action.payload.newPriority;
        draft.sorted = false;
        break;
      case getType(actions.todoDeleted):
        draft.toDos = draft.toDos.filter(todo => todo.id !== action.payload);
        break;
      case getType(actions.priorityCleared):
        draft.toDos = draft.toDos.filter(
          todo => todo.priority !== action.payload
        );
        break;
      case getType(actions.allTodosCleared):
        draft.toDos = [];
        break;
      case getType(actions.sortChanged):
        draft.sort = action.payload;
        draft.sorted = false;
        break;
      case getType(actions.sortApplied):
        if (!draft.sorted) {
          if (draft.sort === "A-Z") {
            draft.toDos = draft.toDos.sort((a, b) =>
              a.content > b.content ? 1 : -1
            );
          } else if (draft.sort === "Z-A") {
            draft.toDos = draft.toDos.sort((a, b) =>
              a.content > b.content ? -1 : 1
            );
          } else {
            draft.toDos = draft.toDos.sort((a, b) =>
              a.index > b.index ? 1 : -1
            );
          }
          draft.sorted = true; // this is a bit hacky, but as this is timed I didn't have chance to solve this more elegantly
        }

        break;
    }
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware())
);
//@ts-ignore
export const persistor = persistStore(store); // bad practice with the ignore above, but typescript error was taking up too much time.

export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
