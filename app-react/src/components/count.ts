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
  return useSetRecoilState(countState);
};

export const useIncrement10Count = () => {
  const set = useSetRecoilState(countState);
  return React.useCallback(() => set(cnt => cnt + 1), [set]);
};

export const useIncrementCount = () => {
  const set = useSetRecoilState(countState);
  return React.useCallback(() => set(cnt => cnt + 1), [set]);
};

export const useCountValue = () => useRecoilValue(countState);
