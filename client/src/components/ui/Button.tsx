const variants = {
  primary: "bg-orange-500 text-white",
  dark: "bg-black text-white",
  ghostTinted: "bg-yellow-200/40",
  ghostPrimary: "bg-transparent hover:bg-gray-200",
};

type Variant = keyof typeof variants;

function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  );
}

export default Button;
