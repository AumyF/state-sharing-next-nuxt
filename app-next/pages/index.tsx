import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
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
  Spacer,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Table,
  Text,
  useFormControl,
  VStack,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import Head from "next/head";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useCountValue, useSetCount } from "../hooks/useCount";

import Link from "next/link";
import { useSessionStorage } from "../hooks/useSesstionStorage";

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

export default function Home() {
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
    <VStack
      minH="100vh"
      h="100vh"
      w="50%"
      px="0.5rem"
      py="0"
      mx="auto"
      spacing="2rem"
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <chakra.h1 fontSize="6xl" fontWeight="600">
        State Sharing
      </chakra.h1>
      <HStack>
        <Link href="/next" passHref>
          <Button as="a">/next</Button>
        </Link>
        <Button as="a" href="/nuxt">
          /nuxt
        </Button>
      </HStack>
      <HStack>
        <Input
          type="text"
          onChange={handleChange}
          placeholder="Tell me your name"
          value={name}
        />
        <Button onClick={writeStorage} flexShrink={0}>
          Write to local storage
        </Button>
      </HStack>
      <StatGroup w="50%" flexWrap="nowrap">
        <Stat>
          <StatLabel>React useState</StatLabel>
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
      <HStack w="50%" spacing="1rem">
        <Slider aria-label="slider" value={count} onChange={setCount}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <NumberInput value={count} onChange={setCount}>
          <NumberInputField></NumberInputField>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </VStack>
  );
}
