import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "./@ui-kit/components";
import { VenuxThemeProvider } from "./@ui-kit/provider";
import { Center } from "./@ui-kit/components/Layouts/Flexbox";
function App() {
  const [width, setWidth] = useState(100);
  return (
    <VenuxThemeProvider
      theme={{
        currentTheme: "light",
        theme: {
          light: {
            Button: {
              defaultProps: {},
              overrideStyles: {
                default: {},
                var1: {
                  removeDefaultStyling: true,
                  button: {
                    styles: {
                      background: "red",
                    },
                  },
                },
              },
              sizes: {
                cs: { styles: { padding: "10px 20px" } },
              },
            },
          },
        },
      }}
    >
      <Button ripple size="xs">
        asd
      </Button>
      <Button ripple size="sm">
        asd
      </Button>
      <Button ripple size="md">
        asd
      </Button>
      <Center sx={{ height: 200 }} gap={20}>
        <Button ripple size="xs">
          Button
        </Button>
        <Button ripple size="sm">
          Button
        </Button>
        <Button ripple size="md">
          Button
        </Button>
        <Button ripple size="lg">
          Button
        </Button>
        <Button ripple size="xl">
          Button
        </Button>
        <Button ripple size="cs">
          Button
        </Button>
      </Center>
    </VenuxThemeProvider>
  );
}

export default App;
