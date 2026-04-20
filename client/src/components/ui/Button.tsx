import { type ButtonHTMLAttributes, type ReactNode } from "react";
const variants = {
  primary:
    "bg-(--primary) hover:bg-(--primary-light) text-(--text) text-sm font-semibold flex gap-2 items-center content-center cursor-pointer",
  dark: "bg-(--secondary) text-(--bg) font-semibold text-sm hover:bg-(--secondary-light) cursor-pointer flex items-center contnent-center",
  ghostTinted:
    "bg-(--ghostTinted) text-(--text) font-semibold text-sm cursor-pointer flex items-center contnent-center hover:bg-(--ghostTinted-light)",
  ghostPrimary:
    "bg-(--ghostTinted) text-(--text) font-semibold text-sm cursor-pointer flex items-center contnent-center hover:bg-(--primary) border-(--bg-light) border",
};
type Variant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: Variant;
  className?: string;
}
function Button({
  children,
  variant = "primary",
  className = "px-3 py-2 rounded-md",
  ...props
}: ButtonProps) {
  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
