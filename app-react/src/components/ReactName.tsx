import React, { useCallback, useEffect, useReducer } from "react";
import {
  Button,
  chakra,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import { useCountValue, useSetCount } from "./count";

const useLocalStorage = <Key extends string>(key: Key) => {
  type State = {
    value: string;
    storageValue: string;
  };
  const reducer: React.Reducer<
    State,
    [type: "setValue", value: string] | [type: "pullStorage"]
  > = (prevState, action) => {
    switch (action[0]) {
      case "setValue":
        return { ...prevState, value: action[1] };
      case "pullStorage":
        return {
          ...prevState,
          storageValue: localStorage.getItem("name") ?? "",
        };
    }
  };

  const initialValue = globalThis.localStorage?.getItem(key) ?? "";

  const [state, dispatch] = useReducer(reducer, {
    storageValue: initialValue,
    value: initialValue,
  });

  useEffect(() => {
    dispatch(["pullStorage"]);
  }, []);

  const setValue = useCallback((value: string) => {
    dispatch(["setValue", value]);
  }, []);

  const writeStorage = useCallback(() => {
    localStorage.setItem(key, state.value);
    dispatch(["pullStorage"]);
  }, [key, state.value]);

  return { state, setValue, writeStorage } as const;
};

export const ReactName: React.FC = () => {
  const count = useCountValue();
  const setCount = useSetCount();

  const {
    state: { storageValue: storageName, value: name },
    setValue: setName,
    writeStorage,
  } = useLocalStorage("name");

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value);
    },
    [setName],
  );

  return (
    <>
      <Stat>
        <StatLabel>Recoil count</StatLabel>
        <StatNumber display="block" textAlign="center" fontSize="6xl">
          {count}
        </StatNumber>
      </Stat>
      <Input
        type="text"
        onChange={handleChange}
        placeholder="Tell me your name"
        value={name}
      />{" "}
      <Button onClick={writeStorage} flexShrink={0}>
        Write to local storage
      </Button>
      <StatGroup w="50%" flexWrap="nowrap">
        <Stat>
          <StatLabel>React state</StatLabel>
          <StatNumber wordBreak="break-all" p=".25rem">
            {name}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Local Storage</StatLabel>
          <StatNumber wordBreak="break-all" p=".25rem">
            {storageName}
          </StatNumber>
        </Stat>
      </StatGroup>
      <HStack w="80%" spacing="1rem">
        <Slider aria-label="slider" value={count} onChange={setCount}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <NumberInput value={count} onChange={(_, n) => setCount(n)}>
          <NumberInputField></NumberInputField>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </>
  );
};
