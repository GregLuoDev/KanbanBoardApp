"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./lib/slices/taskSlice";
import type { AppState } from "./lib/store";

export default function Counter() {
  const value = useSelector((state: AppState) => state.task.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {value}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
}
