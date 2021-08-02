import React from "react";
import {
  Button,
  chakra,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import { useIncrementCount, useCountValue } from "./count";

export const ReactCounter: React.FC = () => {
  const count = useCountValue();
  const increment = useIncrementCount();

  return (
    <>
      <Stat>
        <StatLabel>Recoil count</StatLabel>
        <StatNumber display="block" textAlign="center" fontSize="6xl">
          {count}
        </StatNumber>
      </Stat>
      <Button onClick={increment} mx="auto">
        +1
      </Button>
    </>
  );
};
