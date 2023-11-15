import { useRecoilState } from "recoil";
import { todoListFilterState } from "./TodoList";

export default function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <div>
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">전체</option>
        <option value="Show Completed">완료</option>
        <option value="Show Uncompleted">미완료</option>
      </select>
    </div>
  );
}
