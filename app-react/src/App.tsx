import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, useRoutes } from "react-router-dom";
import { VStack, chakra, Button, HStack } from "@chakra-ui/react";
import { PartialRouteObject } from "react-router";
import { ReactName } from "./components/ReactName";
import { ReactCounter } from "./components/ReactCounter";

const rootPath: PartialRouteObject[] = [
  {
    path: "/",
    element: <ReactName />,
  },
  {
    path: "/react-counter",
    element: <ReactCounter />,
  },
  {
    path: "/react-name",
    element: <ReactName />,
  },
];

function App() {
  const element = useRoutes(rootPath);

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
      <chakra.h1 fontSize="6xl" fontWeight="600">
        State Sharing
      </chakra.h1>
      <HStack>
        <Button as={Link} to="/">
          /
        </Button>
        <Button as={Link} to="/react-counter">
          /react-counter
        </Button>
        <Button as={Link} to="/react-name">
          /react-name
        </Button>

        <Button as="a" href="/vue-counter">
          /vue-counter
        </Button>
        <Button as="a" href="/vue-name">
          /vue-name
        </Button>
      </HStack>
      <VStack w="50%">{element}</VStack>
    </VStack>
  );
}

export default App;
