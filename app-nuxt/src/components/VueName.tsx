import { CButton, chakra, storageKey } from "@chakra-ui/vue-next";
import { defineComponent, watch, watchEffect } from "vue";
import { useStorage } from "@vueuse/core";
import { useStore } from "../store";
import { css } from "@emotion/css";

export const VueName = defineComponent({
  name: "Lorem",
  setup() {
    const store = useStore();

    return () => (
      <>
        <chakra.table>
          <chakra.tr>
            <chakra.th px="1rem" py=".25rem">
              Local Storage
            </chakra.th>
            <chakra.th px="1rem" py=".25rem">
              Pinia
            </chakra.th>
          </chakra.tr>
          <chakra.tr>
            <chakra.td px="1rem" py=".25rem" textAlign="center">
              {store.nameInStorage}
            </chakra.td>
            <chakra.td px="1rem" py=".25rem" textAlign="center">
              {store.name}
            </chakra.td>
          </chakra.tr>
        </chakra.table>
        <input
          class={css`
            border: 1px solid #bbb;
          `}
          v-model={store.name}
        />

        <CButton onClick={store.writeToStorage}>Write</CButton>
      </>
    );
  },
});
