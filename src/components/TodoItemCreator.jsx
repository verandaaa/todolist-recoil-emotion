import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "./TodoList";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <Container>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>추가</button>
    </Container>
  );
}

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
  return id++;
}
