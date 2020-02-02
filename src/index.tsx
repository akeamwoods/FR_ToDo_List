import React, { useEffect } from "react";
import { render } from "react-dom";
import "./style.css";
import { Provider, useDispatch } from "react-redux";
import { store, useTypedSelector, priorities } from "./store";
import { ToDoForm } from "./components/ToDoForm";
import { ToDoList } from "./components/ToDoList";
import { actions } from "./store/actions";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { ListWrapper } from "./components/ToDoList/style";
import { SortFilter } from "./components/SortFilter";

function App() {
  const todos = useTypedSelector(state => state.toDos);
  const isSorted = useTypedSelector(state => state.sorted);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.sortApplied());
  }, [dispatch, isSorted]);

  return (
    <div className="App">
      <ToDoForm />
      <SortFilter isDiabled={todos.length === 0} />
      <ListWrapper>
        {priorities.map((priority, index) => (
          <ToDoList
            key={index}
            priority={index}
            todos={todos.filter(todo => todo.priority === index)}
            clearGroup={() => dispatch(actions.priorityCleared(index))}
            onDrop={item =>
              dispatch(
                actions.todoPriorityChanged({
                  newPriority: index,
                  id: item.id
                })
              )
            }
          />
        ))}
      </ListWrapper>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <App />
    </DndProvider>
  </Provider>,
  rootElement
);
