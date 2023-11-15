import { useRecoilValue } from "recoil";
import { todoListStatsState } from "./TodoList";
import styled from "@emotion/styled";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

export default function TodoListStats() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <Ul>
      <li>총 개수 : {totalNum}</li>
      <li>완료 : {totalCompletedNum}</li>
      <li>미완료 : {totalUncompletedNum}</li>
      <li>진행도 : {formattedPercentCompleted}</li>
    </Ul>
  );
}
