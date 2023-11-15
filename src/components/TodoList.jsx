import { atom, useRecoilValue, selector } from "recoil";
import TodoItemCreator from "./TodoItemCreator";
import TodoListStats from "./TodoListStats";
import TodoListFilters from "./TodoListFilters";
import TodoItem from "./TodoItem";
import styled from "@emotion/styled";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Box = styled.div`
  background-color: #fffbeb;
  width: 50%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
  gap: 20px;
`;
const TodoItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <Container>
      <Box>
        <h1>TodoList!</h1>
        <TodoListStats />
        <TodoListFilters />
        <TodoItemCreator />
        <TodoItems>
          {todoList.map((todoItem) => (
            <TodoItem key={todoItem.id} item={todoItem} />
          ))}
        </TodoItems>
      </Box>
    </Container>
  );
}
