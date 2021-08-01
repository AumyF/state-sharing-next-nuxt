import { computed, defineComponent, ref, onMounted } from "vue";
import {
  useRouter,
  useRoute,
  RouterLink,
  RouterView,
  useLink,
} from "vue-router";
import {
  CButton,
  CFlex,
  chakra,
  CHStack,
  CVStack,
  StackProps,
} from "@chakra-ui/vue-next";

export default defineComponent({
  name: "App",
  setup() {
    const r = useRouter();
    r.getRoutes();
    const links = r.getRoutes().map((route) => useLink({ to: route.path }));

    return () => {
      return (
        <CVStack
          // @ts-ignore
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
          <CHStack>
            <CButton as="a" {...{ href: "/" }}>
              /
            </CButton>
            <CButton as="a" {...{ href: "/react-counter" }}>
              /react-counter
            </CButton>
            {links.map(({ href, route, isActive, navigate }) => (
              <CButton
                as="a"
                onClick={navigate}
                // @ts-expect-error
                href={href.value}
              >
                {route.value.path}
              </CButton>
            ))}
          </CHStack>

          <CVStack w="50%">
            <RouterView />
          </CVStack>
        </CVStack>
      );
    };
  },
});
