import { type ButtonHTMLAttributes, type ReactNode } from "react";

const variants = {
  primary:
    "bg-(--primary) hover:bg-(--primary-light) text-(--text) px-3 py-2 rounded-md text-base font-semibold flex gap-2 items-center content-center cursor-pointer",
  dark: "bg-(--secondary) px-3 py-2 text-(--bg) rounded-md font-semibold text-base hover:bg-(--secondary-light) cursor-pointer flex items-center contnent-center",
  ghostTinted:
    "bg-(--ghostTinted) px-3 py-2 rounded-md font-semibold text-base cursor-pointer flex items-center contnent-center hover:bg-(--ghostTinted-light)",
  ghostPrimary:
    "bg-(--ghostTinted) px-3 py-2 rounded-md font-semibold text-base cursor-pointer flex items-center contnent-center hover:bg-(--primary) border-(--bg-light) border",
};
type Variant = keyof typeof variants;
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: Variant;
}
function Button({ children, variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  );
}

export default Button;
