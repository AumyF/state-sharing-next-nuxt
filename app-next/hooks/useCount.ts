import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const countState = atom({
  key: "count",
  default: 0,
});

export const useSetCount = () => {
  const set = useSetRecoilState(countState);

  const setCount = React.useCallback(
    (...args: [number, never?] | [string, number]) => set(args[1] ?? args[0]),
    [set],
  );

  return setCount;
};

export const useIncrement10Count = () => {
  const set = useSetRecoilState(countState);
  return React.useCallback(() => set(cnt => cnt + 1), [set]);
};

export const useCountValue = () => useRecoilValue(countState);
