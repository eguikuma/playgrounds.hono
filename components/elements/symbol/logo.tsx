import { forwardRef, type HTMLAttributes } from "react";

type LogoProps = {
  color?: string;
} & HTMLAttributes<
  Omit<SVGElement, "size" | "width" | "height" | "strokeWidth">
>;

export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ color = "currentColor", ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke={color}
        {...props}
      >
        <title>おうちずかん</title>
        <g strokeWidth="0" />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <g>
          <path d="M1.48,23.5V20.63a6.7,6.7,0,0,1,6.69-6.7h5.74a1.92,1.92,0,0,1,1.92,1.92h0a1.92,1.92,0,0,1-1.92,1.91h1l4.19-4.19A2,2,0,0,1,20.49,13h0a2,2,0,0,1,2,2h0a2,2,0,0,1-.59,1.43l-4,4a3.84,3.84,0,0,1-2.7,1.12H11A1.91,1.91,0,0,0,9.13,23.5h0" />
          <rect x="7.22" y="7.03" width="9.57" height="6.91" />
          <polygon points="12 1.5 6.26 7.03 17.74 7.03 12 1.5" />
          <rect x="11.04" y="11.07" width="1.91" height="2.87" />
        </g>
      </svg>
    );
  },
);

Logo.displayName = "Logo";
