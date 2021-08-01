import {
  CButton,
  chakra,
  CVStack,
  StackProps,
  CText,
} from "@chakra-ui/vue-next";
import { defineComponent, watch } from "vue";
import { useStore } from "../store";
import { useStorage } from "@vueuse/core";

export const VueCounter = defineComponent({
  name: "VueCounter",
  setup() {
    const store = useStore();

    return () => (
      <>
        {
          // @ts-ignore
          <CText>{store.count}</CText>
        }
        <CButton onClick={store.increment}>+1</CButton>
      </>
    );
  },
});
