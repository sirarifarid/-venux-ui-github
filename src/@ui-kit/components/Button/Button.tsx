import React, {
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { ButtonProps } from "./@types";
import { LoadingIcon } from "../LoadingIcon/LoadingIcon";
import { useRipple } from "../../hooks/useRipple";
import { safeObj } from "../../../utils/safeObj";
import { useTheme } from "../../hooks";
import { ButtonWrapper_, LoadingWrapper_ } from "./button.styled";

const Button = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof ButtonWrapper_>
>((_props, _ref) => {
  const [theme] = useTheme();

  const props = {
    ...{ variant: "default", color: "default", size: "md" },
    ...safeObj(theme?.theme?.[theme.currentTheme]?.Button?.defaultProps),
    ...safeObj(_props),
  } as typeof _props;

  const {
    children,
    ripple,
    startIcon,
    endIcon,
    isLoading,
    onClick,
    rippleColor,
    rippleRenderer,
    ...rest
  } = props;

  const ref = useRef<HTMLButtonElement>(null);

  useImperativeHandle(_ref, () => ref.current!);

  const ripples = useRipple(
    ref,
    !ripple && isLoading,
    rippleColor,
    rippleRenderer
  );

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    onClick && !isLoading && onClick(e);
  };

  return (
    <ButtonWrapper_ ref={ref} onClick={handleClick} {...rest}>
      {startIcon}

      {children}

      {endIcon}

      {isLoading && (
        <LoadingWrapper_ variant={props.variant} loadingSx={props.loadingSx}>
          <LoadingIcon fontSize={20} />
        </LoadingWrapper_>
      )}

      {ripple && !isLoading && ripples}
    </ButtonWrapper_>
  );
});

Button.displayName = "Button";

export { Button };
