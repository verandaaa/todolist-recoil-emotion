import { useRecoilState } from "recoil";
import { todoListState } from "./TodoList";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Check = styled.input`
  box-sizing: border-box;
  margin: 0;
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 0;
  height: 20px;
`;

const Button = styled.button`
  box-sizing: border-box;
  padding: 0;
  border: none;
  width: 20px;
  height: 20px;
  background: none;
`;

export default function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <Container>
      <Check
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <Input type="text" value={item.text} onChange={editItemText} />

      <Button onClick={deleteItem}>X</Button>
    </Container>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
