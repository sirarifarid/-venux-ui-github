import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { RipplesAttr } from "../types/@types";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const rippleKeyframes = keyframes({
  "0%": { scale: "0", opacity: "0.2" },
  "40%": { scale: "3", opacity: "0.2" },
  "100%": { scale: "3", opacity: "0" },
});

const RippleSpan_ = styled.span({
  display: "inline-block",
  position: "absolute",
  borderRadius: "9999px",
  pointerEvents: "none",
  animation: rippleKeyframes + " 0.8s 1 linear forwards",
});

export const useRipple = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  disable?: boolean,
  color?: string,
  rippleRenderer?: (props: RipplesAttr) => JSX.Element
) => {
  const [ripples, setRipples] = useState<RipplesAttr[]>([]);

  useEffect(() => {
    if (ref?.current && !disable) {
      const elem = ref.current;

      const clickHandler = (e: MouseEvent) => {
        const { width, height, top, left } = elem.getBoundingClientRect();
        const diameter = Math.max(width, height);

        setRipples((p) => [
          ...p,
          {
            top: e.clientY - top - diameter / 2,
            left: e.clientX - left - diameter / 2,
            size: diameter,
          },
        ]);
      };

      elem.addEventListener("click", clickHandler);

      return () => {
        elem.removeEventListener("click", clickHandler);
      };
    }
  }, [disable, ref, ripples]);

  const deb = useDebounce(ripples, 800);

  useEffect(() => {
    if (deb.length) {
      setRipples([]);
    }
  }, [deb.length]);

  return disable
    ? []
    : ripples.map((value, i) =>
        rippleRenderer ? (
          rippleRenderer(value)
        ) : (
          <RippleSpan_
            key={"ripple" + i}
            style={{
              left: value.left,
              top: value.top,
              width: value.size,
              height: value.size,
              background: color || "#fff",
            }}
          />
        )
      );
};
