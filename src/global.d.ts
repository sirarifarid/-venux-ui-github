import { CSSObject } from "@emotion/react";
import { SxProps } from "./@ui-kit/types";

interface MyTheme {}

declare module "react" {
  interface Attributes {
    css?: CSSObject<MyTheme>;
    sx?: SxProps;
  }
}
