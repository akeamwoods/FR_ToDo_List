import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { useTypedSelector } from "../../store";
import { Wrapper } from "./style";

export const SortFilter: React.FC<{ isDiabled: boolean }> = ({ isDiabled }) => {
  const dispatch = useDispatch();
  const options = ["Index", "A-Z", "Z-A"];
  const sort = useTypedSelector(state => state.sort);
  return (
    <Wrapper>
      <button
        disabled={isDiabled}
        onClick={() => dispatch(actions.allTodosCleared())}
      >
        Clear All
      </button>
      <h3>Sort:</h3>
      <select
        value={options.indexOf(sort)}
        onChange={e =>
          dispatch(actions.sortChanged(options[e.target.selectedIndex]))
        }
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};
