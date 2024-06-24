import { ButtonHTMLAttributes } from "react";
import {
  T_DEFAULT_BUTTON_PROPS,
  T_DEFINED_STYLED,
  T_STRING_GENER,
} from "../../../@types/@types";
import { _defaultColors } from "../../provider/_default";

export type ButtonProps = T_DEFINED_STYLED &
  T_DEFAULT_BUTTON_PROPS & {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    rippleDuration?: number;
    variant?: "default" | "outlined" | "ghost" | (string & {});
    colorScheme?: keyof typeof _defaultColors;
    size?: T_STRING_GENER<"xs" | "sm" | "md" | "lg" | "xl">;
  };
